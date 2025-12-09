import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts'
import type { ComparisonData } from '../types'
import { isInvertedMetric } from './TrendIndicator'

interface GovernmentScoreCardProps {
  comparisons: ComparisonData[]
  governmentNames: Record<number, string>
}

interface GovernmentScore {
  governmentId: number
  name: string
  shortName: string
  totalIndicators: number
  improvements: number
  declines: number
  neutral: number
  improvementRate: number
  declineRate: number
  netScore: number
  details: Array<{
    indicator: string
    change: number
    isImprovement: boolean
    isInverted: boolean
  }>
}

function calculateScores(
  comparisons: ComparisonData[],
  governmentNames: Record<number, string>
): GovernmentScore[] {
  const scoreMap = new Map<number, GovernmentScore>()

  // Initialize scores for all governments
  for (const [idStr, name] of Object.entries(governmentNames)) {
    const id = Number(idStr)
    scoreMap.set(id, {
      governmentId: id,
      name,
      shortName: name.split(' ').slice(-2).join(' '),
      totalIndicators: 0,
      improvements: 0,
      declines: 0,
      neutral: 0,
      improvementRate: 0,
      declineRate: 0,
      netScore: 0,
      details: [],
    })
  }

  // Process each comparison
  for (const comparison of comparisons) {
    const indicatorCode = comparison.indicator.code
    const isInverted = isInvertedMetric(indicatorCode)

    for (const item of comparison.comparison) {
      const score = scoreMap.get(item.government.id)
      if (!score) continue

      const change = item.summary.change
      if (change === null) continue

      score.totalIndicators++

      // For inverted metrics (unemployment, poverty, etc.), a decrease is good
      const isImprovement = isInverted ? change < 0 : change > 0
      const isDecline = isInverted ? change > 0 : change < 0

      if (isImprovement) {
        score.improvements++
      } else if (isDecline) {
        score.declines++
      } else {
        score.neutral++
      }

      score.details.push({
        indicator: comparison.indicator.name,
        change,
        isImprovement,
        isInverted,
      })
    }
  }

  // Calculate rates with 3 decimals
  for (const score of scoreMap.values()) {
    if (score.totalIndicators > 0) {
      score.improvementRate = Number(((score.improvements / score.totalIndicators) * 100).toFixed(3))
      score.declineRate = Number(((score.declines / score.totalIndicators) * 100).toFixed(3))
      score.netScore = Number((score.improvementRate - score.declineRate).toFixed(3))
    }
  }

  return Array.from(scoreMap.values())
    .filter(s => s.totalIndicators > 0)
    .sort((a, b) => b.netScore - a.netScore)
}

export function GovernmentScoreCard({ comparisons, governmentNames }: GovernmentScoreCardProps) {
  if (comparisons.length === 0) {
    return null
  }

  const scores = calculateScores(comparisons, governmentNames)

  if (scores.length === 0) {
    return (
      <div className="score-card-empty">
        <p>No hay suficientes datos para calcular puntuaciones</p>
      </div>
    )
  }

  const chartData = scores.map(s => ({
    name: s.shortName,
    fullName: s.name,
    improvements: s.improvementRate,
    declines: -s.declineRate, // Negative for stacked effect
    netScore: s.netScore,
    totalIndicators: s.totalIndicators,
    improvementCount: s.improvements,
    declineCount: s.declines,
  }))

  function CustomTooltip({ active, payload }: { 
    active?: boolean
    payload?: Array<{ payload: typeof chartData[0] }> 
  }) {
    if (!active || !payload || payload.length === 0) return null
    
    const data = payload[0].payload
    return (
      <div className="chart-tooltip score-tooltip">
        <p className="tooltip-title">{data.fullName}</p>
        <div className="tooltip-metrics">
          <p className="score-improvement">
            Mejoras: {data.improvementCount} ({data.improvements.toFixed(3)}%)
          </p>
          <p className="score-decline">
            Descensos: {data.declineCount} ({Math.abs(data.declines).toFixed(3)}%)
          </p>
          <p className="score-net">
            <strong>Balance neto: {data.netScore.toFixed(3)}%</strong>
          </p>
          <p className="score-total">
            Indicadores analizados: {data.totalIndicators}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="government-score-card">
      <div className="score-header">
        <h3 className="score-title">Balance de indicadores por gobierno</h3>
        <p className="score-description">
          Porcentaje de indicadores que mejoraron vs empeoraron durante cada gobierno.
          Los indicadores como desempleo, pobreza e inflacion se consideran mejoras cuando bajan.
        </p>
      </div>

      <div className="score-chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
            stackOffset="sign"
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
              tickFormatter={(v) => `${v}%`}
              domain={[-100, 100]}
              label={{
                value: 'Porcentaje de indicadores',
                angle: -90,
                position: 'insideLeft',
                style: { textAnchor: 'middle', fill: '#64748b' }
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: 20 }}
            />
            <ReferenceLine y={0} stroke="#94a3b8" strokeWidth={2} />
            <Bar
              dataKey="improvements"
              name="Mejoras"
              stackId="stack"
              fill="#059669"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="declines"
              name="Descensos"
              stackId="stack"
              fill="#dc2626"
              radius={[0, 0, 4, 4]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="score-table-container">
        <table className="score-table" role="table">
          <thead>
            <tr>
              <th scope="col">Gobierno</th>
              <th scope="col">Indicadores</th>
              <th scope="col">Mejoras</th>
              <th scope="col">Descensos</th>
              <th scope="col">Neutrales</th>
              <th scope="col">Balance neto</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((score, index) => (
              <tr key={score.governmentId} className={index === 0 ? 'top-score' : ''}>
                <td className="score-gov-name">{score.name}</td>
                <td className="score-value">{score.totalIndicators}</td>
                <td className="score-value score-improvement">
                  {score.improvements} ({score.improvementRate.toFixed(3)}%)
                </td>
                <td className="score-value score-decline">
                  {score.declines} ({score.declineRate.toFixed(3)}%)
                </td>
                <td className="score-value score-neutral">
                  {score.neutral}
                </td>
                <td className={`score-value score-net ${score.netScore > 0 ? 'positive' : score.netScore < 0 ? 'negative' : ''}`}>
                  {score.netScore > 0 ? '+' : ''}{score.netScore.toFixed(3)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="score-methodology">
        <h4 className="methodology-title">Metodologia de calculo</h4>
        <ul className="methodology-list">
          <li>Se analiza el cambio de cada indicador durante el periodo de gobierno</li>
          <li>Mejora: el indicador se movio en direccion favorable (PIB sube, desempleo baja)</li>
          <li>Descenso: el indicador se movio en direccion desfavorable</li>
          <li>Balance neto = % mejoras - % descensos</li>
          <li>Porcentajes calculados con 3 decimales para maxima precision</li>
        </ul>
        <p className="methodology-disclaimer">
          Este analisis es puramente estadistico y no constituye una evaluacion politica.
          Los datos provienen de fuentes oficiales y pueden estar sujetos a revision.
        </p>
      </div>
    </div>
  )
}
