export default function BottomNav({ page, setPage }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'exercises', label: 'Exercises', icon: '🏋️' },
    { id: 'log', label: 'Log', icon: '✅' },
    { id: 'food', label: 'Food', icon: '🥗' },
  ]
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex">
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setPage(tab.id)}
          className={`flex-1 py-3 flex flex-col items-center text-xs gap-1 ${page === tab.id ? 'text-blue-600' : 'text-gray-400'}`}
        >
          <span className="text-xl">{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </div>
  )
}
