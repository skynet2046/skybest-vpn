import { useState } from 'react'
import BottomNav from './components/BottomNav.jsx'
import HomeScreen from './screens/HomeScreen.jsx'
import ServersScreen from './screens/ServersScreen.jsx'
import SettingsScreen from './screens/SettingsScreen.jsx'
import AccountScreen from './screens/AccountScreen.jsx'
import PrivacyScreen from './screens/PrivacyScreen.jsx'
import { useDemoConnection } from './state/useDemoConnection.js'
import { findDefaultServer, SERVERS } from './data/servers.js'

/**
 * APP SHELL
 * Holds the state shared by every screen:
 *   - which tab/screen is showing
 *   - the demo connection state
 *   - which server is selected
 *   - the settings toggles
 * and renders the bottom navigation.
 *
 * Screen switching is a simple `if` instead of a router library,
 * to keep the code easy for a beginner to follow.
 */

export default function App() {
  // 'privacy' is a sub-page of Settings, so it is tracked separately
  // from the bottom-nav tab.
  const [activeTab, setActiveTab] = useState('home')
  const [showPrivacy, setShowPrivacy] = useState(false)

  const { status, sessionSeconds, toggleConnection } = useDemoConnection()
  const [selectedServerId, setSelectedServerId] = useState(findDefaultServer().id)
  const [settings, setSettings] = useState({
    autoConnect: false,
    killSwitch: false,
    ipv6Protection: true,
    notifications: true,
  })

  const selectedServer = SERVERS.find((server) => server.id === selectedServerId)

  function handleTabChange(tab) {
    setShowPrivacy(false)
    setActiveTab(tab)
  }

  return (
    <div className="app">
      <main className="app__content">
        {showPrivacy ? (
          <PrivacyScreen onBack={() => setShowPrivacy(false)} />
        ) : activeTab === 'home' ? (
          <HomeScreen
            status={status}
            sessionSeconds={sessionSeconds}
            server={selectedServer}
            onToggle={toggleConnection}
            onChangeServer={() => handleTabChange('servers')}
          />
        ) : activeTab === 'servers' ? (
          <ServersScreen
            selectedServerId={selectedServerId}
            onSelectServer={(id) => {
              setSelectedServerId(id)
              setActiveTab('home')
            }}
          />
        ) : activeTab === 'settings' ? (
          <SettingsScreen
            settings={settings}
            onSettingsChange={setSettings}
            onOpenPrivacy={() => setShowPrivacy(true)}
          />
        ) : (
          <AccountScreen sessionSeconds={sessionSeconds} />
        )}
      </main>

      <BottomNav current={activeTab} onSelect={handleTabChange} />
    </div>
  )
}
