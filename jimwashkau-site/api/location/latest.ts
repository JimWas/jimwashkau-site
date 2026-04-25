import { getLatestLocation } from '../_lib/location-store.js';

export async function GET() {
  const latest = await getLatestLocation();

  return Response.json({
    status: latest ? 'ok' : 'no_data',
    location: latest,
  });
}
