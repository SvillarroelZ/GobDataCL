import type { ComparisonData } from '../types'

interface GovernmentComparisonProps {
  data: ComparisonData
}

export function GovernmentComparison({ data }: GovernmentComparisonProps) {
  const { indicator, explanation, comparison } = data

  function formatValue(value: number | null, unit: string): string {
    if (value === null) return 'Sin datos'
    if (unit.toLowerCase().includes('porcentaje') || unit === '%') {
      return `${value.toFixed(1)}%`
    }
    if (unit.toLowerCase().includes('clp')) {
      return `$${value.toLocaleString('es-CL')}`
    }
    return value.toLocaleString('es-CL')
  }

  function getChangeClass(change: number | null): string {
    if (change === null) return ''
    if (change > 0) return 'change-positive'
    if (change < 0) return 'change-negative'
    return 'change-neutral'
  }

  function formatChange(change: number | null): string {
    if (change === null) return 'Sin cambio medible'
    const sign = change > 0 ? '+' : ''
    return `${sign}${change.toFixed(2)}`
  }

  return (
    <div className="government-comparison">
      <div className="comparison-header">
        <h3 className="indicator-name">{indicator.name}</h3>
        <p className="indicator-description">{indicator.description}</p>
        <p className="comparison-explanation">{explanation}</p>
      </div>

      <div className="comparison-table-container">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Gobierno</th>
              <th>Periodo</th>
              <th>Promedio</th>
              <th>Minimo</th>
              <th>Maximo</th>
              <th>Cambio</th>
            </tr>
          </thead>
          <tbody>
            {comparison.map(item => (
              <tr key={item.government.id}>
                <td className="gov-name">{item.government.name}</td>
                <td className="gov-period">{item.government.period}</td>
                <td className="metric-value">
                  {formatValue(item.summary.average, indicator.unit)}
                </td>
                <td className="metric-value">
                  {formatValue(item.summary.min, indicator.unit)}
                </td>
                <td className="metric-value">
                  {formatValue(item.summary.max, indicator.unit)}
                </td>
                <td className={`metric-change ${getChangeClass(item.summary.change)}`}>
                  {formatChange(item.summary.change)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="source-info">
        Fuente: {indicator.source_name}
      </p>
    </div>
  )
}