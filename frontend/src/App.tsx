import { useState, useEffect, useCallback } from 'react'
import './index.css'
import api from './services/api'
import { GovernmentSelector } from './components/GovernmentSelector'
import { GovernmentProfile } from './components/GovernmentProfile'
import { GovernmentComparison } from './components/GovernmentComparison'
import { ComparisonChart } from './components/ComparisonChart'
import { TimelineChart } from './components/TimelineChart'
import { IndicatorSelector } from './components/IndicatorSelector'
import { LoadingSpinner, ErrorMessage, EmptyState } from './components/StatusIndicators'
import type { Government, GovernmentSummary, Indicator, Category, ComparisonData, TimelineData } from './types'

type ViewMode = 'profile' | 'compare'

function App() {
  const [governments, setGovernments] = useState<Government[]>([])
  const [indicators, setIndicators] = useState<Indicator[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  
  const [viewMode, setViewMode] = useState<ViewMode>('compare')
  
  const [selectedGovernmentId, setSelectedGovernmentId] = useState<number | null>(null)
  const [governmentSummary, setGovernmentSummary] = useState<GovernmentSummary | null>(null)
  
  const [compareGovernmentIds, setCompareGovernmentIds] = useState<number[]>([])
  const [selectedIndicatorCode, setSelectedIndicatorCode] = useState<string | null>(null)
  const [comparisonData, setComparisonData] = useState<ComparisonData | null>(null)
  const [timelineData, setTimelineData] = useState<TimelineData | null>(null)
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [summaryLoading, setSummaryLoading] = useState(false)
  const [comparisonLoading, setComparisonLoading] = useState(false)
  const [timelineLoading, setTimelineLoading] = useState(false)

  const loadInitialData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const [govs, inds, cats] = await Promise.all([
        api.getGovernments(),
        api.getIndicators(),
        api.getCategories(),
      ])
      setGovernments(govs)
      setIndicators(inds)
      setCategories(cats)
      
      if (govs.length >= 2) {
        const lastTwo = govs.slice(0, 2).map(g => g.id)
        setCompareGovernmentIds(lastTwo)
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error al cargar datos iniciales'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadInitialData()
  }, [loadInitialData])

  useEffect(() => {
    if (!selectedGovernmentId) {
      setGovernmentSummary(null)
      return
    }

    setSummaryLoading(true)
    api.getGovernmentSummary(selectedGovernmentId)
      .then(setGovernmentSummary)
      .catch(err => {
        console.error('Error loading government summary:', err)
        setGovernmentSummary(null)
      })
      .finally(() => setSummaryLoading(false))
  }, [selectedGovernmentId])

  useEffect(() => {
    if (!selectedIndicatorCode || compareGovernmentIds.length < 2) {
      setComparisonData(null)
      return
    }

    setComparisonLoading(true)
    api.compareIndicator(selectedIndicatorCode, compareGovernmentIds)
      .then(setComparisonData)
      .catch(err => {
        console.error('Error loading comparison:', err)
        setComparisonData(null)
      })
      .finally(() => setComparisonLoading(false))
  }, [selectedIndicatorCode, compareGovernmentIds])

  useEffect(() => {
    if (!selectedIndicatorCode) {
      setTimelineData(null)
      return
    }

    setTimelineLoading(true)
    api.getIndicatorTimeline(selectedIndicatorCode)
      .then(setTimelineData)
      .catch(err => {
        console.error('Error loading timeline:', err)
        setTimelineData(null)
      })
      .finally(() => setTimelineLoading(false))
  }, [selectedIndicatorCode])

  function handleCompareToggle(id: number) {
    setCompareGovernmentIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(x => x !== id)
      }
      return [...prev, id]
    })
  }

  function handleQuickCompare(preset: 'all' | 'recent' | 'clear') {
    if (preset === 'all') {
      setCompareGovernmentIds(governments.map(g => g.id))
    } else if (preset === 'recent') {
      setCompareGovernmentIds(governments.slice(0, 3).map(g => g.id))
    } else {
      setCompareGovernmentIds([])
    }
  }

  if (loading) {
    return (
      <div className="app-shell">
        <LoadingSpinner message="Cargando informacion de gobiernos..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className="app-shell">
        <ErrorMessage message={error} onRetry={loadInitialData} />
      </div>
    )
  }

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="app-kicker">GobData CL</p>
          <h1 className="app-title">Explorador de datos de gobiernos</h1>
          <p className="app-subtitle">
            Visualizacion neutral de indicadores oficiales por periodo de gobierno en Chile.
          </p>
        </div>
      </header>

      <main className="app-main">
        <div className="view-tabs">
          <button
            className={`view-tab ${viewMode === 'compare' ? 'active' : ''}`}
            onClick={() => setViewMode('compare')}
          >
            Comparar gobiernos
          </button>
          <button
            className={`view-tab ${viewMode === 'profile' ? 'active' : ''}`}
            onClick={() => setViewMode('profile')}
          >
            Ver perfil
          </button>
        </div>

        {viewMode === 'compare' && (
          <>
            <div className="quick-compare-banner">
              <h2 className="banner-title">Compara indicadores entre gobiernos</h2>
              <p className="banner-subtitle">
                Selecciona un indicador y los gobiernos que quieres comparar
              </p>
              <div className="banner-buttons">
                <button
                  className={`banner-button ${compareGovernmentIds.length === governments.length ? 'active' : ''}`}
                  onClick={() => handleQuickCompare('all')}
                >
                  Todos los gobiernos
                </button>
                <button
                  className={`banner-button ${compareGovernmentIds.length === 3 ? 'active' : ''}`}
                  onClick={() => handleQuickCompare('recent')}
                >
                  Ultimos 3 gobiernos
                </button>
                <button
                  className="banner-button"
                  onClick={() => handleQuickCompare('clear')}
                >
                  Limpiar seleccion
                </button>
              </div>
            </div>

            <section className="comparison-section">
              <div className="comparison-selectors">
                <IndicatorSelector
                  indicators={indicators}
                  categories={categories}
                  selectedCode={selectedIndicatorCode}
                  onSelect={setSelectedIndicatorCode}
                  label="Selecciona un indicador para comparar"
                />

                <div className="government-checkboxes">
                  <p className="checkbox-label">Gobiernos a incluir en la comparacion:</p>
                  {governments.map(gov => {
                    const startYear = new Date(gov.start_date).getFullYear()
                    const endYear = new Date(gov.end_date).getFullYear()
                    return (
                      <label key={gov.id} className="checkbox-item">
                        <input
                          type="checkbox"
                          checked={compareGovernmentIds.includes(gov.id)}
                          onChange={() => handleCompareToggle(gov.id)}
                        />
                        <span>{gov.name} ({startYear}-{endYear})</span>
                      </label>
                    )
                  })}
                </div>
              </div>

              {!selectedIndicatorCode && (
                <EmptyState
                  title="Selecciona un indicador"
                  description="Elige un indicador de la lista para ver su evolucion a traves del tiempo y comparar entre gobiernos."
                />
              )}

              {timelineLoading && (
                <LoadingSpinner message="Cargando datos historicos..." />
              )}

              {!timelineLoading && timelineData && (
                <TimelineChart data={timelineData} />
              )}

              {comparisonLoading && (
                <LoadingSpinner message="Calculando comparacion..." />
              )}

              {!comparisonLoading && comparisonData && compareGovernmentIds.length >= 2 && (
                <>
                  <ComparisonChart data={comparisonData} />
                  <GovernmentComparison data={comparisonData} />
                </>
              )}

              {selectedIndicatorCode && compareGovernmentIds.length < 2 && (
                <p className="comparison-hint">
                  Selecciona al menos 2 gobiernos para ver la comparacion detallada.
                </p>
              )}
            </section>
          </>
        )}

        {viewMode === 'profile' && (
          <>
            <section className="selector-section">
              <GovernmentSelector
                governments={governments}
                selectedId={selectedGovernmentId}
                onSelect={setSelectedGovernmentId}
                label="Selecciona un presidente para ver su informacion"
                placeholder="Haz clic aqui para elegir"
              />
            </section>

            {summaryLoading && (
              <LoadingSpinner message="Cargando informacion del presidente..." />
            )}

            {!summaryLoading && governmentSummary && (
              <section className="profile-section">
                <GovernmentProfile summary={governmentSummary} />
              </section>
            )}

            {!selectedGovernmentId && (
              <EmptyState
                title="Selecciona un presidente"
                description="Elige un presidente de la lista para ver su perfil, indicadores economicos y datos de su gobierno."
              />
            )}
          </>
        )}
      </main>

      <footer className="app-footer">
        <p>Esta herramienta solo visualiza datos oficiales. No clasifica ni evalua a los gobiernos.</p>
        <p className="footer-sources">
          Fuentes: Banco Central, INE, CASEN, DIPRES y otras instituciones oficiales.
        </p>
      </footer>
    </div>
  )
}

export default App
