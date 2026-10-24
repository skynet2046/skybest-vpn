# Nova VPN — UI Prototype (DEMO ONLY)

A mobile-first **user-interface prototype** of a VPN app, built with React and Vite.
It is designed to look and feel like a premium dark-blue Android VPN app so the design,
screens, and navigation can be reviewed and iterated on.

> ## Read this first: this is a DEMO, not a VPN
>
> Nova VPN **does not create a VPN tunnel, does not encrypt your traffic, does not
> change or hide your IP address, and does not protect your privacy in any way.**
>
> The "Connected" state is a simulated screen state shown after a short timer. It is not
> evidence that any protection is active. The server list, ping times, and statuses are
> made up. The app collects **no** passwords, email addresses, payment details, or any
> other personal data — it has no accounts and no backend at all.

---

## How to run it

Requirements: [Node.js](https://nodejs.org) 18 or newer.

```bash
npm install     # install dependencies (free, once)
npm start       # start the dev server -> http://localhost:3000
```

To try it on a real Android phone, keep `npm start` running and open the local IP
address it prints (e.g. `http://192.168.x.x:3000`) in Chrome on a phone connected to
the same Wi-Fi network. The layout is designed for phone screens; on a desktop browser
it is centered inside a phone-shaped frame.

## Getting the source code

The whole project is a folder of plain text files — there is nothing hidden. Every file
lives in this project directory (see the file list under "How the prototype works"
below). You can take a copy at any time:

- **Download it.** In Freebuff, open the **Files** panel on the right and download the
  project folder, or copy any single file out of it.
- **Zip it from the terminal:**
  ```bash
  zip -r nova-vpn-source.zip . -x 'node_modules/*' 'dist/*'
  ```
- **Use Git.** The project is a Git repository. Point it at your own repository and push:
  ```bash
  git remote add origin https://github.com/<you>/nova-vpn.git
  git push -u origin HEAD
  ```
- **Export a runnable website.** `npm run build` creates a `dist/` folder with the
  compiled prototype (plain HTML/CSS/JS). You can open `dist/index.html` locally or host
  it on any free static host. It is still only the demo UI — hosting it does not turn it
  into a VPN.

If a folder is missing something, the only files needed to run the app are `index.html`,
`package.json`, `vite.config.js`, and everything inside `src/`.

## How the prototype works

The app is a single-page React app. There is no router library and no backend — screen
switching is a simple `if` statement, which keeps the code easy to read and modify.

```
src/
  main.jsx                     Entry point: mounts <App /> into index.html
  App.jsx                      App shell: which screen is open, shared state, bottom nav
  state/
    useDemoConnection.js       DEMO connection state machine (disconnected → connecting → connected)
  data/
    servers.js                 Fake server list (countries, cities, statuses, ping)
  components/
    BottomNav.jsx              Bottom tab bar (Home / Servers / Settings / Account)
    ConnectButton.jsx          The big round Connect/Disconnect button
    ui.jsx                     Shared bits: Screen, Section, Toggle, demo badge, timer format
  screens/
    HomeScreen.jsx             Status card + Connect button + selected server
    ServersScreen.jsx          Server list with status pills
    SettingsScreen.jsx         Demo toggles + link to the privacy page
    AccountScreen.jsx          Placeholder profile (no sign-in, no data collection)
    PrivacyScreen.jsx          Honest plain-language privacy information page
  styles/
    index.css                  All styling: dark-blue theme, mobile-first, phone frame on desktop
```

### The demo "connection"

`useDemoConnection.js` is a tiny state machine:

- **disconnected** — idle. The button says "Connect".
- **connecting** — a 2.5-second timer, so you can see the loading state. The button says "Cancel".
- **connected** — a fake session timer counts up and the button says "Disconnect".

Nothing touches the network. When you build the real app, you would keep these same
three states but drive them from real events (see the roadmap below).

### What each screen shows

| Screen | Purpose |
| --- | --- |
| Home | Connection status (Disconnected / Connecting / Connected-Demo), big Connect button, current server shortcut |
| Servers | Demo server list with country, city, status (Online / Busy / Maintenance) and fictional ping; picking one returns Home |
| Settings | Auto-connect, Kill Switch, IPv6 protection, notifications — all clearly labeled demo toggles stored only in the browser |
| Account | A placeholder "Demo User" profile; explicitly no sign-in, no password, no payment form |
| Privacy | Plain-language page stating exactly what the prototype does and does not do |

---

## What is still needed to turn this into a real Android VPN

This prototype covers the UI layer only. A real product needs several more layers, and
each one is a substantial piece of work:

### 1. The VPN tunnel itself (Android)

- Implement Android's [`VpnService`](https://developer.android.com/reference/android/net/vpn/VpnService)
  API. This is the only supported way for an app to create a VPN tunnel on Android.
- `VpnService.Builder` sets up the virtual network interface (addresses, routes, DNS
  servers). Traffic is read/written through a `ParcelFileDescriptor`.
- Run the tunnel in a **foreground service** with a visible notification (Android
  requires this for a persistent VPN), and handle `SERVICE_INTERFACE` +
  `BIND_VPN_SERVICE` in the manifest.
- Ask the user for the VPN consent dialog (`VpnService.prepare()`), and handle
  revocation, reconnects, and network changes (Wi-Fi ↔ mobile data).

### 2. A real VPN protocol

Choose and integrate an actual protocol — most apps use **WireGuard** (recommended:
fast, small, modern, has an official Android library) or **OpenVPN**:

- WireGuard: [wireguard.com/kb](https://www.wireguard.com/kb/) and the
  `com.wireguard.android` / `com.wireguard.tunnel` libraries.
- OpenVPN: the open-source `openvpn-android` library.

The web prototype has none of this; the "protocol" would live entirely on the native
side.

### 3. Servers and a backend

- Real server infrastructure (or a reputable reseller/white-label provider) with
  WireGuard/OpenVPN endpoints in each region you list.
- A backend to issue and manage server credentials/keys per client, and to expose the
  list of available locations and their live load.
- The React app would then replace `src/data/servers.js` with a real API fetch.

#### The VPN server itself (WireGuard example)

A "VPN server" is just a small machine on the internet running WireGuard. WireGuard is
free, open-source software, so the only possible cost is renting a VPS (virtual private
server) — roughly the price of a coffee per month from any provider, and nothing in this
step is a paid API or service. You do not need one to keep developing the prototype.

On a fresh Linux VPS (Debian/Ubuntu), the setup is:

```bash
sudo apt update && sudo apt install -y wireguard
# Server keys (keep the private key secret)
wg genkey | tee /etc/wireguard/server.key | wg pubkey > /etc/wireguard/server.pub
# One key pair per client device
wg genkey | tee client.key | wg pubkey > client.pub
```

`/etc/wireguard/wg0.conf` (server side):

```ini
[Interface]
Address = 10.0.0.1/24
ListenPort = 51820
PrivateKey = <contents of /etc/wireguard/server.key>
PostUp = sysctl -w net.ipv4.ip_forward=1; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
PostDown = sysctl -w net.ipv4.ip_forward=0; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE

[Peer]
PublicKey = <contents of client.pub>
AllowedIPs = 10.0.0.2/32
```

Then open UDP port 51820 in the VPS firewall and start it:

```bash
sudo systemctl enable --now wg-quick@wg0
wg show
```

Before writing a single line of Android code, put the client config into the **official
WireGuard app** (free, open-source) on your phone and confirm you can reach the internet
through the tunnel (e.g. your apparent IP becomes the VPS's IP). That proves the server
side works; only then is it worth wiring an app up to it. Section 1 (VpnService) is what
replaces the official app with *your* app.

### 4. Accounts, and being honest about data

- If you add accounts, you need authentication, and a written, accurate privacy policy
  describing exactly what is (and ideally is not) logged.
- Payments, if any, should go through Google Play Billing — never roll your own card
  handling. This prototype deliberately has **no** payment or account code.
- Publish a real privacy policy and terms of service before any public release; store
  listings require them.

### 5. Turning this React UI into an Android app

The React code here is a web prototype. To ship it on Android, the usual options are:

- **Capacitor (simplest for a web codebase):** wrap this Vite app in a native Android
  shell. Good for the UI, but the VPN tunnel must still be written natively in Kotlin
  and called through a small Capacitor plugin.
- **Rewrite natively in Kotlin + Jetpack Compose:** best result for a real VPN app —
  `VpnService` is native, and Compose can reproduce this design closely. Most work,
  but the most control and best performance.
- **React Native:** possible, but VPN tunneling still requires native modules, so you
  end up writing the hard part natively anyway.

### 6. Testing, security, and store compliance

- Test on real devices and multiple Android versions (the `VpnService` behavior and
  battery policies vary by OEM).
- Handle always-on VPN and "block connections without VPN" (Android's built-in kill
  switch), which are expectations for a serious VPN app.
- Google Play has specific requirements for VPN apps (disclosure of what the VPN does,
  data-safety form, and restrictions on using VPN for abuse). Review those before
  publishing.

### Summary

| Layer | In this prototype? |
| --- | --- |
| UI / screens / navigation | Yes (demo) |
| VPN tunnel (`VpnService`) | No |
| Real protocol (WireGuard/OpenVPN) | No |
| Servers + backend | No (fake list only) |
| Accounts / payments | No (deliberately absent) |
| Privacy policy / legal | No (privacy page explains the demo) |

---

## Free and beginner-friendly by design

- Only free dependencies: React, React DOM, and Vite. No paid APIs, no services, no
  accounts required to run it.
- Plain CSS (no Tailwind/UI kit), plain JavaScript (no TypeScript), and no router
  library — chosen to keep the project easy for a beginner to read and modify.
- Every screen file is small and self-contained; edit `src/data/servers.js` to change
  the server list, or `src/styles/index.css` `:root` tokens to re-theme the app.
