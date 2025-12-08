import type { Government } from '../types'

interface GovernmentSelectorProps {
  governments: Government[]
  selectedId: number | null
  onSelect: (id: number | null) => void
  label?: string
  placeholder?: string
}

export function GovernmentSelector({
  governments,
  selectedId,
  onSelect,
  label = 'Seleccionar presidente',
  placeholder = 'Elige un presidente',
}: GovernmentSelectorProps) {
  const selectedGov = governments.find(g => g.id === selectedId)

  function formatPeriod(gov: Government): string {
    const startYear = new Date(gov.start_date).getFullYear()
    const endYear = new Date(gov.end_date).getFullYear()
    return `${startYear} - ${endYear}`
  }

  return (
    <div className="government-selector">
      {label && <label className="selector-label">{label}</label>}
      <select
        value={selectedId ?? ''}
        onChange={e => {
          const value = e.target.value
          onSelect(value ? Number(value) : null)
        }}
        className="selector-input"
      >
        <option value="">{placeholder}</option>
        {governments.map(gov => (
          <option key={gov.id} value={gov.id}>
            {gov.name} ({formatPeriod(gov)})
          </option>
        ))}
      </select>
      {selectedGov && (
        <p className="selector-hint">
          {selectedGov.coalition}
        </p>
      )}
    </div>
  )
}