import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { get, put } from '@vercel/blob';

export interface LocationPayload {
  latitude: number;
  longitude: number;
  accuracy: number;
  speed: number;
  timestamp: string;
  device_id: string;
  device_name: string;
}

export interface StoredLocation extends LocationPayload {
  received_at: string;
}

interface LocationStoreDocument {
  latest: StoredLocation | null;
  history: StoredLocation[];
}

const HISTORY_LIMIT = 500;
const BLOB_PATH = 'gps/location-log.json';
const DATA_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '..', '.data');
const LOCAL_DATA_FILE = path.join(DATA_DIR, 'location-log.json');

const emptyStore = (): LocationStoreDocument => ({
  latest: null,
  history: [],
});

async function readBlobStore(): Promise<LocationStoreDocument> {
  const result = await get(BLOB_PATH, {
    access: 'private',
  });

  if (!result || result.statusCode !== 200 || !result.stream) {
    return emptyStore();
  }

  const text = await new Response(result.stream).text();
  return parseStore(text);
}

async function writeBlobStore(document: LocationStoreDocument) {
  await put(BLOB_PATH, JSON.stringify(document, null, 2), {
    access: 'private',
    allowOverwrite: true,
    contentType: 'application/json',
    cacheControlMaxAge: 60,
  });
}

async function readLocalStore(): Promise<LocationStoreDocument> {
  try {
    const text = await readFile(LOCAL_DATA_FILE, 'utf8');
    return parseStore(text);
  } catch {
    return emptyStore();
  }
}

async function writeLocalStore(document: LocationStoreDocument) {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(LOCAL_DATA_FILE, JSON.stringify(document, null, 2), 'utf8');
}

function parseStore(text: string): LocationStoreDocument {
  try {
    const parsed = JSON.parse(text) as Partial<LocationStoreDocument>;
    const history = Array.isArray(parsed.history) ? parsed.history : [];
    const latest = parsed.latest ?? history.at(-1) ?? null;

    return {
      latest,
      history,
    };
  } catch {
    return emptyStore();
  }
}

async function readStore(): Promise<LocationStoreDocument> {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    return readBlobStore();
  }

  return readLocalStore();
}

async function writeStore(document: LocationStoreDocument) {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    await writeBlobStore(document);
    return;
  }

  await writeLocalStore(document);
}

export async function appendLocation(payload: LocationPayload) {
  const current = await readStore();
  const record: StoredLocation = {
    ...payload,
    received_at: new Date().toISOString(),
  };

  const next: LocationStoreDocument = {
    latest: record,
    history: [...current.history, record].slice(-HISTORY_LIMIT),
  };

  await writeStore(next);

  return record;
}

export async function getLatestLocation() {
  const current = await readStore();
  return current.latest;
}

export async function getLocationHistory() {
  const current = await readStore();
  return current.history;
}

export function isValidLocationPayload(value: unknown): value is LocationPayload {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const payload = value as Record<string, unknown>;
  const requiredStrings = ['timestamp', 'device_id', 'device_name'] as const;
  const requiredNumbers = ['latitude', 'longitude', 'accuracy', 'speed'] as const;

  return requiredStrings.every((key) => typeof payload[key] === 'string')
    && requiredNumbers.every((key) => typeof payload[key] === 'number' && Number.isFinite(payload[key]));
}

export function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}
