import { useState, useEffect } from 'react'
import { supabase } from '../supabase'
import WorkoutBuilder from './WorkoutBuilder'

export default function Log({ user }) {
  const [workouts, setWorkouts] = useState([])
  const [building, setBuilding] = useState(false)
  const [expanded, setExpanded] = useState(null)

  useEffect(() => {
    loadWorkouts()
  }, [])

  async function loadWorkouts() {
    const { data } = await supabase
      .from('workouts')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
    if (data) setWorkouts(data)
  }

  if (building) {
    return (
      <WorkoutBuilder
        user={user}
        onSave={() => { loadWorkouts() }}
        onClose={() => setBuilding(false)}
      />
    )
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Workout Log</h1>
        <button
          onClick={() => setBuilding(true)}
          className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-xl"
        >
          + New Workout
        </button>
      </div>

      {workouts.length === 0 ? (
        <div className="text-center text-gray-400 mt-16">
          <div className="text-4xl mb-3">📋</div>
          <div className="font-medium text-gray-500 mb-1">No workouts logged yet</div>
          <div className="text-sm">Tap + New Workout to get started</div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {workouts.map(workout => (
            <div key={workout.id} className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
              <button
                onClick={() => setExpanded(expanded === workout.id ? null : workout.id)}
                className="w-full p-4 text-left"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-800">{workout.name}</span>
                  <span className="text-gray-300 text-xs">{expanded === workout.id ? '▲' : '▼'}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
  <div className="text-xs text-gray-400">
    {new Date(workout.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} · {workout.exercises.length} exercises
  </div>
  <button
    onClick={async (e) => {
      e.stopPropagation()
     if (confirm('Delete this workout?')) {
  const { error } = await supabase.from('workouts').delete().eq('id', workout.id)
  if (error) {
    alert('Failed to delete: ' + error.message)
  } else {
    loadWorkouts()
  }
}
    }}
    className="text-xs text-red-400 font-medium"
  >
    Delete
  </button>
</div>
              </button>
              {expanded === workout.id && (
                <div className="px-4 pb-4 border-t border-gray-50 pt-3">
                  {workout.exercises.map(ex => (
                    <div key={ex.name} className="mb-3">
                      <div className="font-medium text-sm text-gray-800 mb-1">{ex.name}</div>
                      <div className="flex gap-3 text-xs text-gray-500">
                        {ex.sets && <span>{ex.sets} sets</span>}
                        {ex.reps && <span>{ex.reps} reps</span>}
                        {ex.weight && <span>{ex.weight}</span>}
                        {ex.duration && <span>{ex.duration}</span>}
                      </div>
                      {ex.notes && <div className="text-xs text-gray-400 mt-0.5 italic">{ex.notes}</div>}
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
