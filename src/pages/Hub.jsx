import { useState, useEffect, useRef } from 'react'
import { supabase } from '../supabase'

export default function Hub({ user }) {
  const [hubs, setHubs] = useState([])
  const [activeHub, setActiveHub] = useState(null)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [showNewHub, setShowNewHub] = useState(false)
  const [hubName, setHubName] = useState('')
  const [inviteUsername, setInviteUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showWorkoutPicker, setShowWorkoutPicker] = useState(false)
 const [myWorkouts, setMyWorkouts] = useState([])
const [showInvite, setShowInvite] = useState(false)
const [inviteToHub, setInviteToHub] = useState('')
const [inviteMsg, setInviteMsg] = useState(null)
  const bottomRef = useRef(null)

  useEffect(() => { loadHubs() }, [])
  useEffect(() => {
    if (activeHub) { loadMessages(activeHub.id); subscribeToMessages(activeHub.id) }
  }, [activeHub])
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  async function loadHubs() {
    const { data } = await supabase.from('hub_members').select('hub_id, hubs(id, name, created_by)').eq('user_id', user.id)
    if (data) setHubs(data.map(d => d.hubs))
  }

  async function loadMessages(hubId) {
    const { data } = await supabase.from('messages').select('*, profiles(username), workouts(name, exercises)').eq('hub_id', hubId).order('created_at', { ascending: true })
    if (data) setMessages(data)
  }

  async function loadMyWorkouts() {
    const { data } = await supabase.from('workouts').select('*').eq('user_id', user.id).order('created_at', { ascending: false })
    if (data) setMyWorkouts(data)
  }

  function subscribeToMessages(hubId) {
    const channel = supabase.channel('messages').on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `hub_id=eq.${hubId}` }, () => loadMessages(hubId)).subscribe()
    return () => supabase.removeChannel(channel)
  }

  async function createHub() {
    setLoading(true); setError(null)
    const { data: hub, error: hubError } = await supabase.from('hubs').insert({ name: hubName, created_by: user.id }).select().single()
    if (hubError) { setError(hubError.message); setLoading(false); return }
    await supabase.from('hub_members').insert({ hub_id: hub.id, user_id: user.id })
    if (inviteUsername.trim()) {
      const { data: profile } = await supabase.from('profiles').select('id').eq('username', inviteUsername.trim()).single()
      if (profile) await supabase.from('hub_members').insert({ hub_id: hub.id, user_id: profile.id })
      else setError(`User "${inviteUsername}" not found`)
    }
    setHubName(''); setInviteUsername(''); setShowNewHub(false); setLoading(false); loadHubs()
  }

  async function sendMessage() {
    if (!newMessage.trim()) return
    await supabase.from('messages').insert({ hub_id: activeHub.id, user_id: user.id, type: 'text', content: newMessage.trim() })
    setNewMessage('')
  }
