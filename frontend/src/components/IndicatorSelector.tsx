import type { Indicator, Category } from '../types'

interface IndicatorSelectorProps {
  indicators: Indicator[]
  selectedCode: string | null
  onSelect: (code: string | null) => void
  categories?: Category[]
  label?: string
}

export function IndicatorSelector({
  indicators,
  selectedCode,
  onSelect,
  categories,
  label = 'Seleccionar indicador',
}: IndicatorSelectorProps) {
  function getCategoryName(categoryCode: string): string {
    if (!categories) return categoryCode
    const cat = categories.find(c => c.code === categoryCode)
    return cat?.name ?? categoryCode
  }

  const groupedIndicators = indicators.reduce((acc, ind) => {
    const catName = getCategoryName(ind.category)
    if (!acc[catName]) {
      acc[catName] = []
    }
    acc[catName].push(ind)
    return acc
  }, {} as Record<string, Indicator[]>)

  return (
    <div className="indicator-selector">
      {label && <label className="selector-label">{label}</label>}
      <select
        value={selectedCode ?? ''}
        onChange={e => {
          const value = e.target.value
          onSelect(value || null)
        }}
        className="selector-input"
      >
        <option value="">Elige un indicador para comparar</option>
        {Object.entries(groupedIndicators).map(([category, inds]) => (
          <optgroup key={category} label={category}>
            {inds.map(ind => (
              <option key={ind.code} value={ind.code}>
                {ind.name} ({ind.unit})
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  )
}