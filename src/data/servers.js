/**
 * DEMO server list.
 *
 * These are made-up entries used to design and test the server screen.
 * The "status" and "ping" values are fictional - they are not measured from
 * any real server. Replace this file with real data when you have a backend.
 *
 * status: 'online' | 'busy' | 'maintenance'
 */
export const SERVERS = [
  { id: 'us-ny', country: 'United States', city: 'New York', flag: '🇺🇸', status: 'online', ping: 24 },
  { id: 'us-la', country: 'United States', city: 'Los Angeles', flag: '🇺🇸', status: 'online', ping: 88 },
  { id: 'ca-to', country: 'Canada', city: 'Toronto', flag: '🇨🇦', status: 'online', ping: 61 },
  { id: 'gb-ln', country: 'United Kingdom', city: 'London', flag: '🇬🇧', status: 'busy', ping: 42 },
  { id: 'de-fr', country: 'Germany', city: 'Frankfurt', flag: '🇩🇪', status: 'online', ping: 35 },
  { id: 'fr-pa', country: 'France', city: 'Paris', flag: '🇫🇷', status: 'online', ping: 39 },
  { id: 'nl-am', country: 'Netherlands', city: 'Amsterdam', flag: '🇳🇱', status: 'maintenance', ping: null },
  { id: 'ch-zu', country: 'Switzerland', city: 'Zurich', flag: '🇨🇭', status: 'online', ping: 47 },
  { id: 'sg-sg', country: 'Singapore', city: 'Singapore', flag: '🇸🇬', status: 'busy', ping: 152 },
  { id: 'jp-tk', country: 'Japan', city: 'Tokyo', flag: '🇯🇵', status: 'online', ping: 174 },
  { id: 'au-sy', country: 'Australia', city: 'Sydney', flag: '🇦🇺', status: 'maintenance', ping: null },
  { id: 'br-sp', country: 'Brazil', city: 'São Paulo', flag: '🇧🇷', status: 'online', ping: 121 },
]

/** Human-readable label for each demo status. Each one says "(demo)" so the
 *  UI never presents a simulated status as a real one. */
export const STATUS_LABELS = {
  online: 'Online (demo)',
  busy: 'Busy (demo)',
  maintenance: 'Maintenance (demo)',
}

/** Returns the first server marked as online (used as the default pick). */
export function findDefaultServer() {
  return SERVERS.find((server) => server.status === 'online') ?? SERVERS[0]
}
