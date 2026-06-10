import { useState } from 'react'
import { supabase } from '../supabase'

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
  { name: 'Cable Fly', muscle: 'Chest', equipment: 'Cable', difficulty: 'Beginner' },
  { name: 'Chest Dips', muscle: 'Chest', equipment: 'Bodyweight', difficulty: 'Intermediate' },
  { name: 'Pec Deck Machine', muscle: 'Chest', equipment: 'Machine', difficulty: 'Beginner' },
  // Back
  { name: 'Pull Up', muscle: 'Back', equipment: 'Bodyweight', difficulty: 'Intermediate' },
  { name: 'Chin Up', muscle: 'Back', equipment: 'Bodyweight', difficulty: 'Intermediate' },
  { name: 'Barbell Row', muscle: 'Back', equipment: 'Barbell', difficulty: 'Intermediate' },
  { name: 'Deadlift', muscle: 'Back', equipment: 'Barbell', difficulty: 'Advanced' },
  { name: 'Sumo Deadlift', muscle: 'Back', equipment: 'Barbell', difficulty: 'Advanced' },
  { name: 'Lat Pulldown', muscle: 'Back', equipment: 'Cable', difficulty: 'Beginner' },
  { name: 'Seated Cable Row', muscle: 'Back', equipment: 'Cable', difficulty: 'Beginner' },
  { name: 'Dumbbell Row', muscle: 'Back', equipment: 'Dumbbell', difficulty: 'Beginner' },
  { name: 'T-Bar Row', muscle: 'Back', equipment: 'Barbell', difficulty: 'Intermediate' },
  { name: 'Face Pull', muscle: 'Back', equipment: 'Cable', difficulty: 'Beginner' },
  { name: 'Hyperextension', muscle: 'Back', equipment: 'Machine', difficulty: 'Beginner' },
  // Legs
  { name: 'Back Squat', muscle: 'Legs', equipment: 'Barbell', difficulty: 'Intermediate' },
  { name: 'Front Squat', muscle: 'Legs', equipment: 'Barbell', difficulty: 'Advanced' },
  { name: 'Goblet Squat', muscle: 'Legs', equipment: 'Dumbbell', difficulty: 'Beginner' },
  { name: 'Bulgarian Split Squat', muscle: 'Legs', equipment: 'Dumbbell', difficulty: 'Intermediate' },
  { name: 'Romanian Deadlift (RDL)', muscle: 'Legs', equipment: 'Barbell', difficulty: 'Intermediate' },
  { name: 'Single Leg RDL', muscle: 'Legs', equipment: 'Dumbbell', difficulty: 'Intermediate' },
  { name: 'Leg Press', muscle: 'Legs', equipment: 'Machine', difficulty: 'Beginner' },
  { name: 'Lunges', muscle: 'Legs', equipment: 'Dumbbell', difficulty: 'Beginner' },
  { name: 'Leg Curl', muscle: 'Legs', equipment: 'Machine', difficulty: 'Beginner' },
  { name: 'Leg Extension', muscle: 'Legs', equipment: 'Machine', difficulty: 'Beginner' },
  { name: 'Calf Raise', muscle: 'Legs', equipment: 'Machine', difficulty: 'Beginner' },
  { name: 'Hip Thrust', muscle: 'Legs', equipment: 'Barbell', difficulty: 'Intermediate' },
  { name: 'Nordic Hamstring Curl', muscle: 'Legs', equipment: 'Bodyweight', difficulty: 'Advanced' },
  // Shoulders
  { name: 'Overhead Press', muscle: 'Shoulders', equipment: 'Barbell', difficulty: 'Intermediate' },
  { name: 'Seated Dumbbell Press', muscle: 'Shoulders', equipment: 'Dumbbell', difficulty: 'Beginner' },
  { name: 'Arnold Press', muscle: 'Shoulders', equipment: 'Dumbbell', difficulty: 'Intermediate' },
  { name: 'Lateral Raise', muscle: 'Shoulders', equipment: 'Dumbbell', difficulty: 'Beginner' },
  { name: 'Front Raise', muscle: 'Shoulders', equipment: 'Dumbbell', difficulty: 'Beginner' },
  { name: 'Rear Delt Fly', muscle: 'Shoulders', equipment: 'Dumbbell', difficulty: 'Beginner' },
  { name: 'Cable Face Pull', muscle: 'Shoulders', equipment: 'Cable', difficulty: 'Beginner' },
  { name: 'Push Press', muscle: 'Shoulders', equipment: 'Barbell', difficulty: 'Intermediate' },
  // Arms
  { name: 'Barbell Bicep Curl', muscle: 'Arms', equipment: 'Barbell', difficulty: 'Beginner' },
  { name: 'Dumbbell Bicep Curl', muscle: 'Arms', equipment: 'Dumbbell', difficulty: 'Beginner' },
  { name: 'Hammer Curl', muscle: 'Arms', equipment: 'Dumbbell', difficulty: 'Beginner' },
  { name: 'Preacher Curl', muscle: 'Arms', equipment: 'Barbell', difficulty: 'Beginner' },
  { name: 'Tricep Pushdown', muscle: 'Arms', equipment: 'Cable', difficulty: 'Beginner' },
  { name: 'Overhead Tricep Extension', muscle: 'Arms', equipment: 'Dumbbell', difficulty: 'Beginner' },
  { name: 'Skull Crusher', muscle: 'Arms', equipment: 'Barbell', difficulty: 'Intermediate' },
  { name: 'Tricep Dips', muscle: 'Arms', equipment: 'Bodyweight', difficulty: 'Beginner' },
  // Core
  { name: 'Plank', muscle: 'Core', equipment: 'None', difficulty: 'Beginner' },
  { name: 'Side Plank', muscle: 'Core', equipment: 'None', difficulty: 'Beginner' },
  { name: 'Hollow Body Hold', muscle: 'Core', equipment: 'None', difficulty: 'Intermediate' },
  { name: 'Crunch', muscle: 'Core', equipment: 'None', difficulty: 'Beginner' },
  { name: 'Hanging Leg Raise', muscle: 'Core', equipment: 'Bodyweight', difficulty: 'Intermediate' },
  { name: 'Ab Wheel Rollout', muscle: 'Core', equipment: 'Ab Wheel', difficulty: 'Advanced' },
  { name: 'Dragon Flag', muscle: 'Core', equipment: 'Bodyweight', difficulty: 'Advanced' },
  { name: 'L-Sit Hold', muscle: 'Core', equipment: 'Bodyweight', difficulty: 'Advanced' },
  { name: 'Russian Twist', muscle: 'Core', equipment: 'None', difficulty: 'Beginner' },
  { name: 'Mountain Climbers', muscle: 'Core', equipment: 'None', difficulty: 'Beginner' },
  // Plyometrics
  { name: 'Box Jump', muscle: 'Plyometrics', equipment: 'Box', difficulty: 'Intermediate' },
  { name: 'Broad Jump', muscle: 'Plyometrics', equipment: 'None', difficulty: 'Intermediate' },
  { name: 'Burpee', muscle: 'Plyometrics', equipment: 'None', difficulty: 'Intermediate' },
  { name: 'Jump Squat', muscle: 'Plyometrics', equipment: 'None', difficulty: 'Beginner' },
  { name: 'Squat Jump', muscle: 'Plyometrics', equipment: 'None', difficulty: 'Beginner' },
  { name: 'Tuck Jump', muscle: 'Plyometrics', equipment: 'None', difficulty: 'Intermediate' },
  { name: 'One Legged Jumping Split Squat', muscle: 'Plyometrics', equipment: 'None', difficulty: 'Advanced' },
  { name: 'Clap Push Up', muscle: 'Plyometrics', equipment: 'None', difficulty: 'Advanced' },
  { name: 'Medicine Ball Slam', muscle: 'Plyometrics', equipment: 'Medicine Ball', difficulty: 'Beginner' },
  { name: 'Skater Jump', muscle: 'Plyometrics', equipment: 'None', difficulty: 'Intermediate' },
]

