/**
 * The big circular Connect / Disconnect button on the home screen.
 *
 * It changes appearance based on the demo connection status:
 *   - disconnected: idle blue, label "Connect"
 *   - connecting:   pulsing amber,  label "Cancel"
 *   - connected:    glowing green,  label "Disconnect"
 */

export default function ConnectButton({ status, onToggle }) {
  const label = {
    disconnected: 'Connect',
    connecting: 'Cancel',
    connected: 'Disconnect',
  }[status]

  return (
    <button
      type="button"
      className={`connect-button connect-button--${status}`}
      onClick={onToggle}
      aria-label={`${label} (demo)`}
    >
      <span className="connect-button__ring" aria-hidden="true" />
      <span className="connect-button__inner">
        <PowerIcon />
        <span className="connect-button__label">{label}</span>
      </span>
    </button>
  )
}

function PowerIcon() {
  return (
    <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v9" />
      <path d="M18.4 6.6a9 9 0 1 1-12.8 0" />
    </svg>
  )
}
