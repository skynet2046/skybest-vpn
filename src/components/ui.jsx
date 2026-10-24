/**
 * Small shared pieces of UI used across several screens.
 * Keeping them in one file makes them easy to find and change.
 */

/** Wraps every screen with a title bar and consistent padding. */
export function Screen({ title, children }) {
  return (
    <div className="screen">
      <header className="screen__header">
        <h1 className="screen__title">{title}</h1>
        <DemoBadge />
      </header>
      {children}
    </div>
  )
}

/** A titled card used to group related rows or text. */
export function Section({ title, children }) {
  return (
    <section className="section">
      {title && <h2 className="section__title">{title}</h2>}
      <div className="section__body">{children}</div>
    </section>
  )
}

/** Pill shown next to screen titles reminding users this is a demo. */
export function DemoBadge() {
  return (
    <span
      className="demo-badge"
      title="Web demo — not a working VPN. Connection states, server statuses and ping values are simulated."
    >
      DEMO
    </span>
  )
}

/** Simple on/off switch used in Settings. */
export function Toggle({ checked, onChange, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={`toggle ${checked ? 'toggle--on' : ''}`}
      onClick={() => onChange(!checked)}
    >
      <span className="toggle__knob" />
    </button>
  )
}

/** Formats a number of seconds as mm:ss for the session timer. */
export function formatDuration(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0')
  const seconds = (totalSeconds % 60).toString().padStart(2, '0')
  return `${minutes}:${seconds}`
}
