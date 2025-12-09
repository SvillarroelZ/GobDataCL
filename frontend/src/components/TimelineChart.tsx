import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
} from 'recharts'
import type { TimelineData } from '../types'
import { ExpandableText } from './ExpandableText'

interface TimelineChartProps {
  data: TimelineData
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

export function TimelineChart({ data }: TimelineChartProps) {
  const { indicator, data: timelineData, government_periods, chart_config } = data

  const chartData = timelineData
    .filter(item => item.value !== null)
    .map(item => ({
      year: item.year,
      value: item.value,
      government: item.government?.name ?? 'Desconocido',
      coalition: item.government?.coalition ?? '',
    }))

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

  function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ payload: typeof chartData[0] }>; label?: number }) {
    if (!active || !payload || payload.length === 0) return null
    
    const item = payload[0].payload
    return (
      <div className="chart-tooltip">
        <p className="tooltip-year">Ano {label}</p>
        <p className="tooltip-value">{formatValue(item.value!)}</p>
        <p className="tooltip-government">{item.government}</p>
        {item.coalition && <p className="tooltip-coalition">{item.coalition}</p>}
      </div>
    )
  }

  const minYear = Math.min(...chartData.map(d => d.year))
  const maxYear = Math.max(...chartData.map(d => d.year))

  return (
    <div className="timeline-chart">
      <h4 className="chart-title">{indicator.name} a traves del tiempo</h4>
      <p className="chart-subtitle">
        <ExpandableText text={indicator.description} maxLength={200} />
      </p>
      
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            
            {government_periods.map((period, index) => (
              <ReferenceArea
                key={`period-${index}`}
                x1={Math.max(period.start_year, minYear)}
                x2={Math.min(period.end_year, maxYear)}
                fill={getCoalitionColor(period.coalition)}
                fillOpacity={0.1}
              />
            ))}

            {government_periods.map((period, index) => (
              <ReferenceLine
                key={`line-${index}`}
                x={period.start_year}
                stroke={getCoalitionColor(period.coalition)}
                strokeDasharray="5 5"
                strokeWidth={1}
              />
            ))}

            <XAxis
              dataKey="year"
              tick={{ fontSize: 12, fill: '#475569' }}
              domain={[minYear, maxYear]}
              label={{
                value: chart_config.x_label || 'Ano',
                position: 'bottom',
                style: { fill: '#64748b' }
              }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: '#475569' }}
              tickFormatter={formatValue}
              label={{
                value: chart_config.y_label || indicator.unit,
                angle: -90,
                position: 'insideLeft',
                style: { textAnchor: 'middle', fill: '#64748b' }
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              formatter={() => indicator.name}
              wrapperStyle={{ paddingTop: 10 }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#0f172a"
              strokeWidth={2}
              dot={{ fill: '#0f172a', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, fill: '#3b82f6' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="timeline-periods">
        <p className="legend-title">Periodos de gobierno:</p>
        <div className="periods-list">
          {government_periods.map((period, index) => (
            <span
              key={index}
              className="period-item"
              style={{ borderLeftColor: getCoalitionColor(period.coalition) }}
            >
              {period.name} ({period.start_year}-{period.end_year})
            </span>
          ))}
        </div>
      </div>

      <p className="source-info">
        Fuente: {indicator.source_name}
        {indicator.source_url && (
          <a
            href={indicator.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="source-link"
          >
            Ver fuente oficial
          </a>
        )}
      </p>
    </div>
  )
}