const muscleGroups = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Plyometrics']

const muscleColor = {
  Chest: 'bg-red-50 text-red-500',
  Back: 'bg-blue-50 text-blue-500',
  Legs: 'bg-purple-50 text-purple-500',
  Shoulders: 'bg-orange-50 text-orange-500',
  Arms: 'bg-pink-50 text-pink-500',
  Core: 'bg-yellow-50 text-yellow-600',
  Plyometrics: 'bg-green-50 text-green-600',
}

const difficultyColor = {
  Beginner: 'bg-green-100 text-green-700',
  Intermediate: 'bg-yellow-100 text-yellow-700',
  Advanced: 'bg-red-100 text-red-700',
}

export default function WorkoutBuilder({ user, onSave, onClose }) {
  const [selected, setSelected] = useState('All')
  const [search, setSearch] = useState('')
  const [workout, setWorkout] = useState([])
  const [workoutName, setWorkoutName] = useState('')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [view, setView] = useState('build') // 'build' or 'review'

  const filtered = exercises.filter(e => {
    const matchesMuscle = selected === 'All' || e.muscle === selected
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase())
    return matchesMuscle && matchesSearch
  })

  function addExercise(exercise) {
    if (workout.find(w => w.name === exercise.name)) return
    setWorkout([...workout, {
      name: exercise.name,
      muscle: exercise.muscle,
      sets: '',
      reps: '',
      weight: '',
      duration: '',
      notes: '',
    }])
  }

  function removeExercise(name) {
    setWorkout(workout.filter(w => w.name !== name))
  }

  function updateExercise(name, field, value) {
    setWorkout(workout.map(w => w.name === name ? { ...w, [field]: value } : w))
  }

  async function saveWorkout() {
    if (!workoutName.trim() || workout.length === 0) return
    setSaving(true)
    const { data, error } = await supabase.from('workouts').insert({
      user_id: user.id,
      name: workoutName,
      exercises: workout,
    }).select().single()
    setSaving(false)
    if (!error) {
      setSaved(true)
      if (onSave) onSave(data)
    }
  }

  if (saved) {
    return (
      <div className="p-6 text-center">
        <div className="text-5xl mb-4">💪</div>
        <h2 className="text-xl font-bold mb-2">Workout Saved!</h2>
        <p className="text-gray-400 text-sm mb-6">"{workoutName}" has been saved to your workouts.</p>
        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white font-medium py-3 rounded-xl"
        >
          Done
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen pb-16">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100 bg-white flex items-center justify-between">
        <button onClick={onClose} className="text-blue-600 text-sm">← Back</button>
        <h1 className="font-semibold">Build Workout</h1>
        <button
          onClick={() => setView(view === 'build' ? 'review' : 'build')}
          className="text-sm text-blue-600 font-medium"
        >
          {view === 'build' ? `Review (${workout.length})` : 'Browse'}
        </button>
      </div>

      {view === 'build' ? (
        // Exercise browser
        <div className="flex-1 overflow-y-auto p-4">
          <input
            type="text"
            placeholder="Search exercises..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm mb-3 outline-none focus:border-blue-400"
          />
          <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
            {muscleGroups.map(group => (
              <button
                key={group}
                onClick={() => setSelected(group)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-colors ${
                  selected === group
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-600 border-gray-200'
                }`}
              >
                {group}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {filtered.map(exercise => {
              const added = workout.find(w => w.name === exercise.name)
              return (
                <div key={exercise.name} className="bg-white rounded-xl p-3 border border-gray-100 flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm text-gray-800">{exercise.name}</div>
                    <div className="flex gap-1.5 mt-1">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${muscleColor[exercise.muscle]}`}>{exercise.muscle}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${difficultyColor[exercise.difficulty]}`}>{exercise.difficulty}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => added ? removeExercise(exercise.name) : addExercise(exercise)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0 ${
                      added ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {added ? '✓' : '+'}
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        // Review & log screen
        <div className="flex-1 overflow-y-auto p-4">
          {workout.length === 0 ? (
            <div className="text-center text-gray-400 mt-16">
              <div className="text-4xl mb-2">🏋️</div>
              <div>No exercises added yet</div>
              <button onClick={() => setView('build')} className="text-blue-600 text-sm mt-2">Browse exercises</button>
            </div>
          ) : (
            <>
              <input
                type="text"
                placeholder="Workout name (e.g. Push Day)"
                value={workoutName}
                onChange={e => setWorkoutName(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm mb-4 outline-none focus:border-blue-400 font-medium"
              />
              {workout.map(ex => (
                <div key={ex.name} className="bg-white rounded-xl p-4 border border-gray-100 mb-3">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-semibold text-gray-800">{ex.name}</span>
                    <button onClick={() => removeExercise(ex.name)} className="text-red-400 text-xs">Remove</button>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Sets *</label>
                      <input
                        type="number"
                        placeholder="e.g. 3"
                        value={ex.sets}
                        onChange={e => updateExercise(ex.name, 'sets', e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Reps *</label>
                      <input
                        type="number"
                        placeholder="e.g. 10"
                        value={ex.reps}
                        onChange={e => updateExercise(ex.name, 'reps', e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Weight (optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. 135 lbs"
                        value={ex.weight}
                        onChange={e => updateExercise(ex.name, 'weight', e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">Duration (optional)</label>
                      <input
                        type="text"
                        placeholder="e.g. 30 sec"
                        value={ex.duration}
                        onChange={e => updateExercise(ex.name, 'duration', e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block mb-1">Notes (optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. slow on the way down"
                      value={ex.notes}
                      onChange={e => updateExercise(ex.name, 'notes', e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-blue-400"
                    />
                  </div>
                </div>
              ))}
              <button
                onClick={saveWorkout}
                disabled={!workoutName.trim() || saving}
                className="w-full bg-blue-600 text-white font-medium py-3 rounded-xl disabled:opacity-50 mt-2"
              >
                {saving ? 'Saving...' : 'Save Workout'}
              </button>
            </>
          )}
        </div>
      )}
    </div>
  )
}
