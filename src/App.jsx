import { useState } from 'react'
import './App.css'

const initialSessions = [
    { id: 1, device: 'MacBook Pro', browser: 'Chrome 128', os: 'macOS 14.6', location: 'Brooklyn, NY', time: 'Now', current: true, color: 'coral' },
    { id: 2, device: 'iPhone 15 Pro', browser: 'Safari Mobile', os: 'iOS 17.5.1', location: 'Brooklyn, NY', time: '2 hours ago', color: 'blue' },
    { id: 3, device: 'ThinkPad X1 Carbon', browser: 'Firefox 127', os: 'Windows 11', location: 'London, UK', time: 'Yesterday, 9:42 AM', color: 'purple' },
]

const activity = [
    { icon: 'key', title: 'Successful login', detail: 'MacBook Pro · Chrome 128', location: 'Brooklyn, NY', time: 'Today, 10:14 AM', status: 'Verified' },
    { icon: 'shield', title: 'New device verified', detail: 'iPhone 15 Pro · Safari Mobile', location: 'Brooklyn, NY', time: 'Today, 8:03 AM', status: 'Trusted' },
    { icon: 'login', title: 'Successful login', detail: 'ThinkPad X1 Carbon · Firefox 127', location: 'London, UK', time: 'Yesterday, 9:42 AM', status: 'Verified' },
    { icon: 'lock', title: 'Password changed', detail: 'Account security settings', location: 'Brooklyn, NY', time: 'Aug 18, 2024', status: 'Complete' },
]

