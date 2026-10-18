import { useCallback, useEffect, useRef, useState, type ChangeEvent } from 'react';
import { ImagePlus, Shuffle, X } from 'lucide-react';

type WallPhoto = { id: string; data: string };
type PickingSession = { id: string; pickerUri: string; mediaItemsSet?: boolean; pollingConfig?: { pollInterval?: string; timeoutIn?: string } };
type PickedItem = { type: string; mediaFile: { baseUrl: string; mimeType: string } };
type TokenReply = { access_token?: string; error?: string };
type GoogleIdentity = { accounts: { oauth2: { initTokenClient: (options: { client_id: string; scope: string; callback: (reply: TokenReply) => void; error_callback: () => void }) => { requestAccessToken: () => void } } } };
const SCOPE = 'https://www.googleapis.com/auth/photospicker.mediaitems.readonly';
const PHOTO_LIMIT = 50;
let identityPromise: Promise<GoogleIdentity> | undefined;
function identity(): Promise<GoogleIdentity> {
  if (identityPromise) return identityPromise;
  identityPromise = new Promise<GoogleIdentity>((resolve, reject) => {
    const existing = (window as Window & { google?: GoogleIdentity }).google;
    if (existing) { resolve(existing); return; }
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client'; script.async = true;
    const timeout = window.setTimeout(() => { script.remove(); reject(new Error('Google sign-in took too long to load. Please try again.')); }, 15000);
    script.onload = () => { clearTimeout(timeout); const google = (window as Window & { google?: GoogleIdentity }).google; if (google) resolve(google); else reject(new Error('Google sign-in could not load.')); };
    script.onerror = () => { clearTimeout(timeout); reject(new Error('Google sign-in could not load. Check your connection and try again.')); };
    document.head.append(script);
  }).catch(error => { identityPromise = undefined; throw error; });
  return identityPromise;
}
async function database(name = 'bb8-private-wall-photos'): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(name, 1);
    request.onupgradeneeded = () => request.result.createObjectStore('photos', { keyPath: 'id' });
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(new Error('Photo storage is unavailable in this browser.'));
  });
}
async function photoStore(replacement?: WallPhoto[], storageKey = 'bb8-private-wall-photos'): Promise<WallPhoto[]> {
  const db = await database(storageKey);
  try {
    return await new Promise((resolve, reject) => {
      const transaction = db.transaction('photos', replacement ? 'readwrite' : 'readonly');
      const store = transaction.objectStore('photos');
      let photos: WallPhoto[] = replacement || [];
      if (replacement) { store.clear(); replacement.forEach(photo => store.put(photo)); }
      else { const request = store.getAll(); request.onsuccess = () => { photos = request.result as WallPhoto[]; }; }
      transaction.oncomplete = () => resolve(photos);
      transaction.onerror = () => reject(new Error('Could not save the photos on this device.'));
      transaction.onabort = () => reject(new Error('Could not save the photos on this device.'));
    });
  } finally { db.close(); }
}
export function isStillPhoto(item: PickedItem): boolean {
  return item.type === 'PHOTO' && Boolean(item.mediaFile?.mimeType?.startsWith('image/'));
}
async function stillImage(blob: Blob): Promise<WallPhoto> {
  if (!blob.type.startsWith('image/') || blob.type === 'image/svg+xml' || blob.size > 30 * 1024 * 1024) throw new Error('Use a photo under 30 MB in JPEG, PNG, or another supported image format.');
  // Flatten animation and motion-photo image data into one small, static JPEG.
  const bitmap = await createImageBitmap(blob);
  try {
    const scale = Math.min(1, 800 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(bitmap.width * scale)); canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    const context = canvas.getContext('2d');
    if (!context) throw new Error('This browser cannot prepare the photo.');
    context.fillStyle = '#eee7d5'; context.fillRect(0, 0, canvas.width, canvas.height); context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    return { id: crypto.randomUUID(), data: canvas.toDataURL('image/jpeg', .85) };
  } finally { bitmap.close(); }
}
function savedClientId() {
  const configured = import.meta.env.VITE_GOOGLE_PHOTOS_CLIENT_ID as string | undefined;
  try { return configured || localStorage.getItem('bb8-google-photos-client-id') || ''; } catch { return configured || ''; }
}

