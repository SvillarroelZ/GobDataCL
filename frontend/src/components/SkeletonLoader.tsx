export function SkeletonLoader() {
  return (
    <div className="skeleton-container" aria-busy="true" aria-label="Cargando contenido">
      <div className="skeleton-header">
        <div className="skeleton-avatar"></div>
        <div className="skeleton-lines">
          <div className="skeleton-line skeleton-title"></div>
          <div className="skeleton-line skeleton-subtitle"></div>
        </div>
      </div>
      <div className="skeleton-body">
        <div className="skeleton-line"></div>
        <div className="skeleton-line"></div>
        <div className="skeleton-line skeleton-short"></div>
      </div>
    </div>
  )
}

export function SkeletonChart() {
  return (
    <div className="skeleton-chart" aria-busy="true" aria-label="Cargando grafico">
      <div className="skeleton-chart-title"></div>
      <div className="skeleton-chart-area">
        <div className="skeleton-bar" style={{ height: '60%' }}></div>
        <div className="skeleton-bar" style={{ height: '80%' }}></div>
        <div className="skeleton-bar" style={{ height: '45%' }}></div>
        <div className="skeleton-bar" style={{ height: '70%' }}></div>
        <div className="skeleton-bar" style={{ height: '55%' }}></div>
        <div className="skeleton-bar" style={{ height: '90%' }}></div>
        <div className="skeleton-bar" style={{ height: '65%' }}></div>
        <div className="skeleton-bar" style={{ height: '75%' }}></div>
      </div>
    </div>
  )
}

export function SkeletonTable() {
  return (
    <div className="skeleton-table" aria-busy="true" aria-label="Cargando tabla">
      <div className="skeleton-table-header">
        <div className="skeleton-cell"></div>
        <div className="skeleton-cell"></div>
        <div className="skeleton-cell"></div>
        <div className="skeleton-cell"></div>
      </div>
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="skeleton-table-row">
          <div className="skeleton-cell"></div>
          <div className="skeleton-cell"></div>
          <div className="skeleton-cell"></div>
          <div className="skeleton-cell"></div>
        </div>
      ))}
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className="skeleton-card" aria-busy="true" aria-label="Cargando tarjeta">
      <div className="skeleton-card-value"></div>
      <div className="skeleton-card-label"></div>
    </div>
  )
}

export function SkeletonCards({ count = 4 }: { count?: number }) {
  return (
    <div className="skeleton-cards-grid">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
