import type { GovernmentSummary, PoliticalAffiliation } from '../types'

interface GovernmentProfileProps {
  summary: GovernmentSummary
}

export function GovernmentProfile({ summary }: GovernmentProfileProps) {
  const { government, introduction, key_metrics, political_history, data_disclaimer } = summary

  function formatPartyHistory(history: PoliticalAffiliation[]): string {
    if (!history || history.length === 0) {
      return 'Sin informacion de afiliacion politica disponible'
    }
    return history
      .map(p => {
        const period = p.end_year 
          ? `${p.start_year} - ${p.end_year}` 
          : `desde ${p.start_year}`
        return `${p.party} (${period})`
      })
      .join(', ')
  }

  function getPresidentialParty(history: PoliticalAffiliation[], startYear: number): string {
    if (!history || history.length === 0) {
      return 'No especificado'
    }
    const party = history.find(p => {
      const endYear = p.end_year ?? new Date().getFullYear()
      return startYear >= p.start_year && startYear <= endYear
    })
    return party?.party ?? history[history.length - 1]?.party ?? 'No especificado'
  }

  const presidentialStartYear = parseInt(government.period.split(' - ')[0])
  const partyDuringPresidency = getPresidentialParty(political_history, presidentialStartYear)

  return (
    <div className="government-profile">
      <div className="profile-header">
        <div className="profile-image">
          {government.image_url ? (
            <img 
              src={government.image_url} 
              alt={`Foto de ${government.name}`}
              className="president-photo"
            />
          ) : (
            <div className="president-photo-placeholder">
              <span className="placeholder-initial">
                {government.name.charAt(0)}
              </span>
            </div>
          )}
        </div>
        <div className="profile-info">
          <h2 className="president-name">{government.name}</h2>
          <p className="president-period">
            Periodo: {government.period} ({government.duration_years} anos)
          </p>
          <p className="president-coalition">
            Coalicion: {government.coalition}
          </p>
          <p className="president-party">
            Partido durante presidencia: {partyDuringPresidency}
          </p>
        </div>
      </div>

      <div className="profile-bio">
        <p>{introduction}</p>
      </div>

      {political_history && political_history.length > 0 && (
        <div className="profile-section">
          <h3 className="section-title">Trayectoria politica</h3>
          <p className="party-history">{formatPartyHistory(political_history)}</p>
        </div>
      )}

      {key_metrics && key_metrics.length > 0 && (
        <div className="profile-section">
          <h3 className="section-title">Indicadores clave del periodo</h3>
          <div className="metrics-grid">
            {key_metrics.map((metric, index) => (
              <div key={index} className="metric-card">
                <span className="metric-value">{metric.value}</span>
                <span className="metric-label">{metric.label}</span>
                <span className="metric-explanation">{metric.explanation}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <p className="data-disclaimer">{data_disclaimer}</p>
    </div>
  )
}