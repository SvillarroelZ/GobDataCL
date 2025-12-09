interface TrendArrowProps {
  value: number | null
  size?: 'sm' | 'md' | 'lg'
  showValue?: boolean
  inverted?: boolean // For metrics where down is good (unemployment, poverty, inflation)
}

export function TrendArrow({ value, size = 'md', showValue = true, inverted = false }: TrendArrowProps) {
  if (value === null) {
    return <span className="trend-neutral">Sin cambio</span>
  }

  const isPositive = inverted ? value < 0 : value > 0
  const isNegative = inverted ? value > 0 : value < 0

  const sizeClass = `trend-${size}`
  const colorClass = isPositive ? 'trend-positive' : isNegative ? 'trend-negative' : 'trend-neutral'

  const arrow = value > 0 ? '↑' : value < 0 ? '↓' : '→'
  const formattedValue = Math.abs(value).toFixed(1)

  return (
    <span className={`trend-arrow ${sizeClass} ${colorClass}`} aria-label={`Cambio de ${value > 0 ? '+' : ''}${value.toFixed(1)}`}>
      <span className="trend-icon" aria-hidden="true">{arrow}</span>
      {showValue && <span className="trend-value">{value > 0 ? '+' : ''}{formattedValue}</span>}
    </span>
  )
}

interface TrendBadgeProps {
  startValue: number | null
  endValue: number | null
  unit?: string
  inverted?: boolean
}

export function TrendBadge({ startValue, endValue, unit = '', inverted = false }: TrendBadgeProps) {
  if (startValue === null || endValue === null) {
    return <span className="trend-badge trend-unknown">Datos insuficientes</span>
  }

  const change = endValue - startValue
  const percentChange = startValue !== 0 ? ((change / Math.abs(startValue)) * 100) : 0

  const isPositive = inverted ? change < 0 : change > 0
  const isNegative = inverted ? change > 0 : change < 0

  const colorClass = isPositive ? 'trend-positive' : isNegative ? 'trend-negative' : 'trend-neutral'
  const arrow = change > 0 ? '↑' : change < 0 ? '↓' : '→'

  return (
    <span className={`trend-badge ${colorClass}`}>
      <span aria-hidden="true">{arrow}</span>
      <span>{Math.abs(percentChange).toFixed(1)}%</span>
      <span className="trend-absolute">({change > 0 ? '+' : ''}{change.toFixed(1)}{unit})</span>
    </span>
  )
}

// Metrics where a decrease is positive
export const INVERTED_METRICS = [
  'unemployment',
  'poverty_rate',
  'inflation',
  'public_debt',
  'gini_coefficient',
  'homicide_rate',
]

export function isInvertedMetric(code: string): boolean {
  return INVERTED_METRICS.includes(code)
}