function Icon({ name, size = 18 }) {
    const paths = {
        grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
        shield: <><path d="M12 3 20 6v5c0 5-3.4 8.3-8 10-4.6-1.7-8-5-8-10V6l8-3Z" /><path d="m8.5 12 2.3 2.3 4.8-5" /></>,
        activity: <path d="M3 12h4l2-6 4 12 2-6h6" />,
        devices: <><rect x="3" y="4" width="13" height="10" rx="1.5" /><path d="M7 18h5M9.5 14v4M19 7v10M17 19h4" /></>,
        settings: <><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" /><circle cx="12" cy="12" r="4" /></>,
        help: <><circle cx="12" cy="12" r="9" /><path d="M9.7 9a2.4 2.4 0 1 1 3.8 2c-1.1.8-1.5 1.2-1.5 2.3M12 16.5h.01" /></>,
        search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></>,
        bell: <><path d="M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4" /></>,
        more: <><circle cx="5" cy="12" r="1" fill="currentColor" /><circle cx="12" cy="12" r="1" fill="currentColor" /><circle cx="19" cy="12" r="1" fill="currentColor" /></>,
        key: <><circle cx="8" cy="15" r="4" /><path d="m11 12 7-7 3 3-2 2 2 2-2 2-2-2-3 3" /></>,
        login: <><path d="M14 3h5v18h-5M10 8l4 4-4 4M14 12H3" /></>,
        lock: <><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
    }
    return <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function App() {
    const [sessions, setSessions] = useState(initialSessions)
    const [activeView, setActiveView] = useState('Overview')
    const [otpEnabled, setOtpEnabled] = useState(true)
    const [trustedDevice, setTrustedDevice] = useState(true)
    const [expiry, setExpiry] = useState('30 days')
    const [notice, setNotice] = useState('')

    const notify = (message) => { setNotice(message); window.setTimeout(() => setNotice(''), 2600) }
    const revokeSession = (id) => { setSessions((current) => current.filter((session) => session.id !== id)); notify('Session revoked successfully') }
    const navItems = [{ label: 'Overview', icon: 'grid' }, { label: 'Activity log', icon: 'activity' }, { label: 'Devices & sessions', icon: 'devices' }]

    return (
        <div className="app-shell">
            <aside className="sidebar"><div className="brand"><span className="brand-mark"><Icon name="shield" size={17} /></span><span>fortress</span></div><div className="workspace-label">WORKSPACE</div><button className="workspace-switcher" type="button" onClick={() => notify('Workspace switcher opened')}><span className="workspace-avatar">A</span><span>Acme Inc.</span><span className="chevron">⌄</span></button><nav className="primary-nav" aria-label="Primary navigation">{navItems.map((item) => <button className={activeView === item.label ? 'nav-item active' : 'nav-item'} type="button" key={item.label} onClick={() => setActiveView(item.label)}><Icon name={item.icon} /><span>{item.label}</span>{item.label === 'Activity log' && <span className="nav-count">24</span>}</button>)}</nav><div className="nav-divider" /><button className="nav-item" type="button" onClick={() => notify('Account settings opened')}><Icon name="settings" /><span>Settings</span></button><button className="nav-item" type="button" onClick={() => notify('Help center opened')}><Icon name="help" /><span>Help center</span></button><div className="sidebar-footer"><div className="user-row"><span className="avatar">NA</span><span className="user-copy"><strong>NADEEM</strong><small>Admin</small></span><button className="more-button" type="button" aria-label="Open account menu" onClick={() => notify('Account menu opened')}><Icon name="more" /></button></div></div></aside>
            <main className="main-content"><header className="topbar"><div className="breadcrumbs"><span>Security</span><span>/</span><strong>{activeView}</strong></div><div className="top-actions"><button className="icon-button" type="button" aria-label="Search" onClick={() => notify('Search is ready')}><Icon name="search" /></button><button className="icon-button notification-button" type="button" aria-label="Notifications" onClick={() => notify('No new notifications')}><Icon name="bell" /><i /></button><span className="top-avatar">JD</span></div></header>
                <div className="page-content">{activeView === 'Activity log' ? <ActivityView notify={notify} /> : activeView === 'Devices & sessions' ? <SessionsView sessions={sessions} revokeSession={revokeSession} notify={notify} /> : <><section className="page-heading"><div><p className="eyebrow">SECURITY CENTER</p><h1>Good morning, NADEEM <span>✦</span></h1><p className="heading-copy">Keep your account protected and stay in control of access.</p></div><button className="outline-button" type="button" onClick={() => notify('Security report exported')}><span>Export report</span><span className="download-mark">↓</span></button></section><section className="status-banner"><span className="status-icon"><Icon name="shield" size={20} /></span><div><strong>Your account is protected</strong><p>All security checks are passing. Last reviewed just now.</p></div><span className="status-check">✓</span></section><section className="metric-grid"><Metric label="Active sessions" value={sessions.length} detail="Across 3 locations" accent="coral" icon="devices" /><Metric label="Security score" value="92" suffix="/100" detail="Excellent protection" accent="mint" icon="shield" /><Metric label="Login activity" value="24" detail="Events this month" accent="blue" icon="activity" /></section><div className="content-grid"><section className="panel sessions-panel"><div className="panel-header"><div><p className="eyebrow">LIVE ACCESS</p><h2>Active sessions</h2></div><button className="text-button" type="button" onClick={() => setActiveView('Devices & sessions')}>View all <span>→</span></button></div><p className="panel-intro">Devices currently signed in to your account.</p><div className="session-list">{sessions.slice(0, 2).map((session) => <SessionRow key={session.id} session={session} revokeSession={revokeSession} />)}</div><button className="manage-button" type="button" onClick={() => setActiveView('Devices & sessions')}>Manage all sessions <span>→</span></button></section><section className="panel activity-panel"><div className="panel-header"><div><p className="eyebrow">RECENT EVENTS</p><h2>Login activity</h2></div><button className="text-button" type="button" onClick={() => setActiveView('Activity log')}>View log <span>→</span></button></div><p className="panel-intro">A record of recent account access.</p><div className="activity-list">{activity.slice(0, 3).map((event) => <ActivityRow key={event.time} event={event} />)}</div></section></div><section className="panel preferences-panel"><div><p className="eyebrow">ACCESS CONTROL</p><h2>Security preferences</h2><p className="panel-intro">Configure how Fortress protects your account.</p></div><div className="preference-list"><Preference title="Two-factor authentication" detail="Require an OTP for unrecognized devices." enabled={otpEnabled} onToggle={() => setOtpEnabled(!otpEnabled)} tag="Recommended" /><Preference title="Remember trusted devices" detail="Skip verification on devices you trust." enabled={trustedDevice} onToggle={() => setTrustedDevice(!trustedDevice)} /><div className="preference-row"><div><strong>Session expiry</strong><p>Automatically sign out inactive sessions.</p></div><select value={expiry} onChange={(event) => { setExpiry(event.target.value); notify(`Session expiry set to ${event.target.value}`) }} aria-label="Session expiry"><option>7 days</option><option>30 days</option><option>90 days</option></select></div></div></section></>}</div>
            </main>{notice && <div className="toast"><span>✓</span>{notice}</div>}
        </div>
    )
}

function Metric({ label, value, suffix, detail, accent, icon }) { return <div className={`metric-card ${accent}`}><div className="metric-icon"><Icon name={icon} size={19} /></div><div><p>{label}</p><div className="metric-value">{value}<small>{suffix}</small></div><span>{detail}</span></div></div> }
function SessionRow({ session, revokeSession }) { return <div className="session-row"><span className={`device-icon ${session.color}`}><Icon name="devices" size={22} /></span><div className="session-detail"><strong>{session.device} {session.current && <em>Current</em>}</strong><p>{session.browser} · {session.os}</p><span>{session.location} · {session.time}</span></div><button className="revoke-button" type="button" onClick={() => revokeSession(session.id)}>{session.current ? 'Sign out' : 'Revoke'}</button></div> }
function ActivityRow({ event }) { return <div className="activity-row"><span className="activity-icon"><Icon name={event.icon} size={17} /></span><div className="activity-detail"><strong>{event.title}</strong><p>{event.detail}</p><span>{event.location}</span></div><div className="activity-meta"><span className="verified">{event.status}</span><small>{event.time}</small></div></div> }
function Preference({ title, detail, enabled, onToggle, tag }) { return <div className="preference-row"><div><strong>{title} {tag && <span className="tag">{tag}</span>}</strong><p>{detail}</p></div><button className={`toggle ${enabled ? 'on' : ''}`} type="button" role="switch" aria-checked={enabled} aria-label={`${title}: ${enabled ? 'on' : 'off'}`} onClick={onToggle}><span /></button></div> }
function ActivityView({ notify }) { return <><section className="page-heading compact-heading"><div><p className="eyebrow">SECURITY CENTER / ACTIVITY</p><h1>Login activity</h1><p className="heading-copy">Review every authentication event across your workspace.</p></div><button className="outline-button" type="button" onClick={() => notify('Activity report exported')}><span>Export report</span><span className="download-mark">↓</span></button></section><section className="panel full-panel"><div className="filter-bar"><div className="filter-title"><strong>All activity</strong><span>24 events</span></div><button className="filter-button" type="button" onClick={() => notify('Showing activity from the last 30 days')}>Last 30 days <span>⌄</span></button></div><div className="activity-list large-list">{activity.map((event) => <ActivityRow key={event.time} event={event} />)}</div></section></> }
function SessionsView({ sessions, revokeSession, notify }) { return <><section className="page-heading compact-heading"><div><p className="eyebrow">SECURITY CENTER / DEVICES</p><h1>Devices & sessions</h1><p className="heading-copy">Manage every device with access to your account.</p></div><button className="danger-button" type="button" onClick={() => { sessions.slice(1).forEach((session) => revokeSession(session.id)); notify('Other sessions revoked') }}>Revoke all other sessions</button></section><section className="panel full-panel"><div className="panel-header"><div><h2>Active sessions</h2><p className="panel-intro">{sessions.length} device{sessions.length === 1 ? '' : 's'} currently signed in.</p></div></div><div className="session-list large-list">{sessions.map((session) => <SessionRow key={session.id} session={session} revokeSession={revokeSession} />)}</div></section></> }

export default App
