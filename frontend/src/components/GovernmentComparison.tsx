import type { ComparisonData } from '../types'
import { TrendArrow, isInvertedMetric } from './TrendIndicator'

interface GovernmentComparisonProps {
  data: ComparisonData
}

export function GovernmentComparison({ data }: GovernmentComparisonProps) {
  const { indicator, explanation, comparison } = data
  const isInverted = isInvertedMetric(indicator.code)

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

  return (
    <div className="government-comparison">
      <div className="comparison-header">
        <h3 className="indicator-name">{indicator.name}</h3>
        <p className="indicator-description">{indicator.description}</p>
        <p className="comparison-explanation">{explanation}</p>
      </div>

      <div className="comparison-table-container">
        <table className="comparison-table" role="table">
          <thead>
            <tr>
              <th scope="col">Gobierno</th>
              <th scope="col">Periodo</th>
              <th scope="col">Promedio</th>
              <th scope="col">Minimo</th>
              <th scope="col">Maximo</th>
              <th scope="col">Cambio</th>
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
                <td className="metric-change">
                  <TrendArrow 
                    value={item.summary.change} 
                    inverted={isInverted}
                    size="md"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="source-info">
        Fuente:{' '}
        {indicator.source_name}
        {' '}
        <a 
          href={`https://www.google.com/search?q=${encodeURIComponent(indicator.source_name + ' ' + indicator.name + ' Chile datos oficiales')}`}
          target="_blank"
          rel="noopener noreferrer"
          className="source-link"
        >
          Verificar fuente
        </a>
      </p>
    </div>
  )
}