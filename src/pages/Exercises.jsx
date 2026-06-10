import { useState } from 'react'

const exercises = [
  // Chest
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
  // Back
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
  // Legs
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
  // Shoulders
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
  // Arms
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
  { name: 'Wrist Curl', muscle: 'Arms', equipment: 'Dumbbell', difficulty: 'Beginner' },
  { name: 'Reverse Curl', muscle: 'Arms', equipment: 'Barbell', difficulty: 'Beginner' },
  // Core - General
  { name: 'Crunch', muscle: 'Core', equipment: 'None', difficulty: 'Beginner' },
  { name: 'Bicycle Crunch', muscle: 'Core', equipment: 'None', difficulty: 'Beginner' },
  { name: 'Reverse Crunch', muscle: 'Core', equipment: 'None', difficulty: 'Beginner' },
  { name: 'Sit Up', muscle: 'Core', equipment: 'None', difficulty: 'Beginner' },
  { name: 'Hanging Leg Raise', muscle: 'Core', equipment: 'Bodyweight', difficulty: 'Intermediate' },
  { name: 'Hanging Knee Raise', muscle: 'Core', equipment: 'Bodyweight', difficulty: 'Beginner' },
  { name: 'Cable Crunch', muscle: 'Core', equipment: 'Cable', difficulty: 'Beginner' },
  { name: 'Russian Twist', muscle: 'Core', equipment: 'None', difficulty: 'Beginner' },
  { name: 'V-Up', muscle: 'Core', equipment: 'None', difficulty: 'Intermediate' },
  { name: 'Dragon Flag', muscle: 'Core', equipment: 'Bodyweight', difficulty: 'Advanced' },
  { name: 'Ab Wheel Rollout', muscle: 'Core', equipment: 'Ab Wheel', difficulty: 'Advanced' },
  { name: 'Toe Touches', muscle: 'Core', equipment: 'None', difficulty: 'Beginner' },
  { name: 'Flutter Kicks', muscle: 'Core', equipment: 'None', difficulty: 'Beginner' },
  { name: 'Mountain Climbers', muscle: 'Core', equipment: 'None', difficulty: 'Beginner' },
  // Core - Isometric
  { name: 'Plank', muscle: 'Core', equipment: 'None', difficulty: 'Beginner' },
  { name: 'Side Plank', muscle: 'Core', equipment: 'None', difficulty: 'Beginner' },
  { name: 'Hollow Body Hold', muscle: 'Core', equipment: 'None', difficulty: 'Intermediate' },
  { name: 'L-Sit Hold', muscle: 'Core', equipment: 'Bodyweight', difficulty: 'Advanced' },
  { name: 'Ab Wheel Rollout Hold', muscle: 'Core', equipment: 'Ab Wheel', difficulty: 'Advanced' },
  { name: 'Dead Bug Hold', muscle: 'Core', equipment: 'None', difficulty: 'Beginner' },
  { name: 'Copenhagen Plank', muscle: 'Core', equipment: 'None', difficulty: 'Advanced' },
  { name: 'Pallof Press Hold', muscle: 'Core', equipment: 'Cable', difficulty: 'Beginner' },
  { name: 'Ring Support Hold', muscle: 'Core', equipment: 'Rings', difficulty: 'Advanced' },
  // Plyometrics
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
  { name: 'Hurdle Jump', muscle: 'Plyometrics', equipment: 'Hurdle', difficulty: 'Intermediate' },
  { name: 'One Legged Jumping Split Squat', muscle: 'Plyometrics', equipment: 'None', difficulty: 'Advanced' },
  { name: 'Scissor Jump', muscle: 'Plyometrics', equipment: 'None', difficulty: 'Intermediate' },
  { name: 'Reactive Step Up Jump', muscle: 'Plyometrics', equipment: 'Box', difficulty: 'Intermediate' },
  { name: 'Plyo Push Up', muscle: 'Plyometrics', equipment: 'None', difficulty: 'Intermediate' },
  { name: 'Single Leg Box Jump', muscle: 'Plyometrics', equipment: 'Box', difficulty: 'Advanced' },
  { name: 'Skater Jump', muscle: 'Plyometrics', equipment: 'None', difficulty: 'Intermediate' },
  { name: 'Vertical Jump', muscle: 'Plyometrics', equipment: 'None', difficulty: 'Beginner' },
  { name: 'Power Skip', muscle: 'Plyometrics', equipment: 'None', difficulty: 'Beginner' },
  { name: 'Triple Broad Jump', muscle: 'Plyometrics', equipment: 'None', difficulty: 'Advanced' },
]

const muscleGroups = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Plyometrics']

const difficultyColor = {
  Beginner: 'bg-green-100 text-green-700',
  Intermediate: 'bg-yellow-100 text-yellow-700',
  Advanced: 'bg-red-100 text-red-700',
}

const muscleColor = {
  Chest: 'bg-red-50 text-red-500',
  Back: 'bg-blue-50 text-blue-500',
  Legs: 'bg-purple-50 text-purple-500',
  Shoulders: 'bg-orange-50 text-orange-500',
  Arms: 'bg-pink-50 text-pink-500',
  Core: 'bg-yellow-50 text-yellow-600',
  Plyometrics: 'bg-green-50 text-green-600',
}

function tutorialUrl(name) {
  return `https://www.youtube.com/results?search_query=how+to+${encodeURIComponent(name)}+exercise+tutorial`
}

export default function Exercises() {
  const [selected, setSelected] = useState('All')
  const [search, setSearch] = useState('')
  const [expanded, setExpanded] = useState(null)

  const filtered = exercises.filter(e => {
    const matchesMuscle = selected === 'All' || e.muscle === selected
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase())
    return matchesMuscle && matchesSearch
  })

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-1">Exercise Library</h1>
      <p className="text-gray-400 text-sm mb-4">{filtered.length} of {exercises.length} exercises</p>

      {/* Search */}
      <input
        type="text"
        placeholder="Search exercises..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm mb-4 outline-none focus:border-blue-400"
      />

      {/* Muscle group filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        {muscleGroups.map(group => (
          <button
            key={group}
            onClick={() => setSelected(group)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap border transition-colors ${
              selected === group
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-600 border-gray-200'
            }`}
          >
            {group}
          </button>
        ))}
      </div>

      {/* Exercise cards */}
      <div className="flex flex-col gap-3">
        {filtered.map(exercise => (
          <div
            key={exercise.name}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
          >
            {/* Card header — tap to expand */}
            <button
              onClick={() => setExpanded(expanded === exercise.name ? null : exercise.name)}
              className="w-full p-4 text-left"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-semibold text-gray-800">{exercise.name}</span>
                <span className="text-gray-300 text-xs">{expanded === exercise.name ? '▲' : '▼'}</span>
              </div>
              <div className="flex gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${muscleColor[exercise.muscle]}`}>
                  {exercise.muscle}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${difficultyColor[exercise.difficulty]}`}>
                  {exercise.difficulty}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-gray-100 text-gray-500">
                  {exercise.equipment}
                </span>
              </div>
            </button>

            {/* Expanded detail */}
            {expanded === exercise.name && (
              <div className="px-4 pb-4 border-t border-gray-50 pt-3">
                <a
                  href={tutorialUrl(exercise.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-red-600 text-white text-sm font-medium px-4 py-2 rounded-lg"
                >
                  Watch tutorial on YouTube
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center text-gray-400 mt-12">
          <div className="text-4xl mb-2">🔍</div>
          <div>No exercises found</div>
        </div>
      )}
    </div>
  )
}