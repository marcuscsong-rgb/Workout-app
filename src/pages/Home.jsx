import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

export default function Home() {
  const [status, setStatus] = useState('...')

  useEffect(() => {
    async function testConnection() {
      const { error } = await supabase.from('profiles').select('count')
      setStatus(error ? 'offline' : 'connected')
    }
    testConnection()
  }, [])

  return (
    <div className="min-h-screen relative p-6" style={{
      backgroundColor: '#F5F0E8',
      backgroundImage: `
        repeating-linear-gradient(
          0deg,
          transparent,
          transparent 39px,
          #C4A882 39px,
          #C4A882 40px
        ),
        repeating-linear-gradient(
          90deg,
          transparent,
          transparent 39px,
          #C4A882 39px,
          #C4A882 40px
        )
      `,
      fontFamily: 'Arial, sans-serif',
    }}>

      {/* Main content */}
      <div className="pt-8">
        <div style={{ fontFamily: 'Arial, sans-serif' }}>

          <p style={{
            fontSize: '13px',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: '#8B6914',
            marginBottom: '8px'
          }}>
            WELCOME BACK
          </p>

          <h1 style={{
            fontSize: '42px',
            fontWeight: '900',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: '#3B2507',
            lineHeight: 1.1,
            marginBottom: '32px'
          }}>
            LET'S GET<br />STRONG
          </h1>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
            {[
              { label: 'WORKOUTS', value: '—' },
              { label: 'THIS WEEK', value: '—' },
              { label: 'STREAK', value: '—' },
            ].map(stat => (
              <div key={stat.label} style={{
                flex: 1,
                background: 'rgba(255,255,255,0.6)',
                border: '1.5px solid #C4A882',
                borderRadius: '12px',
                padding: '14px 10px',
                textAlign: 'center',
              }}>
                <div style={{
                  fontSize: '24px',
                  fontWeight: '900',
                  color: '#3B2507',
                  fontFamily: 'Arial, sans-serif',
                }}>{stat.value}</div>
                <div style={{
                  fontSize: '9px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  color: '#8B6914',
                  marginTop: '4px',
                  fontFamily: 'Arial, sans-serif',
                }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Quick action cards */}
          {[
            { title: 'START A WORKOUT', sub: 'BUILD AND LOG YOUR SESSION', emoji: '🏋️' },
            { title: 'EXERCISE LIBRARY', sub: 'BROWSE 100+ EXERCISES', emoji: '📚' },
            { title: 'OPEN THE HUB', sub: 'SHARE WITH YOUR CREW', emoji: '💬' },
          ].map(card => (
            <div key={card.title} style={{
              background: 'rgba(255,255,255,0.6)',
              border: '1.5px solid #C4A882',
              borderRadius: '14px',
              padding: '18px 16px',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
            }}>
              <span style={{ fontSize: '28px' }}>{card.emoji}</span>
              <div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '900',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#3B2507',
                  fontFamily: 'Arial, sans-serif',
                }}>{card.title}</div>
                <div style={{
                  fontSize: '11px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#8B6914',
                  marginTop: '2px',
                  fontFamily: 'Arial, sans-serif',
                }}>{card.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Supabase status — small, bottom left */}
      <div style={{
        position: 'fixed',
        bottom: '72px',
        left: '12px',
        fontSize: '9px',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        color: status === 'connected' ? '#16a34a' : '#9ca3af',
        fontFamily: 'Arial, sans-serif',
      }}>
        ● {status}
      </div>
    </div>
  )
}
