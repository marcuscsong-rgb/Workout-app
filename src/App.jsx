import { useState } from 'react'
import Home from './pages/Home'
import Exercises from './pages/Exercises'
import Log from './pages/Log'
import Food from './pages/Food'
import BottomNav from './components/BottomNav'

export default function App() {
  const [page, setPage] = useState('home')

  const pages = { home: Home, exercises: Exercises, log: Log, food: Food }
  const CurrentPage = pages[page]

  return (
    <div className="max-w-md mx-auto min-h-screen pb-16">
      <CurrentPage />
      <BottomNav page={page} setPage={setPage} />
    </div>
  )
}
