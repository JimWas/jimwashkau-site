import { ImagePlus, Shuffle } from 'lucide-react';
import type { useWallPhotos } from './BB8WallPhotos';

export default function CustomAlbum({ album, droidName = 'BB-8' }: { droidName?: string; album: ReturnType<typeof useWallPhotos> }) {
  return <section className="bb8-wall-controls" aria-labelledby="bb8-album-title">
    <div><ImagePlus size={18}/><strong id="bb8-album-title">Your nursery photo album</strong><span>{album.count ? `${album.count} custom image${album.count === 1 ? '' : 's'} · rotates every minute` : `Cute ${droidName} portraits by default`}</span></div>
    <div className="bb8-wall-actions">
      <label className={album.busy ? 'is-disabled' : ''}>{album.count ? 'Replace album' : 'Choose custom images'}<input aria-label={album.count ? 'Replace nursery photo album' : 'Choose custom nursery images'} type="file" accept="image/*" multiple disabled={album.busy} onChange={event => void album.upload(event, true)}/></label>
      {album.count > 0 && <>
        <label className={album.busy ? 'is-disabled' : ''}>Add more images<input aria-label="Add images to nursery album" type="file" accept="image/*" multiple disabled={album.busy} onChange={event => void album.upload(event)}/></label>
        <button onClick={album.shuffle} disabled={album.count < 2 || album.busy}><Shuffle size={14}/> Shuffle photos</button>
        <button onClick={() => void album.clear()} disabled={album.busy}>Use {droidName} defaults</button>
      </>}
    </div>
    <p>Choose up to 50 still images for the wall and crib frames. Saved only in this browser, never uploaded to the website. One image appears in both frames; larger albums rotate automatically.</p>
    <p className="bb8-wall-message" role="status" aria-live="polite">{album.message}</p>
  </section>;
}
