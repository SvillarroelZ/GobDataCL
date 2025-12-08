import './index.css'

function App() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="app-kicker">GobData CL</p>
          <h1 className="app-title">Explorador de datos de gobiernos</h1>
          <p className="app-subtitle">Visualización neutral de indicadores oficiales por período de gobierno en Chile.</p>
        </div>
      </header>

      <main className="app-main">
        <section className="placeholder-card">
          <h2>Interfaz inicial lista</h2>
          <p>
            Aquí verás pronto los selectores de gobiernos, gráficos de indicadores, tarjetas de estadísticas y fuentes.
            Los datos provendrán de APIs oficiales; por ahora este es un marcador neutral.
          </p>
        </section>
      </main>

      <footer className="app-footer">
        <p>Esta herramienta solo visualiza datos oficiales. No clasifica ni evalúa a los gobiernos.</p>
      </footer>
    </div>
  )
}

export default App
