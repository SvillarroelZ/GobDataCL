import './index.css'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="app-kicker">GobData CL</p>
          <h1 className="app-title">Government Data Explorer</h1>
          <p className="app-subtitle">Neutral visualization of official indicators across Chilean governments.</p>
        </div>
      </header>

      <main className="app-main">
        <section className="placeholder-card">
          <h2>Frontend scaffold ready</h2>
          <p>
            This UI will soon render government selectors, indicator charts, stats cards, and sources. Backend endpoints
            will drive all data; until then this is a neutral placeholder.
          </p>
        </section>
      </main>

      <footer className="app-footer">
        <p>This tool only visualizes official data. It does not rank or evaluate governments.</p>
      </footer>
    </div>
  )
}

export default App
