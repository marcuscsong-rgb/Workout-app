import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

export default function Home({ user }) {
  const [status, setStatus] = useState('...')
  const [username, setUsername] = useState('')

  useEffect(() => {
    async function load() {
      const { error } = await supabase.from('profiles').select('count')
      setStatus(error ? 'offline' : 'connected')
      const { data } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single()
      if (data) setUsername(data.username.toUpperCase())
    }
    load()
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#EDE8DC',
      fontFamily: 'Arial Black, Arial, sans-serif',
      padding: '0',
    }}>
      {/* Top bar */}
      <div style={{
        padding: '48px 24px 24px',
        borderBottom: '2px solid #C4A97D',
      }}>
        <p style={{
          fontSize: '11px',
          fontWeight: '900',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          color: '#A0845C',
          marginBottom: '6px',
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

      {/* Stats section */}
      <div style={{
        padding: '24px',
        borderBottom: '2px solid #C4A97D',
        display: 'flex',
        gap: '0',
      }}>
        {[
          { label: 'WORKOUTS', value: '—' },
          { label: 'THIS WEEK', value: '—' },
          { label: 'STREAK', value: '—' },
        ].map((stat, i) => (
          <div key={stat.label} style={{
            flex: 1,
            textAlign: 'center',
            borderRight: i < 2 ? '2px solid #C4A97D' : 'none',
            padding: '8px 0',
          }}>
            <div style={{
              fontSize: '32px',
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
      <div style={{ padding: '0' }}>
        {[
          { title: 'START A WORKOUT', sub: 'BUILD AND LOG YOUR SESSION', tag: 'LOG' },
          { title: 'EXERCISE LIBRARY', sub: 'BROWSE 100+ EXERCISES', tag: 'BROWSE' },
          { title: 'THE HUB', sub: 'SHARE WITH YOUR CREW', tag: 'CHAT' },
          { title: 'FOOD LOG', sub: 'TRACK YOUR NUTRITION', tag: 'TRACK' },
        ].map((item, i) => (
          <div key={item.title} style={{
            padding: '20px 24px',
            borderBottom: '2px solid #C4A97D',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
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
            }}>{item.tag}</div>
          </div>
        ))}
      </div>

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