export function useWallPhotos({ enableGoogle = false, storageKey = 'bb8-private-wall-photos', droidName = 'BB-8' } = {}) {
  const [photos, setPhotos] = useState<WallPhoto[]>([]);
  const [current, setCurrent] = useState(0);
  const [clientId, setClientId] = useState(savedClientId);
  const [setup, setSetup] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [pickerUri, setPickerUri] = useState('');
  const controllerRef = useRef<AbortController | null>(null);
  useEffect(() => {
    let active = true;
    void photoStore(undefined, storageKey).then(saved => { if (active) { setPhotos(saved.slice(0, PHOTO_LIMIT)); setCurrent(Math.floor(Math.random() * Math.max(saved.length, 1))); } }).catch(() => {});
    return () => { active = false; controllerRef.current?.abort(); };
  }, [storageKey]);
  useEffect(() => { if (enableGoogle && clientId) void identity().catch(() => {}); }, [clientId, enableGoogle]);
  const shuffle = useCallback(() => {
    setCurrent(previous => { if (photos.length < 2) return 0; const next = Math.floor(Math.random() * (photos.length - 1)); return next >= previous ? next + 1 : next; });
  }, [photos.length]);
  useEffect(() => { if (photos.length < 2) return; const timer = window.setInterval(shuffle, 60000); return () => clearInterval(timer); }, [photos.length, shuffle]);
  async function save(added: WallPhoto[], replace = false) {
    const combined = (replace ? added : [...photos, ...added]).slice(-PHOTO_LIMIT);
    await photoStore(combined, storageKey); setPhotos(combined); setCurrent(combined.length - 1);
  }
  async function upload(event: ChangeEvent<HTMLInputElement>, replace = false) {
    const files = Array.from(event.target.files || []); event.target.value = '';
    if (!files.length) return;
    setBusy(true); setMessage('Preparing your little wall memories…');
    let skipped = 0; const added: WallPhoto[] = [];
    try {
      for (const file of files.slice(0, PHOTO_LIMIT)) {
        if (!file.type.startsWith('image/')) { skipped++; continue; }
        try { added.push(await stillImage(file)); } catch { skipped++; }
      }
      if (added.length) await save(added, replace);
      setMessage(added.length ? `${added.length} still photo${added.length === 1 ? '' : 's'} ${replace ? 'saved in your new album' : 'added'}.${skipped ? ` ${skipped} video or unsupported file${skipped === 1 ? '' : 's'} skipped.` : ''}` : 'No supported still photos found. Try JPEG or PNG. Your current album is unchanged.');
    } catch (error) { setMessage(error instanceof Error ? error.message : 'The photos could not be saved.'); }
    finally { setBusy(false); }
  }
  function configure(value: string) {
    if (!/^[\w-]+\.apps\.googleusercontent\.com$/.test(value.trim())) { setMessage('Enter the public Google OAuth client ID ending in .apps.googleusercontent.com.'); return; }
    setClientId(value.trim()); try { localStorage.setItem('bb8-google-photos-client-id', value.trim()); } catch { /* Session setup still works. */ }
    setSetup(false); setMessage('Google setup saved. Choose Google Photos to sign in and pick your photos.');
  }
  async function connect() {
    if (!clientId) { setSetup(true); return; }
    setBusy(true); setMessage('Starting Google sign-in…');
    const controller = new AbortController(); controllerRef.current = controller;
    let token = ''; let sessionId = '';
    const request = async <T,>(path: string, options: RequestInit = {}): Promise<T> => {
      const response = await fetch(`https://photospicker.googleapis.com/v1/${path}`, { ...options, headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, signal: controller.signal });
      if (!response.ok) throw new Error(response.status === 401 ? 'Google sign-in expired. Choose Google Photos and try again.' : `Google Photos could not complete the request (${response.status}). Check that the Photos Picker API is enabled.`);
      return response.status === 204 ? undefined as T : await response.json() as T;
    };
    try {
      const google = await identity();
      token = await new Promise<string>((resolve, reject) => {
        const abort = () => reject(new DOMException('Cancelled', 'AbortError'));
        controller.signal.addEventListener('abort', abort, { once: true });
        const client = google.accounts.oauth2.initTokenClient({ client_id: clientId, scope: SCOPE, callback: reply => { controller.signal.removeEventListener('abort', abort); if (reply.access_token) resolve(reply.access_token); else reject(new Error('Google sign-in was not completed.')); }, error_callback: () => { controller.signal.removeEventListener('abort', abort); reject(new Error('Google sign-in was closed or blocked. Please try again.')); } });
        client.requestAccessToken();
      });
      if (controller.signal.aborted) throw new DOMException('Cancelled', 'AbortError');
      const session = await request<PickingSession>('sessions', { method: 'POST', body: '{}' });
      sessionId = session.id;
      const uri = new URL(session.pickerUri);
      if (uri.protocol !== 'https:' || uri.hostname !== 'photos.google.com') throw new Error('Google returned an unexpected photo picker address.');
      setPickerUri(uri.href); setMessage('Open Google Photos, select your favorite photos, then tap Done there. Videos will be skipped.');
      const interval = Math.max(2000, Math.min(15000, parseFloat(session.pollingConfig?.pollInterval || '5') * 1000 || 5000));
      const deadline = Date.now() + Math.min(10 * 60 * 1000, parseFloat(session.pollingConfig?.timeoutIn || '600') * 1000 || 600000);
      let complete = false;
      while (Date.now() < deadline && !complete) {
        await new Promise<void>((resolve, reject) => { const abort = () => { clearTimeout(timer); reject(new DOMException('Cancelled', 'AbortError')); }; const timer = setTimeout(() => { controller.signal.removeEventListener('abort', abort); resolve(); }, interval); controller.signal.addEventListener('abort', abort, { once: true }); if (controller.signal.aborted) abort(); });
        complete = Boolean((await request<PickingSession>(`sessions/${encodeURIComponent(sessionId)}`)).mediaItemsSet);
      }
      if (!complete) throw new Error('Photo selection timed out. Choose Google Photos to start again.');
      setPickerUri(''); setMessage('Preparing your selected still photos…');
      const added: WallPhoto[] = []; let skipped = 0; let pageToken = '';
      do {
        const query = new URLSearchParams({ sessionId, pageSize: '100' }); if (pageToken) query.set('pageToken', pageToken);
        const page = await request<{ mediaItems?: PickedItem[]; nextPageToken?: string }>(`mediaItems?${query}`);
        for (const item of page.mediaItems || []) {
          if (!isStillPhoto(item)) { skipped++; continue; }
          if (added.length >= PHOTO_LIMIT) break;
          const url = new URL(item.mediaFile.baseUrl);
          if (url.protocol !== 'https:' || !(url.hostname === 'googleusercontent.com' || url.hostname.endsWith('.googleusercontent.com'))) { skipped++; continue; }
          try {
            const response = await fetch(`${url.href}=w800-h800`, { headers: { Authorization: `Bearer ${token}` }, signal: controller.signal });
            if (!response.ok) throw new Error('Photo unavailable');
            added.push(await stillImage(await response.blob()));
          } catch (error) { if (controller.signal.aborted) throw error; skipped++; }
        }
        pageToken = page.nextPageToken || '';
      } while (pageToken && added.length < PHOTO_LIMIT);
      if (added.length) await save(added);
      setMessage(added.length ? `${added.length} Google Photos stills saved to this browser.${skipped ? ' Videos or unavailable files were skipped.' : ''}` : 'No still photos could be imported. Select photos rather than videos and try again.');
    } catch (error) { setMessage(controller.signal.aborted ? 'Photo selection cancelled. Your saved photos are still here.' : error instanceof Error ? error.message : 'Google Photos could not connect.'); }
    finally {
      // Access tokens stay in memory only; retire the temporary selection session.
      if (sessionId && token) void fetch(`https://photospicker.googleapis.com/v1/sessions/${encodeURIComponent(sessionId)}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } }).catch(() => {});
      token = ''; setPickerUri(''); setBusy(false); controllerRef.current = null;
    }
  }
  async function clear() {
    try { await photoStore([], storageKey); setPhotos([]); setCurrent(0); setMessage(`Custom photos removed from this browser. The ${droidName} portraits are back. Your original files are unchanged.`); }
    catch (error) { setMessage(error instanceof Error ? error.message : 'Could not clear photos.'); }
  }
  return { photo: photos[current]?.data, cribPhoto: photos[(current + 1) % photos.length]?.data, count: photos.length, shuffle, upload, connect, clear, busy, canCancel: busy && controllerRef.current !== null, message, pickerUri, cancel: () => controllerRef.current?.abort(), setup, setSetup, clientId, configure };
}

export default function WallPhotoControls({ wall }: { wall: ReturnType<typeof useWallPhotos> }) {
  const [draft, setDraft] = useState(wall.clientId);
  return <section className="bb8-wall-controls" aria-label="Nursery wall photos"><div><ImagePlus size={18}/><strong>Little wall memories</strong><span>{wall.count ? `${wall.count} photo${wall.count === 1 ? '' : 's'} · shuffles every minute` : 'A familiar face for his little room'}</span></div><div className="bb8-wall-actions"><button onClick={() => void wall.connect()} disabled={wall.busy}>Choose Google Photos</button><label className={wall.busy ? 'is-disabled' : ''}>Add downloaded photos<input type="file" accept="image/*" multiple disabled={wall.busy} onChange={event => void wall.upload(event)}/></label><button onClick={wall.shuffle} disabled={wall.count < 2 || wall.busy} aria-label="Shuffle wall photo"><Shuffle size={15}/></button>{wall.count > 0 && <button disabled={wall.busy} onClick={() => void wall.clear()} aria-label="Remove saved wall photos"><X size={15}/></button>}</div><p>Only still photos. Up to 50 stay in this browser, with no uploads to this website. Add more whenever you like.</p>{wall.pickerUri && <div className="bb8-wall-picker-link"><a href={wall.pickerUri} target="_blank" rel="noreferrer">Open Google Photos to choose</a><button onClick={wall.cancel}>Cancel</button></div>}{wall.canCancel && !wall.pickerUri && <button className="bb8-wall-cancel" onClick={wall.cancel}>Cancel import</button>}<p className="bb8-wall-message" role="status">{wall.message}</p>{wall.setup && <div className="bb8-wall-setup"><h3>One-time Google setup</h3><p>Google needs a sign-in client for this website. This connects only the photos you choose, rather than your whole library.</p><ol><li>In <a href="https://console.cloud.google.com/" target="_blank" rel="noreferrer">Google Cloud Console</a>, create a project and enable the <strong>Google Photos Picker API</strong>.</li><li>Configure Google Auth Platform: add your email as a test user, and add the scope <code>photospicker.mediaitems.readonly</code>.</li><li>Create an OAuth client of type <strong>Web application</strong>. Add <code>{window.location.origin}</code> as an authorized JavaScript origin. Add your published site’s origin later, too.</li><li>Paste the public client ID below. No client secret is needed.</li></ol><form onSubmit={event => { event.preventDefault(); wall.configure(draft); }}><input aria-label="Google Photos public client ID" value={draft} onChange={event => setDraft(event.target.value)} placeholder="Your client ID.apps.googleusercontent.com"/><button type="submit">Save setup</button><button type="button" onClick={() => wall.setSetup(false)}>Close</button></form><p>Imported photo copies can be removed with the × button. You can also revoke access in your Google Account. Google Photos data is used only for this frame, following <a href="https://developers.google.com/photos/support/api-policy" target="_blank" rel="noreferrer">Google’s Limited Use policy</a>.</p></div>}</section>;
}
