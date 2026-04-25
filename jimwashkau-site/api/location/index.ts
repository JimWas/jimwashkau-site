import { appendLocation, isValidLocationPayload } from '../_lib/location-store.js';

function unauthorized() {
  return Response.json(
    { status: 'error', message: 'Invalid API key.' },
    { status: 401 },
  );
}

export async function POST(request: Request) {
  const providedKey = request.headers.get('X-API-KEY');
  const expectedKey = process.env.SITE_GPS_API_KEY;

  if (!expectedKey || !providedKey || providedKey !== expectedKey) {
    return unauthorized();
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return Response.json(
      { status: 'error', message: 'Invalid JSON body.' },
      { status: 400 },
    );
  }

  if (!isValidLocationPayload(payload)) {
    return Response.json(
      { status: 'error', message: 'Missing or invalid location fields.' },
      { status: 400 },
    );
  }

  const location = payload;

  if (location.latitude < -90 || location.latitude > 90 || location.longitude < -180 || location.longitude > 180) {
    return Response.json(
      { status: 'error', message: 'Coordinates out of range.' },
      { status: 400 },
    );
  }

  const record = await appendLocation(location);

  return Response.json({
    status: 'ok',
    latest: record,
  });
}
