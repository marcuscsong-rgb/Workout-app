import { useState, useEffect } from 'react'
import { supabase } from './supabase'
import Auth from './pages/Auth'
import Home from './pages/Home'
import Exercises from './pages/Exercises'
import Log from './pages/Log'
import Food from './pages/Food'
import Hub from './pages/Hub'
import BottomNav from './components/BottomNav'

export default function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState('home')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })
    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-400 text-sm">Loading...</div>
      </div>
    )
  }

  if (!user) return <Auth onLogin={setUser} />

  const pages = { home: Home, exercises: Exercises, log: Log, food: Food, hub: Hub }
  const CurrentPage = pages[page]

  return (
    <div className="max-w-md mx-auto min-h-screen pb-16">
      <CurrentPage user={user} />
      <BottomNav page={page} setPage={setPage} />
    </div>
  )
}
