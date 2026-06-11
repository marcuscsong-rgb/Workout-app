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
  const bottomRef = useRef(null)

  useEffect(() => { loadHubs() }, [])

  useEffect(() => {
    if (activeHub) {
      loadMessages(activeHub.id)
      subscribeToMessages(activeHub.id)
    }
  }, [activeHub])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function loadHubs() {
    const { data, error } = await supabase
      .from('hub_members')
      .select('hub_id, hubs(id, name, created_by)')
      .eq('user_id', user.id)
    if (!error && data) setHubs(data.map(d => d.hubs))
  }

  async function loadMessages(hubId) {
    const { data } = await supabase
      .from('messages')
      .select('*, profiles(username), workouts(name, exercises)')
      .eq('hub_id', hubId)
      .order('created_at', { ascending: true })
    if (data) setMessages(data)
  }

  async function loadMyWorkouts() {
    const { data } = await supabase
      .from('workouts')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    if (data) setMyWorkouts(data)
  }

  function subscribeToMessages(hubId) {
    const channel = supabase
      .channel('messages')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `hub_id=eq.${hubId}`
      }, () => { loadMessages(hubId) })
      .subscribe()
    return () => supabase.removeChannel(channel)
  }

  async function createHub() {
    setLoading(true)
    setError(null)
    const { data: hub, error: hubError } = await supabase
      .from('hubs')
      .insert({ name: hubName, created_by: user.id })
      .select()
      .single()
    if (hubError) { setError(hubError.message); setLoading(false); return }
    await supabase.from('hub_members').insert({ hub_id: hub.id, user_id: user.id })
    if (inviteUsername.trim()) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('username', inviteUsername.trim())
        .single()
      if (profile) {
        await supabase.from('hub_members').insert({ hub_id: hub.id, user_id: profile.id })
      } else {
        setError(`User "${inviteUsername}" not found — hub created without them`)
      }
    }
    setHubName('')
    setInviteUsername('')
    setShowNewHub(false)
    setLoading(false)
    loadHubs()
  }

  async function sendMessage() {
    if (!newMessage.trim()) return
    await supabase.from('messages').insert({
      hub_id: activeHub.id,
      user_id: user.id,
      type: 'text',
      content: newMessage.trim()
    })
    setNewMessage('')
  }

  async function sendWorkout(workout) {
    await supabase.from('messages').insert({
      hub_id: activeHub.id,
      user_id: user.id,
      type: 'workout',
      content: workout.name,
      workout_id: workout.id
    })
    setShowWorkoutPicker(false)
  }

  function groupByDate(messages) {
    const groups = {}
    messages.forEach(msg => {
      const date = new Date(msg.created_at)
      const key = date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })
      if (!groups[key]) groups[key] = []
      groups[key].push(msg)
    })
    return groups
  }

  // Hub list screen
  if (!activeHub) {
    return (
      <div className="p-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">My Hubs</h1>
          <button
            onClick={() => setShowNewHub(true)}
            className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-xl"
          >
            + New Hub
          </button>
        </div>

        {showNewHub && (
          <div className="bg-white border border-gray-100 rounded-2xl p-4 mb-4 shadow-sm">
            <h2 className="font-semibold mb-3">Create a Hub</h2>
            {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
            <input
              type="text"
              placeholder="Hub name (e.g. Morning Crew)"
              value={hubName}
              onChange={e => setHubName(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm mb-3 outline-none focus:border-blue-400"
            />
            <input
              type="text"
              placeholder="Invite by username (optional)"
              value={inviteUsername}
              onChange={e => setInviteUsername(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm mb-3 outline-none focus:border-blue-400"
            />
            <div className="flex gap-2">
              <button
                onClick={createHub}
                disabled={!hubName.trim() || loading}
                className="flex-1 bg-blue-600 text-white text-sm font-medium py-2.5 rounded-xl disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Hub'}
              </button>
              <button
                onClick={() => { setShowNewHub(false); setError(null) }}
                className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {hubs.length === 0 ? (
          <div className="text-center text-gray-400 mt-16">
            <div className="text-4xl mb-3">💬</div>
            <div className="font-medium text-gray-500 mb-1">No hubs yet</div>
            <div className="text-sm">Create a hub and invite a friend to get started</div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {hubs.map(hub => (
              <button
                key={hub.id}
                onClick={() => setActiveHub(hub)}
                className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm text-left flex items-center gap-3"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg flex-shrink-0">
                  {hub.name[0].toUpperCase()}
                </div>
                <div>
                  <div className="font-semibold text-gray-800">{hub.name}</div>
                  <div className="text-xs text-gray-400">Tap to open</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  // Workout picker overlay
  if (showWorkoutPicker) {
    return (
      <div className="flex flex-col h-screen pb-16">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 bg-white">
          <button onClick={() => setShowWorkoutPicker(false)} className="text-blue-600 text-sm">← Back</button>
          <span className="font-semibold">Send a Workout</span>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          {myWorkouts.length === 0 ? (
            <div className="text-center text-gray-400 mt-16">
              <div className="text-4xl mb-3">🏋️</div>
              <div className="font-medium text-gray-500 mb-1">No saved workouts yet</div>
              <div className="text-sm">Build a workout in the Log tab first</div>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {myWorkouts.map(workout => (
                <button
                  key={workout.id}
                  onClick={() => sendWorkout(workout)}
                  className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm text-left"
                >
                  <div className="font-semibold text-gray-800 mb-1">{workout.name}</div>
                  <div className="text-xs text-gray-400">
                    {workout.exercises.length} exercises · {new Date(workout.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {workout.exercises.slice(0, 4).map(ex => (
                      <span key={ex.name} className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full">{ex.name}</span>
                    ))}
                    {workout.exercises.length > 4 && (
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">+{workout.exercises.length - 4} more</span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  // Chat screen
  const grouped = groupByDate(messages)

  return (
    <div className="flex flex-col h-screen pb-16">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 bg-white">
        <button onClick={() => setActiveHub(null)} className="text-blue-600 text-sm">← Back</button>
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
          {activeHub.name[0].toUpperCase()}
        </div>
        <span className="font-semibold">{activeHub.name}</span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {Object.entries(grouped).map(([date, msgs]) => (
          <div key={date}>
            <div className="flex items-center gap-2 my-4">
              <div className="flex-1 h-px bg-gray-100"></div>
              <span className="text-xs text-gray-400 font-medium">{date}</span>
              <div className="flex-1 h-px bg-gray-100"></div>
            </div>
            {msgs.map(msg => {
              const isMe = msg.user_id === user.id
              return (
                <div key={msg.id} className={`flex mb-3 ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    {!isMe && (
                      <span className="text-xs text-gray-400 mb-1 ml-1">{msg.profiles?.username}</span>
                    )}

                    {msg.type === 'workout' ? (
                      // Workout card
                      <div className={`rounded-2xl overflow-hidden border ${isMe ? 'border-blue-200' : 'border-gray-200'}`}>
                        <div className={`px-4 py-2 text-xs font-semibold ${isMe ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                          💪 Workout Shared
                        </div>
                        <div className="bg-white p-3 min-w-48">
                          <div className="font-semibold text-gray-800 mb-2">{msg.content}</div>
                          {msg.workouts?.exercises?.slice(0, 4).map(ex => (
                            <div key={ex.name} className="text-xs text-gray-500 mb-1 flex justify-between gap-4">
                              <span>{ex.name}</span>
                              <span className="text-gray-400">{ex.sets && ex.reps ? `${ex.sets}x${ex.reps}` : ''}</span>
                            </div>
                          ))}
                          {msg.workouts?.exercises?.length > 4 && (
                            <div className="text-xs text-gray-400 mt-1">+{msg.workouts.exercises.length - 4} more exercises</div>
                          )}
                        </div>
                      </div>
                    ) : (
                      // Text message
                      <div className={`px-4 py-2.5 rounded-2xl text-sm ${
                        isMe
                          ? 'bg-blue-600 text-white rounded-br-sm'
                          : 'bg-white border border-gray-100 text-gray-800 rounded-bl-sm shadow-sm'
                      }`}>
                        {msg.content}
                      </div>
                    )}

                    <span className="text-xs text-gray-300 mt-1 mx-1">
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

      {/* Message input */}
      <div className="px-4 py-3 border-t border-gray-100 bg-white flex gap-2 items-center">
        <button
          onClick={() => { loadMyWorkouts(); setShowWorkoutPicker(true) }}
          className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 flex-shrink-0"
          title="Send a workout"
        >
          🏋️
        </button>
        <input
          type="text"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Message..."
          className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm outline-none focus:border-blue-400"
        />
        <button
          onClick={sendMessage}
          disabled={!newMessage.trim()}
          className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center disabled:opacity-40 text-white font-bold text-lg flex-shrink-0"
        >
          ↑
        </button>
      </div>
    </div>
  )
}
