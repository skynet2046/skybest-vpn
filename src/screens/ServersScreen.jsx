import { Screen, Section } from '../components/ui.jsx'
import { SERVERS, STATUS_LABELS } from '../data/servers.js'

/**
 * SERVER SELECTION SCREEN
 * Lists demo servers with their country, city, status and (fictional) ping.
 * Servers in maintenance cannot be selected.
 */

export default function ServersScreen({ selectedServerId, onSelectServer }) {
  return (
    <Screen title="Servers">
      <Section>
        <p className="section__note">
          <strong>DEMO data.</strong> Every status, ping and server below is made up for this
          prototype — none of it is measured from real servers.
        </p>
      </Section>

      <Section title={`All servers (${SERVERS.length})`}>
        <ul className="server-list">
          {SERVERS.map((server) => {
            const isSelected = server.id === selectedServerId
            const isOffline = server.status === 'maintenance'
            return (
              <li key={server.id}>
                <button
                  type="button"
                  className={`server-row ${isSelected ? 'server-row--selected' : ''} ${
                    isOffline ? 'server-row--offline' : ''
                  }`}
                  onClick={() => !isOffline && onSelectServer(server.id)}
                  disabled={isOffline}
                  aria-label={`${server.country}, ${server.city}, ${STATUS_LABELS[server.status]}${
                    isOffline ? ' (unavailable)' : ''
                  }`}
                >
                  <span className="server-row__flag" aria-hidden="true">{server.flag}</span>
                  <span className="server-row__main">
                    <span className="server-row__country">{server.country}</span>
                    <span className="server-row__city">{server.city}</span>
                  </span>
                  <span className="server-row__status">
                    <StatusPill status={server.status} />
                    <span className="server-row__ping">
                      {server.ping === null ? '—' : `DEMO · ${server.ping} ms`}
                    </span>
                  </span>
                  {isSelected && <span className="server-row__check" aria-hidden="true">✓</span>}
                </button>
              </li>
            )
          })}
        </ul>
      </Section>
    </Screen>
  )
}

function StatusPill({ status }) {
  // STATUS_LABELS already includes "(demo)" so the pill itself is labelled.
  return <span className={`pill pill--${status}`}>{STATUS_LABELS[status]}</span>
}
