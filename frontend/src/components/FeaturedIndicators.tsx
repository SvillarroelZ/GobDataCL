import type { Indicator } from '../types'

interface FeaturedIndicatorsProps {
  indicators: Indicator[]
  selectedCode: string | null
  onSelect: (code: string) => void
}

const FEATURED_CODES = [
  'pib_growth',
  'unemployment',
  'inflation',
  'poverty_rate',
  'minimum_wage',
  'public_debt',
]

const FEATURED_INFO: Record<string, { emoji: string; shortName: string; why: string }> = {
  'pib_growth': {
    emoji: '📈',
    shortName: 'PIB',
    why: 'Mide el crecimiento economico del pais',
  },
  'unemployment': {
    emoji: '👷',
    shortName: 'Desempleo',
    why: 'Porcentaje de personas sin trabajo',
  },
  'inflation': {
    emoji: '💰',
    shortName: 'Inflacion',
    why: 'Cuanto suben los precios cada ano',
  },
  'poverty_rate': {
    emoji: '🏠',
    shortName: 'Pobreza',
    why: 'Porcentaje de personas en situacion de pobreza',
  },
  'minimum_wage': {
    emoji: '💵',
    shortName: 'Sueldo minimo',
    why: 'Salario minimo mensual en pesos',
  },
  'public_debt': {
    emoji: '🏦',
    shortName: 'Deuda publica',
    why: 'Deuda del Estado como porcentaje del PIB',
  },
}

export function FeaturedIndicators({ indicators, selectedCode, onSelect }: FeaturedIndicatorsProps) {
  const featuredIndicators = FEATURED_CODES
    .map(code => indicators.find(ind => ind.code === code))
    .filter((ind): ind is Indicator => ind !== undefined)

  if (featuredIndicators.length === 0) {
    return null
  }

  return (
    <div className="featured-indicators">
      <p className="featured-title">Indicadores mas consultados:</p>
      <div className="featured-grid">
        {featuredIndicators.map(ind => {
          const info = FEATURED_INFO[ind.code]
          const isSelected = selectedCode === ind.code
          return (
            <button
              key={ind.code}
              className={`featured-button ${isSelected ? 'selected' : ''}`}
              onClick={() => onSelect(ind.code)}
              title={info?.why || ind.description}
              aria-pressed={isSelected}
            >
              <span className="featured-emoji" aria-hidden="true">{info?.emoji || '📊'}</span>
              <span className="featured-name">{info?.shortName || ind.name}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
