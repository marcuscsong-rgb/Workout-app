import { useState, useEffect } from 'react'
import { supabase } from '../supabase'

const BASE = '#EDE8DC'
const DARK = '#3B2507'
const MID = '#A0845C'
const BORDER = '#C4A97D'
const FONT = 'Arial Black, Arial, sans-serif'

export default function Profile({ user }) {
  const [username, setUsername] = useState('')
  const [currentUsername, setCurrentUsername] = useState('')
  const [usernameMsg, setUsernameMsg] = useState(null)
  const [savingUsername, setSavingUsername] = useState(false)

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordMsg, setPasswordMsg] = useState(null)
  const [savingPassword, setSavingPassword] = useState(false)

  useEffect(() => {
    supabase.from('profiles').select('username').eq('id', user.id).single().then(({ data }) => {
      if (data) { setUsername(data.username); setCurrentUsername(data.username) }
    })
  }, [])

  async function saveUsername() {
    if (!username.trim() || username.trim() === currentUsername) return
    setSavingUsername(true)
    setUsernameMsg(null)
    const { error } = await supabase
      .from('profiles')
      .update({ username: username.trim() })
      .eq('id', user.id)
    setSavingUsername(false)
    if (error) {
      setUsernameMsg(error.message.includes('duplicate') ? 'That username is already taken' : 'Could not update username')
    } else {
      setCurrentUsername(username.trim())
      setUsernameMsg('Username updated')
      setTimeout(() => setUsernameMsg(null), 3000)
    }
  }

  async function savePassword() {
    if (!password) return
    if (password.length < 6) { setPasswordMsg('Password must be at least 6 characters'); return }
    if (password !== confirmPassword) { setPasswordMsg('Passwords do not match'); return }
    setSavingPassword(true)
    setPasswordMsg(null)
    const { error } = await supabase.auth.updateUser({ password })
    setSavingPassword(false)
    if (error) {
      setPasswordMsg(error.message)
    } else {
      setPassword('')
      setConfirmPassword('')
      setPasswordMsg('Password updated')
      setTimeout(() => setPasswordMsg(null), 3000)
    }
  }

  async function logout() {
    await supabase.auth.signOut()
  }

  const inputStyle = {
    width: '100%', border: '2px solid ' + BORDER, borderRadius: '4px',
    padding: '10px 14px', fontSize: '13px', fontWeight: '700',
    backgroundColor: BASE, color: DARK, fontFamily: 'Arial, sans-serif',
    boxSizing: 'border-box', outline: 'none', marginBottom: '8px',
  }

  const labelStyle = {
    fontSize: '9px', fontWeight: '900', textTransform: 'uppercase',
    letterSpacing: '0.12em', color: MID, marginBottom: '6px', display: 'block',
  }

  const btnStyle = {
    fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em',
    color: BASE, backgroundColor: DARK, border: 'none',
    padding: '10px 16px', borderRadius: '4px', cursor: 'pointer', fontFamily: FONT,
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: BASE, fontFamily: FONT, paddingBottom: '80px' }}>

      <div style={{ padding: '48px 24px 20px', borderBottom: '2px solid ' + BORDER }}>
        <p style={{ fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.2em', color: MID, margin: '0 0 6px 0' }}>ACCOUNT</p>
        <h1 style={{ fontSize: '36px', fontWeight: '900', textTransform: 'uppercase', color: DARK, margin: 0, letterSpacing: '0.04em' }}>PROFILE</h1>
      </div>

      {/* Username section */}
      <div style={{ padding: '24px', borderBottom: '2px solid ' + BORDER }}>
        <label style={labelStyle}>USERNAME</label>
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} style={inputStyle} />
        {usernameMsg && (
          <div style={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.08em', color: usernameMsg.includes('updated') ? '#2D6A4F' : '#9B2335', marginBottom: '8px' }}>{usernameMsg}</div>
        )}
        <button onClick={saveUsername} disabled={savingUsername || !username.trim() || username.trim() === currentUsername} style={{ ...btnStyle, opacity: (savingUsername || !username.trim() || username.trim() === currentUsername) ? 0.5 : 1 }}>
          {savingUsername ? 'SAVING...' : 'SAVE USERNAME'}
        </button>
      </div>

      {/* Password section */}
      <div style={{ padding: '24px', borderBottom: '2px solid ' + BORDER }}>
        <label style={labelStyle}>NEW PASSWORD</label>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" style={inputStyle} />
        <label style={labelStyle}>CONFIRM NEW PASSWORD</label>
        <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="••••••••" style={inputStyle} />
        {passwordMsg && (
          <div style={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.08em', color: passwordMsg.includes('updated') ? '#2D6A4F' : '#9B2335', marginBottom: '8px' }}>{passwordMsg}</div>
        )}
        <button onClick={savePassword} disabled={savingPassword || !password} style={{ ...btnStyle, opacity: (savingPassword || !password) ? 0.5 : 1 }}>
          {savingPassword ? 'SAVING...' : 'SAVE PASSWORD'}
        </button>
      </div>

      {/* Logout */}
      <div style={{ padding: '24px' }}>
        <button onClick={logout} style={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9B2335', backgroundColor: 'none', border: '2px solid #9B2335', padding: '10px 16px', borderRadius: '4px', cursor: 'pointer', fontFamily: FONT }}>
          LOG OUT
        </button>
      </div>
    </div>
  )
}
