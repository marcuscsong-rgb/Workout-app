import { useEffect, useState } from 'react'
import { supabase } from '../supabase'

export default function Home() {
  const [status, setStatus] = useState('Testing connection...')

  useEffect(() => {
    async function testConnection() {
      const { error } = await supabase.from('profiles').select('count')
      if (error) {
        setStatus('Connection failed: ' + error.message)
      } else {
        setStatus('Supabase connected!')
      }
    }
    testConnection()
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Workout App</h1>
      <div className={`p-4 rounded-xl text-sm font-medium ${
        status.includes('connected') 
          ? 'bg-green-100 text-green-700' 
          : status.includes('failed')
          ? 'bg-red-100 text-red-700'
          : 'bg-gray-100 text-gray-500'
      }`}>
        {status}
      </div>
    </div>
  )
}
