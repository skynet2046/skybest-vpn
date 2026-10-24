import ConnectButton from '../components/ConnectButton.jsx'
import { Screen, Section, formatDuration } from '../components/ui.jsx'
import { CONNECTION_STATES } from '../state/useDemoConnection.js'

/**
 * HOME SCREEN
 * Shows the connection status, the chosen server, and the big
 * Connect / Disconnect button.
 */

// One short description line per demo state.
// Every state is labelled "(Demo)": none of them reflect a real VPN connection.
const STATUS_COPY = {
  [CONNECTION_STATES.DISCONNECTED]: {
    title: 'Disconnected (Demo)',
    hint: 'Web demo — this app does not control your real connection.',
  },
  [CONNECTION_STATES.CONNECTING]: {
    title: 'Connecting (Demo)',
    hint: 'Simulated delay only — no real connection is being created.',
  },
  [CONNECTION_STATES.CONNECTED]: {
    title: 'Connected (Demo)',
    hint: 'This is a simulated state. Your traffic is NOT protected.',
  },
}

export default function HomeScreen({ status, sessionSeconds, server, onToggle, onChangeServer }) {
  const copy = STATUS_COPY[status]

  return (
    <Screen title="SkyBest VPN">
      {/* ---- Connection status (demo only; announced to screen readers) ---- */}
      <div
        className={`status-card status-card--${status}`}
        role="status"
        aria-live="polite"
        aria-label={`Demo connection status: ${copy.title}`}
      >
        <div className="status-card__indicator" aria-hidden="true">
          <span className="status-card__dot" />
        </div>
        <h2 className="status-card__title">{copy.title}</h2>
        <p className="status-card__hint">{copy.hint}</p>
        {status === CONNECTION_STATES.CONNECTED && (
          <p className="status-card__timer">
            {formatDuration(sessionSeconds)}
            <span className="status-card__timer-label">Demo session time</span>
          </p>
        )}
      </div>

      {/* ---- Big connect button ---- */}
      <div className="connect-wrap">
        <ConnectButton status={status} onToggle={onToggle} />
      </div>

      {/* ---- Selected server ---- */}
      <Section title="Server">
        <button type="button" className="row row--button" onClick={onChangeServer}>
          <span className="row__flag" aria-hidden="true">{server.flag}</span>
          <span className="row__main">
            <span className="row__title">{server.country}</span>
            <span className="row__subtitle">{server.city}</span>
          </span>
          <span className="row__meta">Change</span>
          <ChevronRight />
        </button>
      </Section>

      {/* ---- Honest demo disclaimer ---- */}
      <p className="demo-note">
        <strong>Web demo — not a working VPN.</strong> Nova VPN here is a browser prototype. It
        does not create a VPN tunnel, does not encrypt your traffic, and does not change your IP
        address. Nothing it shows means you are protected.
      </p>
    </Screen>
  )
}

function ChevronRight() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m9 6 6 6-6 6" />
    </svg>
  )
}
