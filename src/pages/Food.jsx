export default function Food() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#EDE8DC',
      fontFamily: 'Arial Black, Arial, sans-serif',
      padding: '48px 24px 24px',
    }}>
      <p style={{ fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#A0845C', margin: '0 0 6px 0' }}>
        COMING SOON
      </p>
      <h1 style={{ fontSize: '36px', fontWeight: '900', textTransform: 'uppercase', color: '#3B2507', margin: '0 0 24px 0', letterSpacing: '0.04em' }}>
        FOOD LOG
      </h1>
      <div style={{ borderTop: '2px solid #C4A97D', borderBottom: '2px solid #C4A97D', padding: '24px 0' }}>
        <p style={{ fontSize: '18px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#A0845C', margin: 0 }}>
          WIP
        </p>
      </div>
    </div>
  )
}