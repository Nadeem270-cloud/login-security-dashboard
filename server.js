import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const dashboard = {
  sessions: [
    { id: 1, device: 'MacBook Pro', browser: 'Chrome 128', os: 'macOS 14.6', location: 'Brooklyn, NY', time: 'Now', current: true, color: 'coral' },
    { id: 2, device: 'iPhone 15 Pro', browser: 'Safari Mobile', os: 'iOS 17.5.1', location: 'Brooklyn, NY', time: '2 hours ago', color: 'blue' },
    { id: 3, device: 'ThinkPad X1 Carbon', browser: 'Firefox 127', os: 'Windows 11', location: 'London, UK', time: 'Yesterday, 9:42 AM', color: 'purple' },
  ],
  activity: [
    { icon: 'key', title: 'Successful login', detail: 'MacBook Pro · Chrome 128', location: 'Brooklyn, NY', time: 'Today, 10:14 AM', status: 'Verified' },
    { icon: 'shield', title: 'New device verified', detail: 'iPhone 15 Pro · Safari Mobile', location: 'Brooklyn, NY', time: 'Today, 8:03 AM', status: 'Trusted' },
    { icon: 'login', title: 'Successful login', detail: 'ThinkPad X1 Carbon · Firefox 127', location: 'London, UK', time: 'Yesterday, 9:42 AM', status: 'Verified' },
    { icon: 'lock', title: 'Password changed', detail: 'Account security settings', location: 'Brooklyn, NY', time: 'Aug 18, 2024', status: 'Complete' },
  ],
  metrics: [
    { label: 'Active sessions', value: 3, detail: 'Across 3 locations', accent: 'coral', icon: 'devices' },
    { label: 'Security score', value: 92, suffix: '/100', detail: 'Excellent protection', accent: 'mint', icon: 'shield' },
    { label: 'Login activity', value: 24, detail: 'Events this month', accent: 'blue', icon: 'activity' },
  ],
  preferences: [
    { key: 'otp', title: 'One-time password', detail: 'Require a 6-digit code on every new login.', enabled: true, tag: 'Recommended' },
    { key: 'trusted', title: 'Trusted devices', detail: 'Skip extra checks on recognized devices.', enabled: true },
    { key: 'session', title: 'Session timeout', detail: 'Automatically sign out inactive sessions.', enabled: true, tag: 'Security' },
  ],
}

app.get('/api/security/dashboard', (req, res) => {
  res.json(dashboard)
})

app.patch('/api/security/sessions/:id/revoke', (req, res) => {
  const { id } = req.params
  const updatedSessions = dashboard.sessions.filter((session) => String(session.id) !== String(id))
  dashboard.sessions = updatedSessions

  res.json({
    message: 'Session revoked successfully',
    sessions: dashboard.sessions,
  })
})

app.patch('/api/security/preferences/:key/toggle', (req, res) => {
  const { key } = req.params
  dashboard.preferences = dashboard.preferences.map((item) => {
    if (item.key === key) {
      return { ...item, enabled: !item.enabled }
    }
    return item
  })

  res.json({
    message: 'Preference updated',
    preferences: dashboard.preferences,
  })
})

app.listen(PORT, () => {
  console.log(`Security API running on http://localhost:${PORT}`)
})
