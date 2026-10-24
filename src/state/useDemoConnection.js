import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * DEMO connection state machine.
 *
 * IMPORTANT: This hook does NOT create a VPN tunnel, does NOT change your IP
 * address, and does NOT encrypt any traffic. It only animates the three UI
 * states the app needs to show:
 *
 *   'disconnected' -> 'connecting' -> 'connected'
 *
 * The "connecting" phase is just a timer so you can see the loading state.
 * When you build the real Android app, you would replace this hook's internals
 * with calls to Android's VpnService (see README.md).
 */

export const CONNECTION_STATES = {
  DISCONNECTED: 'disconnected',
  CONNECTING: 'connecting',
  CONNECTED: 'connected',
}

// How long the fake "connecting" animation lasts, in milliseconds.
const FAKE_CONNECTING_MS = 2500

export function useDemoConnection() {
  const [status, setStatus] = useState(CONNECTION_STATES.DISCONNECTED)
  const [sessionSeconds, setSessionSeconds] = useState(0)
  const timeoutRef = useRef(null)

  // Counts the fake session time while "connected".
  useEffect(() => {
    if (status !== CONNECTION_STATES.CONNECTED) return
    const interval = setInterval(() => {
      setSessionSeconds((s) => s + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [status])

  // Clean up the fake connecting timer if the component unmounts.
  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const disconnect = useCallback(() => {
    clearTimeout(timeoutRef.current)
    setStatus(CONNECTION_STATES.DISCONNECTED)
    setSessionSeconds(0)
  }, [])

  const connect = useCallback(() => {
    setStatus(CONNECTION_STATES.CONNECTING)
    timeoutRef.current = setTimeout(() => {
      setStatus(CONNECTION_STATES.CONNECTED)
    }, FAKE_CONNECTING_MS)
  }, [])

  /** Starts or stops the DEMO connection depending on current state. */
  const toggleConnection = useCallback(() => {
    if (status === CONNECTION_STATES.DISCONNECTED) {
      connect()
    } else {
      // Both 'connecting' (cancel) and 'connected' go back to disconnected.
      disconnect()
    }
  }, [status, connect, disconnect])

  return { status, sessionSeconds, toggleConnection, disconnect }
}
