import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import type { ComparisonData } from '../types'

interface ComparisonChartProps {
  data: ComparisonData
}

const COALITION_COLORS: Record<string, string> = {
  'Concertacion': '#2563eb',
  'Concertacion de Partidos por la Democracia': '#2563eb',
  'Nueva Mayoria': '#1d4ed8',
  'Chile Vamos': '#dc2626',
  'Coalicion por el Cambio': '#b91c1c',
  'Apruebo Dignidad': '#059669',
  'default': '#64748b',
}

function getCoalitionColor(coalition: string): string {
  for (const [key, color] of Object.entries(COALITION_COLORS)) {
    if (coalition.toLowerCase().includes(key.toLowerCase())) {
      return color
    }
  }
  return COALITION_COLORS.default
}

export function ComparisonChart({ data }: ComparisonChartProps) {
  const { indicator, comparison } = data

  const chartData = comparison
    .filter(item => item.summary.average !== null)
    .map(item => ({
      name: item.government.name.split(' ').slice(-2).join(' '),
      fullName: item.government.name,
      period: item.government.period,
      coalition: item.government.coalition,
      average: item.summary.average,
      min: item.summary.min,
      max: item.summary.max,
      change: item.summary.change,
    }))
    .sort((a, b) => {
      const yearA = parseInt(a.period.split(' - ')[0])
      const yearB = parseInt(b.period.split(' - ')[0])
      return yearA - yearB
    })

  if (chartData.length === 0) {
    return (
      <div className="chart-empty">
        <p>No hay datos suficientes para generar el grafico</p>
      </div>
    )
  }

  function formatValue(value: number): string {
    const unit = indicator.unit.toLowerCase()
    if (unit.includes('porcentaje') || unit === '%') {
      return `${value.toFixed(1)}%`
    }
    if (unit.includes('clp') || unit.includes('pesos')) {
      return `$${Math.round(value).toLocaleString('es-CL')}`
    }
    return value.toLocaleString('es-CL', { maximumFractionDigits: 1 })
  }

  function CustomTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: typeof chartData[0] }> }) {
    if (!active || !payload || payload.length === 0) return null
    
    const item = payload[0].payload
    return (
      <div className="chart-tooltip">
        <p className="tooltip-title">{item.fullName}</p>
        <p className="tooltip-period">{item.period}</p>
        <p className="tooltip-coalition">{item.coalition}</p>
        <div className="tooltip-metrics">
          <p><strong>Promedio:</strong> {formatValue(item.average!)}</p>
          {item.min !== null && <p><strong>Minimo:</strong> {formatValue(item.min)}</p>}
          {item.max !== null && <p><strong>Maximo:</strong> {formatValue(item.max)}</p>}
          {item.change !== null && (
            <p className={item.change >= 0 ? 'change-positive' : 'change-negative'}>
              <strong>Cambio:</strong> {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="comparison-chart">
      <h4 className="chart-title">Comparacion visual: {indicator.name}</h4>
      <p className="chart-subtitle">Promedio por gobierno (ordenado cronologicamente)</p>
      
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              height={80}
              tick={{ fontSize: 12, fill: '#475569' }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: '#475569' }}
              tickFormatter={formatValue}
              label={{
                value: indicator.unit,
                angle: -90,
                position: 'insideLeft',
                style: { textAnchor: 'middle', fill: '#64748b' }
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              formatter={() => 'Promedio del periodo'}
              wrapperStyle={{ paddingTop: 20 }}
            />
            <Bar
              dataKey="average"
              name="Promedio"
              radius={[4, 4, 0, 0]}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getCoalitionColor(entry.coalition)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-legend-coalitions">
        <p className="legend-title">Colores por coalicion:</p>
        <div className="legend-items">
          <span className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#2563eb' }}></span>
            Concertacion / Nueva Mayoria
          </span>
          <span className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#dc2626' }}></span>
            Chile Vamos / Coalicion por el Cambio
          </span>
          <span className="legend-item">
            <span className="legend-color" style={{ backgroundColor: '#059669' }}></span>
            Apruebo Dignidad
          </span>
        </div>
      </div>
    </div>
  )
}
