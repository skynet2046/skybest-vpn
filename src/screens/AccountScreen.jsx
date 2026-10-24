import { Screen, Section } from '../components/ui.jsx'
import { SERVERS } from '../data/servers.js'
import { formatDuration } from '../components/ui.jsx'

/**
 * ACCOUNT SCREEN
 * Shows a demo profile. There is no sign-up, sign-in, password field,
 * email field, or payment form anywhere in this prototype, and the
 * account below is a placeholder, not a real user.
 */

export default function AccountScreen({ sessionSeconds }) {
  return (
    <Screen title="Account">
      <Section>
        <div className="profile">
          <div className="profile__avatar" aria-hidden="true">N</div>
          <div className="profile__info">
            <p className="profile__name">Demo User</p>
            <p className="profile__plan">Prototype account</p>
          </div>
        </div>
      </Section>

      <Section title="This session (demo)">
        <div className="row">
          <span className="row__main"><span className="row__title">Time in current demo session</span></span>
          <span className="row__meta">{formatDuration(sessionSeconds)}</span>
        </div>
        <div className="row">
          <span className="row__main"><span className="row__title">Servers in demo list</span></span>
          <span className="row__meta">{SERVERS.length}</span>
        </div>
        <div className="row">
          <span className="row__main"><span className="row__title">Data used</span></span>
          <span className="row__meta">—</span>
        </div>
      </Section>

      <Section title="Subscription">
        <div className="row">
          <span className="row__main">
            <span className="row__title">Plans &amp; billing</span>
            <span className="row__subtitle">Not part of this prototype</span>
          </span>
          <span className="pill pill--maintenance">Demo only</span>
        </div>
      </Section>

      <p className="demo-note">
        <strong>No personal data.</strong> This prototype has no sign-in and collects no
        passwords, email addresses, payment details, or any other personal information.
        Nothing you see here is stored on a server.
      </p>
    </Screen>
  )
}
