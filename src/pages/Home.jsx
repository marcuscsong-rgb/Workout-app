import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

export default function Home({ user }) {
  const [status, setStatus] = useState('...')
  const [username, setUsername] = useState('')
  const [totalWorkouts, setTotalWorkouts] = useState('—')
  const [thisWeek, setThisWeek] = useState('—')
  const [streak, setStreak] = useState('—')

  useEffect(() => {
    async function load() {
      // Connection check
      const { error } = await supabase.from('profiles').select('count')
      setStatus(error ? 'offline' : 'connected')

      // Username
      const { data: profile } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single()
      if (profile) setUsername(profile.username.toUpperCase())

      // All workouts
      const { data: allWorkouts } = await supabase
        .from('workouts')
        .select('created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })

      if (allWorkouts) {
        setTotalWorkouts(allWorkouts.length)

        // This week
        const startOfWeek = new Date()
        startOfWeek.setHours(0, 0, 0, 0)
        startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())
        const weekCount = allWorkouts.filter(w => new Date(w.created_at) >= startOfWeek).length
        setThisWeek(weekCount)

        // Streak — count consecutive days going back from today
        if (allWorkouts.length === 0) {
          setStreak(0)
          return
        }
        const workoutDays = new Set(
          allWorkouts.map(w => new Date(w.created_at).toDateString())
        )
        let streakCount = 0
        const today = new Date()
        for (let i = 0; i < 365; i++) {
          const day = new Date(today)
          day.setDate(today.getDate() - i)
          if (workoutDays.has(day.toDateString())) {
            streakCount++
          } else if (i > 0) {
            break
          }
        }
        setStreak(streakCount)
      }
    }
    load()
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#EDE8DC',
      fontFamily: 'Arial Black, Arial, sans-serif',
    }}>
      {/* Top bar */}
      <div style={{
        padding: '48px 24px 24px',
        borderBottom: '2px solid #C4A97D',
        backgroundColor: '#EDE8DC',
      }}>
        <p style={{
          fontSize: '11px',
          fontWeight: '900',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          color: '#A0845C',
          marginBottom: '6px',
          margin: '0 0 6px 0',
        }}>
          WELCOME BACK
        </p>
        <h1 style={{
          fontSize: '48px',
          fontWeight: '900',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          color: '#3B2507',
          lineHeight: 1,
          margin: 0,
        }}>
          {username || "LET'S GET"}<br />
          {username ? 'READY.' : 'STRONG.'}
        </h1>
      </div>

      {/* Stats row */}
      <div style={{
        borderBottom: '2px solid #C4A97D',
        display: 'flex',
        backgroundColor: '#EDE8DC',
      }}>
        {[
          { label: 'WORKOUTS', value: totalWorkouts },
          { label: 'THIS WEEK', value: thisWeek },
          { label: 'STREAK', value: streak },
        ].map((stat, i) => (
          <div key={stat.label} style={{
            flex: 1,
            textAlign: 'center',
            borderRight: i < 2 ? '2px solid #C4A97D' : 'none',
            padding: '20px 0',
            backgroundColor: '#EDE8DC',
          }}>
            <div style={{
              fontSize: '36px',
              fontWeight: '900',
              color: '#3B2507',
              fontFamily: 'Arial Black, Arial, sans-serif',
              lineHeight: 1,
            }}>{stat.value}</div>
            <div style={{
              fontSize: '9px',
              fontWeight: '900',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#A0845C',
              marginTop: '4px',
            }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Action items */}
      <div style={{ backgroundColor: '#EDE8DC' }}>
        {[
          { title: 'START A WORKOUT', sub: 'BUILD AND LOG YOUR SESSION', tag: 'LOG' },
          { title: 'EXERCISE LIBRARY', sub: 'BROWSE 100+ EXERCISES', tag: 'BROWSE' },
          { title: 'THE HUB', sub: 'SHARE WITH YOUR CREW', tag: 'CHAT' },
          { title: 'FOOD LOG', sub: 'TRACK YOUR NUTRITION', tag: 'TRACK' },
        ].map((item) => (
          <div key={item.title} style={{
            padding: '20px 24px',
            borderBottom: '2px solid #C4A97D',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: '#EDE8DC',
          }}>
            <div>
              <div style={{
                fontSize: '18px',
                fontWeight: '900',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                color: '#3B2507',
                fontFamily: 'Arial Black, Arial, sans-serif',
              }}>{item.title}</div>
              <div style={{
                fontSize: '10px',
                fontWeight: '900',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                color: '#A0845C',
                marginTop: '3px',
              }}>{item.sub}</div>
            </div>
            <div style={{
              fontSize: '10px',
              fontWeight: '900',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#A0845C',
              border: '2px solid #C4A97D',
              padding: '4px 10px',
              borderRadius: '4px',
              backgroundColor: '#EDE8DC',
            }}>{item.tag}</div>
          </div>
        ))}
      </div>

      {/* Fill remaining space with cream */}
      <div style={{ backgroundColor: '#EDE8DC', minHeight: '200px' }} />

      {/* Status dot */}
      <div style={{
        position: 'fixed',
        bottom: '72px',
        left: '10px',
        fontSize: '8px',
        fontWeight: '900',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        color: status === 'connected' ? '#16a34a' : '#9ca3af',
        fontFamily: 'Arial, sans-serif',
      }}>
        ● {status}
      </div>
    </div>
  )
}