async function inviteMember() {
  if (!inviteToHub.trim()) return
  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('username', inviteToHub.trim())
    .single()
  if (!profile) {
    setInviteMsg('User not found')
    return
  }
  const { error } = await supabase
    .from('hub_members')
    .insert({ hub_id: activeHub.id, user_id: profile.id })
  if (error) {
    setInviteMsg('Could not add user')
  } else {
    setInviteMsg(inviteToHub + ' added!')
    setInviteToHub('')
    setTimeout(() => setInviteMsg(null), 3000)
  }
}
  async function sendWorkout(workout) {
    await supabase.from('messages').insert({ hub_id: activeHub.id, user_id: user.id, type: 'workout', content: workout.name, workout_id: workout.id })
    setShowWorkoutPicker(false)
  }

  function groupByDate(messages) {
    const groups = {}
    messages.forEach(msg => {
      const key = new Date(msg.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric' }).toUpperCase()
      if (!groups[key]) groups[key] = []
      groups[key].push(msg)
    })
    return groups
  }

  const inputStyle = {
    width: '100%', border: '2px solid #C4A97D', borderRadius: '4px',
    padding: '10px 14px', fontSize: '11px', fontWeight: '900',
    textTransform: 'uppercase', letterSpacing: '0.1em',
    backgroundColor: '#EDE8DC', color: '#3B2507',
    fontFamily: 'Arial Black, Arial, sans-serif', boxSizing: 'border-box', outline: 'none',
  }

  const btnPrimary = {
    fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em',
    color: '#EDE8DC', backgroundColor: '#3B2507', border: 'none',
    padding: '10px 16px', borderRadius: '4px', cursor: 'pointer',
    fontFamily: 'Arial Black, Arial, sans-serif',
  }

  // Hub list
  if (!activeHub) return (
    <div style={{ minHeight: '100vh', backgroundColor: '#EDE8DC', fontFamily: 'Arial Black, Arial, sans-serif' }}>
      <div style={{ padding: '48px 24px 20px', borderBottom: '2px solid #C4A97D', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#A0845C', margin: '0 0 6px 0' }}>SHARE</p>
          <h1 style={{ fontSize: '36px', fontWeight: '900', textTransform: 'uppercase', color: '#3B2507', margin: 0, letterSpacing: '0.04em' }}>MY HUBS</h1>
        </div>
        <button onClick={() => setShowNewHub(true)} style={btnPrimary}>+ NEW</button>
      </div>

      {showNewHub && (
        <div style={{ padding: '20px 24px', borderBottom: '2px solid #C4A97D', backgroundColor: '#EDE8DC' }}>
          <div style={{ fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#3B2507', marginBottom: '12px' }}>CREATE A HUB</div>
          {error && <div style={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', color: '#9B2335', marginBottom: '8px' }}>{error}</div>}
          <input type="text" placeholder="HUB NAME..." value={hubName} onChange={e => setHubName(e.target.value)} style={{ ...inputStyle, marginBottom: '8px' }} />
          <input type="text" placeholder="INVITE BY USERNAME (OPTIONAL)" value={inviteUsername} onChange={e => setInviteUsername(e.target.value)} style={{ ...inputStyle, marginBottom: '12px' }} />
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={createHub} disabled={!hubName.trim() || loading} style={{ ...btnPrimary, flex: 1, opacity: (!hubName.trim() || loading) ? 0.5 : 1 }}>
              {loading ? 'CREATING...' : 'CREATE HUB'}
            </button>
            <button onClick={() => { setShowNewHub(false); setError(null) }} style={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A0845C', background: 'none', border: '2px solid #C4A97D', padding: '10px 16px', borderRadius: '4px', cursor: 'pointer', fontFamily: 'Arial Black, Arial, sans-serif' }}>
              CANCEL
            </button>
          </div>
        </div>
      )}

      {hubs.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 24px' }}>
          <div style={{ fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#A0845C', marginBottom: '8px' }}>NO HUBS YET</div>
          <div style={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#C4A97D' }}>CREATE A HUB AND INVITE A FRIEND</div>
        </div>
      ) : (
        hubs.map(hub => (
          <button key={hub.id} onClick={() => setActiveHub(hub)} style={{ width: '100%', padding: '20px 24px', borderBottom: '2px solid #C4A97D', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none', borderBottom: '2px solid #C4A97D', cursor: 'pointer', textAlign: 'left', backgroundColor: '#EDE8DC' }}>
            <div>
              <div style={{ fontSize: '16px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#3B2507', fontFamily: 'Arial Black, Arial, sans-serif' }}>{hub.name}</div>
              <div style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A0845C', marginTop: '3px' }}>TAP TO OPEN</div>
            </div>
            <span style={{ fontSize: '12px', color: '#C4A97D', fontWeight: '900' }}>→</span>
          </button>
        ))
      )}
    </div>
  )

  // Workout picker
  if (showWorkoutPicker) return (
    <div style={{ minHeight: '100vh', backgroundColor: '#EDE8DC', fontFamily: 'Arial Black, Arial, sans-serif' }}>
      <div style={{ padding: '48px 24px 20px', borderBottom: '2px solid #C4A97D', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button onClick={() => setShowWorkoutPicker(false)} style={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A0845C', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Arial Black, Arial, sans-serif' }}>← BACK</button>
        <h1 style={{ fontSize: '24px', fontWeight: '900', textTransform: 'uppercase', color: '#3B2507', margin: 0, letterSpacing: '0.04em' }}>SEND A WORKOUT</h1>
      </div>
      {myWorkouts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 24px', color: '#A0845C' }}>
          <div style={{ fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.15em' }}>NO SAVED WORKOUTS</div>
          <div style={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#C4A97D', marginTop: '8px' }}>BUILD ONE IN THE LOG TAB FIRST</div>
        </div>
      ) : (
        myWorkouts.map(workout => (
          <button key={workout.id} onClick={() => sendWorkout(workout)} style={{ width: '100%', padding: '20px 24px', borderBottom: '2px solid #C4A97D', background: 'none', border: 'none', borderBottom: '2px solid #C4A97D', cursor: 'pointer', textAlign: 'left', backgroundColor: '#EDE8DC' }}>
            <div style={{ fontSize: '15px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#3B2507', marginBottom: '4px', fontFamily: 'Arial Black, Arial, sans-serif' }}>{workout.name}</div>
            <div style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A0845C' }}>{workout.exercises.length} EXERCISES · {new Date(workout.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()}</div>
          </button>
        ))
      )}
    </div>
  )

  // Chat
  const grouped = groupByDate(messages)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', paddingBottom: '64px', backgroundColor: '#EDE8DC', fontFamily: 'Arial Black, Arial, sans-serif' }}>
      <div style={{ borderBottom: '2px solid #C4A97D', backgroundColor: '#EDE8DC' }}>
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '48px 24px 16px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <button onClick={() => setActiveHub(null)} style={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A0845C', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Arial Black, Arial, sans-serif' }}>← BACK</button>
      <span style={{ fontSize: '18px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#3B2507' }}>{activeHub.name}</span>
    </div>
    <button
      onClick={() => setShowInvite(!showInvite)}
      style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A0845C', border: '2px solid #C4A97D', background: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer', fontFamily: 'Arial Black, Arial, sans-serif' }}
    >
      + INVITE
    </button>
  </div>
  {showInvite && (
    <div style={{ padding: '0 24px 16px', display: 'flex', gap: '8px' }}>
      <input
        type="text"
        placeholder="USERNAME..."
        value={inviteToHub}
        onChange={e => setInviteToHub(e.target.value)}
        style={{ flex: 1, border: '2px solid #C4A97D', borderRadius: '4px', padding: '8px 12px', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', backgroundColor: '#EDE8DC', color: '#3B2507', fontFamily: 'Arial Black, Arial, sans-serif', outline: 'none' }}
      />
      <button
        onClick={inviteMember}
        style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#EDE8DC', backgroundColor: '#3B2507', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer', fontFamily: 'Arial Black, Arial, sans-serif' }}
      >
        ADD
      </button>
    </div>
  )}
</div>
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
        {Object.entries(grouped).map(([date, msgs]) => (
          <div key={date}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0 12px' }}>
              <div style={{ flex: 1, height: '2px', backgroundColor: '#C4A97D' }} />
              <span style={{ fontSize: '8px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#A0845C' }}>{date}</span>
              <div style={{ flex: 1, height: '2px', backgroundColor: '#C4A97D' }} />
            </div>
            {msgs.map(msg => {
              const isMe = msg.user_id === user.id
              return (
                <div key={msg.id} style={{ display: 'flex', justifyContent: isMe ? 'flex-end' : 'flex-start', marginBottom: '10px' }}>
                  <div style={{ maxWidth: '75%', display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start' }}>
                    {!isMe && <span style={{ fontSize: '8px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A0845C', marginBottom: '3px' }}>{msg.profiles?.username}</span>}
                    {msg.type === 'workout' ? (
                      <div style={{ border: '2px solid #C4A97D', borderRadius: '6px', overflow: 'hidden', minWidth: '180px' }}>
                        <div style={{ padding: '6px 12px', backgroundColor: isMe ? '#3B2507' : '#C4A97D', fontSize: '8px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.12em', color: '#EDE8DC' }}>WORKOUT SHARED</div>
                        <div style={{ padding: '10px 12px', backgroundColor: '#EDE8DC' }}>
                          <div style={{ fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#3B2507', marginBottom: '6px' }}>{msg.content}</div>
                          {msg.workouts?.exercises?.slice(0, 4).map(ex => (
                            <div key={ex.name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#A0845C', marginBottom: '3px' }}>
                              <span>{ex.name}</span>
                              {ex.sets && ex.reps && <span>{ex.sets}x{ex.reps}</span>}
                            </div>
                          ))}
                          {msg.workouts?.exercises?.length > 4 && <div style={{ fontSize: '8px', fontWeight: '900', textTransform: 'uppercase', color: '#C4A97D', marginTop: '4px' }}>+{msg.workouts.exercises.length - 4} MORE</div>}
                        </div>
                      </div>
                    ) : (
                      <div style={{ padding: '10px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: '900', backgroundColor: isMe ? '#3B2507' : '#C4A97D', color: '#EDE8DC', fontFamily: 'Arial Black, Arial, sans-serif' }}>
                        {msg.content}
                      </div>
                    )}
                    <span style={{ fontSize: '8px', fontWeight: '900', color: '#C4A97D', marginTop: '3px', letterSpacing: '0.08em' }}>
                      {new Date(msg.created_at).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      <div style={{ padding: '12px 24px', borderTop: '2px solid #C4A97D', backgroundColor: '#EDE8DC', display: 'flex', gap: '8px', alignItems: 'center' }}>
        <button
          onClick={() => { loadMyWorkouts(); setShowWorkoutPicker(true) }}
          style={{ width: '36px', height: '36px', backgroundColor: '#C4A97D', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', flexShrink: 0 }}
        >
          🏋️
        </button>
        <input
          type="text"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="MESSAGE..."
          style={{ ...inputStyle, flex: 1 }}
        />
        <button
          onClick={sendMessage}
          disabled={!newMessage.trim()}
          style={{ ...btnPrimary, opacity: !newMessage.trim() ? 0.4 : 1, flexShrink: 0 }}
        >
          SEND
        </button>
      </div>
    </div>
  )
}
