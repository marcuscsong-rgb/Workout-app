import { useState } from 'react'

const exercises = [
  { name: 'Bench Press', muscle: 'Chest', equipment: 'Barbell', difficulty: 'Intermediate' },
  { name: 'Incline Bench Press', muscle: 'Chest', equipment: 'Barbell', difficulty: 'Intermediate' },
  { name: 'Decline Bench Press', muscle: 'Chest', equipment: 'Barbell', difficulty: 'Intermediate' },
  { name: 'Push Up', muscle: 'Chest', equipment: 'None', difficulty: 'Beginner' },
  { name: 'Wide Grip Push Up', muscle: 'Chest', equipment: 'None', difficulty: 'Beginner' },
  { name: 'Diamond Push Up', muscle: 'Chest', equipment: 'None', difficulty: 'Intermediate' },
  { name: 'Incline Dumbbell Press', muscle: 'Chest', equipment: 'Dumbbell', difficulty: 'Intermediate' },
  { name: 'Flat Dumbbell Press', muscle: 'Chest', equipment: 'Dumbbell', difficulty: 'Beginner' },
  { name: 'Decline Dumbbell Press', muscle: 'Chest', equipment: 'Dumbbell', difficulty: 'Intermediate' },
  { name: 'Dumbbell Fly', muscle: 'Chest', equipment: 'Dumbbell', difficulty: 'Beginner' },
  { name: 'Incline Dumbbell Fly', muscle: 'Chest', equipment: 'Dumbbell', difficulty: 'Beginner' },
  { name: 'Cable Fly', muscle: 'Chest', equipment: 'Cable', difficulty: 'Beginner' },
  { name: 'High to Low Cable Fly', muscle: 'Chest', equipment: 'Cable', difficulty: 'Beginner' },
  { name: 'Low to High Cable Fly', muscle: 'Chest', equipment: 'Cable', difficulty: 'Beginner' },
  { name: 'Chest Dips', muscle: 'Chest', equipment: 'Bodyweight', difficulty: 'Intermediate' },
  { name: 'Pec Deck Machine', muscle: 'Chest', equipment: 'Machine', difficulty: 'Beginner' },
  { name: 'Landmine Press', muscle: 'Chest', equipment: 'Barbell', difficulty: 'Intermediate' },
  { name: 'Pull Up', muscle: 'Back', equipment: 'Bodyweight', difficulty: 'Intermediate' },
  { name: 'Chin Up', muscle: 'Back', equipment: 'Bodyweight', difficulty: 'Intermediate' },
  { name: 'Wide Grip Pull Up', muscle: 'Back', equipment: 'Bodyweight', difficulty: 'Advanced' },
  { name: 'Barbell Row', muscle: 'Back', equipment: 'Barbell', difficulty: 'Intermediate' },
  { name: 'Pendlay Row', muscle: 'Back', equipment: 'Barbell', difficulty: 'Intermediate' },
  { name: 'Deadlift', muscle: 'Back', equipment: 'Barbell', difficulty: 'Advanced' },
  { name: 'Sumo Deadlift', muscle: 'Back', equipment: 'Barbell', difficulty: 'Advanced' },
  { name: 'Rack Pull', muscle: 'Back', equipment: 'Barbell', difficulty: 'Intermediate' },
  { name: 'Lat Pulldown', muscle: 'Back', equipment: 'Cable', difficulty: 'Beginner' },
  { name: 'Close Grip Lat Pulldown', muscle: 'Back', equipment: 'Cable', difficulty: 'Beginner' },
  { name: 'Seated Cable Row', muscle: 'Back', equipment: 'Cable', difficulty: 'Beginner' },
  { name: 'Single Arm Cable Row', muscle: 'Back', equipment: 'Cable', difficulty: 'Beginner' },
  { name: 'Dumbbell Row', muscle: 'Back', equipment: 'Dumbbell', difficulty: 'Beginner' },
  { name: 'Chest Supported Row', muscle: 'Back', equipment: 'Dumbbell', difficulty: 'Beginner' },
  { name: 'T-Bar Row', muscle: 'Back', equipment: 'Barbell', difficulty: 'Intermediate' },
  { name: 'Face Pull', muscle: 'Back', equipment: 'Cable', difficulty: 'Beginner' },
  { name: 'Straight Arm Pulldown', muscle: 'Back', equipment: 'Cable', difficulty: 'Beginner' },
  { name: 'Hyperextension', muscle: 'Back', equipment: 'Machine', difficulty: 'Beginner' },
  { name: 'Back Squat', muscle: 'Legs', equipment: 'Barbell', difficulty: 'Intermediate' },
  { name: 'Front Squat', muscle: 'Legs', equipment: 'Barbell', difficulty: 'Advanced' },
  { name: 'Goblet Squat', muscle: 'Legs', equipment: 'Dumbbell', difficulty: 'Beginner' },
  { name: 'Bulgarian Split Squat', muscle: 'Legs', equipment: 'Dumbbell', difficulty: 'Intermediate' },
  { name: 'Romanian Deadlift (RDL)', muscle: 'Legs', equipment: 'Barbell', difficulty: 'Intermediate' },
  { name: 'Single Leg RDL', muscle: 'Legs', equipment: 'Dumbbell', difficulty: 'Intermediate' },
  { name: 'Leg Press', muscle: 'Legs', equipment: 'Machine', difficulty: 'Beginner' },
  { name: 'Hack Squat', muscle: 'Legs', equipment: 'Machine', difficulty: 'Intermediate' },
  { name: 'Lunges', muscle: 'Legs', equipment: 'Dumbbell', difficulty: 'Beginner' },
  { name: 'Walking Lunges', muscle: 'Legs', equipment: 'Dumbbell', difficulty: 'Beginner' },
  { name: 'Reverse Lunge', muscle: 'Legs', equipment: 'Dumbbell', difficulty: 'Beginner' },
  { name: 'Leg Curl', muscle: 'Legs', equipment: 'Machine', difficulty: 'Beginner' },
  { name: 'Nordic Hamstring Curl', muscle: 'Legs', equipment: 'Bodyweight', difficulty: 'Advanced' },
  { name: 'Leg Extension', muscle: 'Legs', equipment: 'Machine', difficulty: 'Beginner' },
  { name: 'Calf Raise', muscle: 'Legs', equipment: 'Machine', difficulty: 'Beginner' },
  { name: 'Seated Calf Raise', muscle: 'Legs', equipment: 'Machine', difficulty: 'Beginner' },
  { name: 'Hip Thrust', muscle: 'Legs', equipment: 'Barbell', difficulty: 'Intermediate' },
  { name: 'Glute Bridge', muscle: 'Legs', equipment: 'None', difficulty: 'Beginner' },
  { name: 'Step Up', muscle: 'Legs', equipment: 'Dumbbell', difficulty: 'Beginner' },
  { name: 'Sissy Squat', muscle: 'Legs', equipment: 'Bodyweight', difficulty: 'Advanced' },
  { name: 'Sumo Squat', muscle: 'Legs', equipment: 'Dumbbell', difficulty: 'Beginner' },
  { name: 'Overhead Press', muscle: 'Shoulders', equipment: 'Barbell', difficulty: 'Intermediate' },
  { name: 'Seated Dumbbell Press', muscle: 'Shoulders', equipment: 'Dumbbell', difficulty: 'Beginner' },
  { name: 'Arnold Press', muscle: 'Shoulders', equipment: 'Dumbbell', difficulty: 'Intermediate' },
  { name: 'Lateral Raise', muscle: 'Shoulders', equipment: 'Dumbbell', difficulty: 'Beginner' },
  { name: 'Cable Lateral Raise', muscle: 'Shoulders', equipment: 'Cable', difficulty: 'Beginner' },
  { name: 'Front Raise', muscle: 'Shoulders', equipment: 'Dumbbell', difficulty: 'Beginner' },
  { name: 'Rear Delt Fly', muscle: 'Shoulders', equipment: 'Dumbbell', difficulty: 'Beginner' },
  { name: 'Cable Face Pull', muscle: 'Shoulders', equipment: 'Cable', difficulty: 'Beginner' },
  { name: 'Upright Row', muscle: 'Shoulders', equipment: 'Barbell', difficulty: 'Intermediate' },
  { name: 'Machine Shoulder Press', muscle: 'Shoulders', equipment: 'Machine', difficulty: 'Beginner' },
  { name: 'Push Press', muscle: 'Shoulders', equipment: 'Barbell', difficulty: 'Intermediate' },
  { name: 'Behind the Neck Press', muscle: 'Shoulders', equipment: 'Barbell', difficulty: 'Advanced' },
  { name: 'Barbell Bicep Curl', muscle: 'Arms', equipment: 'Barbell', difficulty: 'Beginner' },
  { name: 'Dumbbell Bicep Curl', muscle: 'Arms', equipment: 'Dumbbell', difficulty: 'Beginner' },
  { name: 'Hammer Curl', muscle: 'Arms', equipment: 'Dumbbell', difficulty: 'Beginner' },
  { name: 'Incline Dumbbell Curl', muscle: 'Arms', equipment: 'Dumbbell', difficulty: 'Beginner' },
  { name: 'Concentration Curl', muscle: 'Arms', equipment: 'Dumbbell', difficulty: 'Beginner' },
  { name: 'Cable Curl', muscle: 'Arms', equipment: 'Cable', difficulty: 'Beginner' },
  { name: 'Preacher Curl', muscle: 'Arms', equipment: 'Barbell', difficulty: 'Beginner' },
  { name: 'Tricep Pushdown', muscle: 'Arms', equipment: 'Cable', difficulty: 'Beginner' },
  { name: 'Overhead Tricep Extension', muscle: 'Arms', equipment: 'Dumbbell', difficulty: 'Beginner' },
  { name: 'Skull Crusher', muscle: 'Arms', equipment: 'Barbell', difficulty: 'Intermediate' },
  { name: 'Tricep Dips', muscle: 'Arms', equipment: 'Bodyweight', difficulty: 'Beginner' },
  { name: 'Close Grip Bench Press', muscle: 'Arms', equipment: 'Barbell', difficulty: 'Intermediate' },
  { name: 'Rope Pushdown', muscle: 'Arms', equipment: 'Cable', difficulty: 'Beginner' },
  { name: 'Crunch', muscle: 'Core', equipment: 'None', difficulty: 'Beginner' },
  { name: 'Bicycle Crunch', muscle: 'Core', equipment: 'None', difficulty: 'Beginner' },
  { name: 'Reverse Crunch', muscle: 'Core', equipment: 'None', difficulty: 'Beginner' },
  { name: 'Hanging Leg Raise', muscle: 'Core', equipment: 'Bodyweight', difficulty: 'Intermediate' },
  { name: 'Cable Crunch', muscle: 'Core', equipment: 'Cable', difficulty: 'Beginner' },
  { name: 'Russian Twist', muscle: 'Core', equipment: 'None', difficulty: 'Beginner' },
  { name: 'V-Up', muscle: 'Core', equipment: 'None', difficulty: 'Intermediate' },
  { name: 'Dragon Flag', muscle: 'Core', equipment: 'Bodyweight', difficulty: 'Advanced' },
  { name: 'Ab Wheel Rollout', muscle: 'Core', equipment: 'Ab Wheel', difficulty: 'Advanced' },
  { name: 'Flutter Kicks', muscle: 'Core', equipment: 'None', difficulty: 'Beginner' },
  { name: 'Mountain Climbers', muscle: 'Core', equipment: 'None', difficulty: 'Beginner' },
  { name: 'Plank', muscle: 'Core', equipment: 'None', difficulty: 'Beginner' },
  { name: 'Side Plank', muscle: 'Core', equipment: 'None', difficulty: 'Beginner' },
  { name: 'Hollow Body Hold', muscle: 'Core', equipment: 'None', difficulty: 'Intermediate' },
  { name: 'L-Sit Hold', muscle: 'Core', equipment: 'Bodyweight', difficulty: 'Advanced' },
  { name: 'Dead Bug Hold', muscle: 'Core', equipment: 'None', difficulty: 'Beginner' },
  { name: 'Copenhagen Plank', muscle: 'Core', equipment: 'None', difficulty: 'Advanced' },
  { name: 'Pallof Press Hold', muscle: 'Core', equipment: 'Cable', difficulty: 'Beginner' },
  { name: 'Box Jump', muscle: 'Plyometrics', equipment: 'Box', difficulty: 'Intermediate' },
  { name: 'Broad Jump', muscle: 'Plyometrics', equipment: 'None', difficulty: 'Intermediate' },
  { name: 'Burpee', muscle: 'Plyometrics', equipment: 'None', difficulty: 'Intermediate' },
  { name: 'Jump Squat', muscle: 'Plyometrics', equipment: 'None', difficulty: 'Beginner' },
  { name: 'Squat Jump', muscle: 'Plyometrics', equipment: 'None', difficulty: 'Beginner' },
  { name: 'Tuck Jump', muscle: 'Plyometrics', equipment: 'None', difficulty: 'Intermediate' },
  { name: 'Depth Jump', muscle: 'Plyometrics', equipment: 'Box', difficulty: 'Advanced' },
  { name: 'Lateral Bound', muscle: 'Plyometrics', equipment: 'None', difficulty: 'Intermediate' },
  { name: 'Clap Push Up', muscle: 'Plyometrics', equipment: 'None', difficulty: 'Advanced' },
  { name: 'Medicine Ball Slam', muscle: 'Plyometrics', equipment: 'Medicine Ball', difficulty: 'Beginner' },
  { name: 'One Legged Jumping Split Squat', muscle: 'Plyometrics', equipment: 'None', difficulty: 'Advanced' },
  { name: 'Skater Jump', muscle: 'Plyometrics', equipment: 'None', difficulty: 'Intermediate' },
  { name: 'Vertical Jump', muscle: 'Plyometrics', equipment: 'None', difficulty: 'Beginner' },
  { name: 'Power Skip', muscle: 'Plyometrics', equipment: 'None', difficulty: 'Beginner' },
]

