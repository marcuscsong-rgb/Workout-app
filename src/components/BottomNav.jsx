export default function BottomNav({ page, setPage }) {
  const tabs = [
    { id: 'home', label: 'HOME' },
    { id: 'exercises', label: 'EXERCISES' },
    { id: 'log', label: 'LOG' },
    { id: 'food', label: 'FOOD' },
    { id: 'hub', label: 'HUB' },
  ]
  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: '#D4C5A9',
      borderTop: '2px solid #C4A97D',
      display: 'flex',
      fontFamily: 'Arial Black, Arial, sans-serif',
    }}>
      {tabs.map((tab, i) => (
        <button
          key={tab.id}
          onClick={() => setPage(tab.id)}
          style={{
            flex: 1,
            padding: '14px 0',
            fontSize: '9px',
            fontWeight: '900',
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: page === tab.id ? '#3B2507' : '#A0845C',
            background: 'none',
            border: 'none',
            borderRight: i < tabs.length - 1 ? '2px solid #C4A97D' : 'none',
            cursor: 'pointer',
            borderBottom: page === tab.id ? '3px solid #3B2507' : '3px solid transparent',
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
