import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import WorkoutBuilder from './WorkoutBuilder'

export default function Log({ user }) {
  const [workouts, setWorkouts] = useState([])
  const [building, setBuilding] = useState(false)
  const [expanded, setExpanded] = useState(null)

  useEffect(() => { loadWorkouts() }, [])

  async function loadWorkouts() {
    const { data } = await supabase
      .from('workouts')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    if (data) setWorkouts(data)
  }

  if (building) {
    return <WorkoutBuilder user={user} onSave={() => loadWorkouts()} onClose={() => setBuilding(false)} />
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#EDE8DC', fontFamily: 'Arial Black, Arial, sans-serif' }}>

      {/* Header */}
      <div style={{ padding: '48px 24px 20px', borderBottom: '2px solid #C4A97D', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        <div>
          <p style={{ fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#A0845C', margin: '0 0 6px 0' }}>TRACK</p>
          <h1 style={{ fontSize: '36px', fontWeight: '900', textTransform: 'uppercase', color: '#3B2507', margin: 0, letterSpacing: '0.04em' }}>WORKOUT LOG</h1>
        </div>
        <button
          onClick={() => setBuilding(true)}
          style={{
            fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em',
            color: '#EDE8DC', backgroundColor: '#3B2507', border: 'none',
            padding: '10px 16px', borderRadius: '4px', cursor: 'pointer',
            fontFamily: 'Arial Black, Arial, sans-serif',
          }}
        >
          + NEW
        </button>
      </div>

      {/* Workout list */}
      {workouts.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 24px', color: '#A0845C' }}>
          <div style={{ fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>NO WORKOUTS YET</div>
          <div style={{ fontSize: '10px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#C4A97D' }}>TAP + NEW TO GET STARTED</div>
        </div>
      ) : (
        <div>
          {workouts.map(workout => (
            <div key={workout.id} style={{ borderBottom: '2px solid #C4A97D', backgroundColor: '#EDE8DC' }}>
              <button
                onClick={() => setExpanded(expanded === workout.id ? null : workout.id)}
                style={{ width: '100%', padding: '18px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
              >
                <div>
                  <div style={{ fontSize: '16px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.04em', color: '#3B2507', fontFamily: 'Arial Black, Arial, sans-serif' }}>
                    {workout.name}
                  </div>
                  <div style={{ display: 'flex', gap: '16px', marginTop: '4px' }}>
                    <span style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A0845C' }}>
                      {new Date(workout.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).toUpperCase()}
                    </span>
                    <span style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A0845C' }}>
                      {workout.exercises.length} EXERCISES
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <button
                    onClick={async (e) => {
                      e.stopPropagation()
                      if (confirm('Delete this workout?')) {
                        const { error } = await supabase.from('workouts').delete().eq('id', workout.id)
                        if (error) alert('Failed to delete: ' + error.message)
                        else loadWorkouts()
                      }
                    }}
                    style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9B2335', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Arial Black, Arial, sans-serif' }}
                  >
                    DELETE
                  </button>
                  <span style={{ fontSize: '10px', color: '#C4A97D', fontWeight: '900' }}>{expanded === workout.id ? '▲' : '▼'}</span>
                </div>
              </button>

              {expanded === workout.id && (
                <div style={{ padding: '0 24px 20px' }}>
                  {workout.exercises.map(ex => (
                    <div key={ex.name} style={{ marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #C4A97D' }}>
                      <div style={{ fontSize: '12px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.06em', color: '#3B2507', marginBottom: '4px', fontFamily: 'Arial Black, Arial, sans-serif' }}>
                        {ex.name}
                      </div>
                      <div style={{ display: 'flex', gap: '16px' }}>
                        {ex.sets && <span style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A0845C' }}>{ex.sets} SETS</span>}
                        {ex.reps && <span style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A0845C' }}>{ex.reps} REPS</span>}
                        {ex.weight && <span style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A0845C' }}>{ex.weight}</span>}
                        {ex.duration && <span style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A0845C' }}>{ex.duration}</span>}
                      </div>
                      {ex.notes && <div style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#C4A97D', marginTop: '3px' }}>{ex.notes}</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