const muscleGroups = ['ALL', 'CHEST', 'BACK', 'LEGS', 'SHOULDERS', 'ARMS', 'CORE', 'PLYOMETRICS']

const difficultyColor = {
  Beginner: '#2D6A4F',
  Intermediate: '#B7791F',
  Advanced: '#9B2335',
}

const BASE = '#EDE8DC'
const DARK = '#3B2507'
const MID = '#A0845C'
const BORDER = '#C4A97D'
const FONT = 'Arial Black, Arial, sans-serif'

function tutorialUrl(name) {
  return 'https://www.youtube.com/results?search_query=how+to+' + encodeURIComponent(name) + '+exercise+tutorial'
}

export default function Exercises() {
  const [selected, setSelected] = useState('ALL')
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState(null)

  const filtered = exercises.filter(e => {
    const matchesMuscle = selected === 'ALL' || e.muscle.toUpperCase() === selected
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase())
    return matchesMuscle && matchesSearch
  })

  return (
    <div style={{ minHeight: '100vh', backgroundColor: BASE, fontFamily: FONT }}>

      {/* Header */}
      <div style={{ padding: '48px 24px 20px', borderBottom: '2px solid ' + BORDER }}>
        <p style={{ fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.2em', color: MID, margin: '0 0 6px 0' }}>
          BROWSE
        </p>
        <h1 style={{ fontSize: '36px', fontWeight: '900', textTransform: 'uppercase', color: DARK, margin: '0 0 16px 0', letterSpacing: '0.04em' }}>
          EXERCISE LIBRARY
        </h1>
        <input
          type="text"
          placeholder="SEARCH EXERCISES..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{
            width: '100%', border: '2px solid ' + BORDER, borderRadius: '4px',
            padding: '10px 14px', fontSize: '11px', fontWeight: '900',
            textTransform: 'uppercase', letterSpacing: '0.1em',
            backgroundColor: BASE, color: DARK, fontFamily: FONT,
            boxSizing: 'border-box', outline: 'none',
          }}
        />
      </div>

      {/* Muscle group filters */}
      <div style={{ display: 'flex', overflowX: 'auto', borderBottom: '2px solid ' + BORDER, backgroundColor: BASE }}>
        {muscleGroups.map((group, i) => (
          <button
            key={group}
            onClick={() => setSelected(group)}
            style={{
              flexShrink: 0, padding: '12px 14px',
              fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em',
              color: selected === group ? DARK : MID,
              background: 'none', border: 'none',
              borderRight: '2px solid ' + BORDER,
              borderBottom: selected === group ? '3px solid ' + DARK : '3px solid transparent',
              cursor: 'pointer', fontFamily: FONT,
            }}
          >
            {group}
          </button>
        ))}
      </div>

      {/* Count */}
      <div style={{ padding: '10px 24px', borderBottom: '2px solid ' + BORDER, fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.15em', color: MID }}>
        {filtered.length} EXERCISES
      </div>

      {/* Exercise rows */}
      {filtered.map(exercise => (
        <div key={exercise.name} style={{ borderBottom: '2px solid ' + BORDER, backgroundColor: BASE }}>
          <button
            onClick={() => setExpanded(expanded === exercise.name ? null : exercise.name)}
            style={{ width: '100%', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}
          >
            <div>
              <div style={{ fontSize: '14px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.04em', color: DARK, fontFamily: FONT }}>
                {exercise.name}
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
                <span style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', color: MID }}>{exercise.muscle}</span>
                <span style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', color: difficultyColor[exercise.difficulty] }}>{exercise.difficulty}</span>
                <span style={{ fontSize: '9px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', color: MID }}>{exercise.equipment}</span>
              </div>
            </div>
            <span style={{ fontSize: '10px', color: BORDER, fontWeight: '900' }}>
              {expanded === exercise.name ? '▲' : '▼'}
            </span>
          </button>

          {expanded === exercise.name && (
            <div style={{ padding: '0 24px 16px' }}>
              
                href={tutorialUrl(exercise.name)}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block', fontSize: '10px', fontWeight: '900',
                  textTransform: 'uppercase', letterSpacing: '0.12em',
                  color: BASE, backgroundColor: DARK,
                  padding: '8px 16px', borderRadius: '4px', textDecoration: 'none',
                  fontFamily: FONT,
                }}
              >
                WATCH TUTORIAL
              </a>
            </div>
          )}
        </div>
      ))}

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '60px 24px' }}>
          <div style={{ fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.15em', color: MID }}>
            NO EXERCISES FOUND
          </div>
        </div>
      )}
    </div>
  )
}
