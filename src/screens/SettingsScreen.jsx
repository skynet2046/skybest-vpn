import { Screen, Section, Toggle } from '../components/ui.jsx'

/**
 * SETTINGS SCREEN
 * Preference switches plus links to the privacy page and version info.
 *
 * The toggles only remember their own on/off state in the browser.
 * They do not configure any real VPN behaviour.
 */

export default function SettingsScreen({ settings, onSettingsChange, onOpenPrivacy }) {
  function update(key, value) {
    onSettingsChange({ ...settings, [key]: value })
  }

  return (
    <Screen title="Settings">
      <Section title="Connection">
        <SettingRow
          label="Auto-connect on launch"
          description="Demo toggle — nothing happens automatically."
          control={<Toggle label="Auto-connect on launch" checked={settings.autoConnect} onChange={(v) => update('autoConnect', v)} />}
        />
        <SettingRow
          label="Block connections when disconnected (Kill Switch)"
          description="Demo toggle — no traffic is ever blocked or allowed by this app."
          control={<Toggle label="Kill switch" checked={settings.killSwitch} onChange={(v) => update('killSwitch', v)} />}
        />
        <SettingRow
          label="IPv6 protection"
          description="Demo toggle — IPv6 handling is not implemented."
          control={<Toggle label="IPv6 protection" checked={settings.ipv6Protection} onChange={(v) => update('ipv6Protection', v)} />}
        />
      </Section>

      <Section title="App">
        <SettingRow
          label="Connection notifications"
          description="Demo toggle — the app never sends notifications."
          control={<Toggle label="Connection notifications" checked={settings.notifications} onChange={(v) => update('notifications', v)} />}
        />
        <button type="button" className="row row--button" onClick={onOpenPrivacy}>
          <span className="row__main">
            <span className="row__title">Privacy &amp; data</span>
            <span className="row__subtitle">What this prototype does and does not do</span>
          </span>
          <span className="row__meta" aria-hidden="true">›</span>
        </button>
      </Section>

      <Section title="About">
        <div className="row">
          <span className="row__main">
            <span className="row__title">Version</span>
          </span>
          <span className="row__meta">0.1.0 (demo)</span>
        </div>
      </Section>

      <p className="demo-note">
        <strong>Demo mode.</strong> Settings are stored only in this browser tab. Nothing here
        changes how your device handles network traffic.
      </p>
    </Screen>
  )
}

function SettingRow({ label, description, control }) {
  return (
    <div className="row">
      <span className="row__main">
        <span className="row__title">{label}</span>
        <span className="row__subtitle">{description}</span>
      </span>
      {control}
    </div>
  )
}
