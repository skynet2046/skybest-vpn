import { Screen, Section } from '../components/ui.jsx'

/**
 * PRIVACY INFORMATION SCREEN
 * Plain-language page describing exactly what this prototype does and
 * does not do. Written to be honest: it makes no encryption or privacy
 * claims, because the prototype implements none of them.
 */

export default function PrivacyScreen({ onBack }) {
  return (
    <div className="screen">
      <header className="screen__header">
        <button type="button" className="back-button" onClick={onBack} aria-label="Back to settings">
          ‹ Back
        </button>
        <h1 className="screen__title">Privacy &amp; data</h1>
      </header>

      <Section title="What this prototype is">
        <p className="prose">
          Nova VPN in this form is a <strong>user-interface prototype</strong> — a design mock-up
          you can click through. It runs entirely in your browser as a demonstration of what a
          VPN app could look like.
        </p>
      </Section>

      <Section title="What it does NOT do">
        <ul className="prose-list">
          <li>It does not create a VPN tunnel or change how your device connects to the internet.</li>
          <li>It does not encrypt any traffic.</li>
          <li>It does not hide or change your IP address.</li>
          <li>It does not route your traffic through the servers listed.</li>
          <li>It does not block trackers, ads, or malicious sites.</li>
        </ul>
        <p className="prose">
          The “Connected” state is a simulated screen state, shown after a short timer. It is not
          evidence that any protection is active.
        </p>
      </Section>

      <Section title="Data it collects">
        <p className="prose">
          None. There is no account system, no sign-in, no password field, no payment form, and
          no analytics. The only things stored are your on/off toggle choices, kept in this
          browser tab’s local storage, and they never leave your device.
        </p>
      </Section>

      <Section title="Before this becomes a real app">
        <p className="prose">
          A real VPN service would need an honest privacy policy covering, at minimum: what
          connection or usage logs exist (ideally none), where the company is legally based, how
          servers are secured, and how customer data is handled. That policy would have to be
          written and reviewed by the operator — it is deliberately not faked here.
        </p>
      </Section>
    </div>
  )
}
