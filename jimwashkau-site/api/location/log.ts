import { escapeXml, getLocationHistory, type StoredLocation } from '../_lib/location-store.js';

export async function GET() {
  const history = await getLocationHistory();

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<locationLog count="${history.length}">
${history.map((entry: StoredLocation) => `  <location>
    <deviceId>${escapeXml(entry.device_id)}</deviceId>
    <deviceName>${escapeXml(entry.device_name)}</deviceName>
    <latitude>${entry.latitude}</latitude>
    <longitude>${entry.longitude}</longitude>
    <accuracy>${entry.accuracy}</accuracy>
    <speed>${entry.speed}</speed>
    <timestamp>${escapeXml(entry.timestamp)}</timestamp>
    <receivedAt>${escapeXml(entry.received_at)}</receivedAt>
  </location>`).join('\n')}
</locationLog>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=15',
    },
  });
}
