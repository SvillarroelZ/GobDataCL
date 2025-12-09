import { useState, useEffect, useCallback, useRef } from 'react'
import './index.css'
import api from './services/api'
import { GovernmentSelector } from './components/GovernmentSelector'
import { GovernmentProfile } from './components/GovernmentProfile'
import { GovernmentComparison } from './components/GovernmentComparison'
import { ComparisonChart } from './components/ComparisonChart'
import { TimelineChart } from './components/TimelineChart'
import { IndicatorSelector } from './components/IndicatorSelector'
import { FeaturedIndicators } from './components/FeaturedIndicators'
import { ShareButton } from './components/ShareButton'
import { GovernmentScoreCard } from './components/GovernmentScoreCard'
import { SkeletonChart, SkeletonTable } from './components/SkeletonLoader'
import { LoadingSpinner, ErrorMessage, EmptyState } from './components/StatusIndicators'
import { SearchBar } from './components/SearchBar'
import { ThemeProvider, ThemeToggle } from './components/ThemeToggle'
import { ExportButtons } from './components/ExportButtons'
import { useUrlState } from './hooks/useUrlState'
import type { Government, GovernmentSummary, Indicator, Category, ComparisonData, TimelineData } from './types'

type ViewMode = 'profile' | 'compare' | 'ranking'

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
  const [allComparisons, setAllComparisons] = useState<ComparisonData[]>([])
  
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [summaryLoading, setSummaryLoading] = useState(false)
  const [comparisonLoading, setComparisonLoading] = useState(false)
  const [timelineLoading, setTimelineLoading] = useState(false)
  const [rankingLoading, setRankingLoading] = useState(false)
  const [initialUrlLoaded, setInitialUrlLoaded] = useState(false)

  // Ref for export functionality
  const comparisonRef = useRef<HTMLDivElement>(null)
  const rankingRef = useRef<HTMLDivElement>(null)

  // URL state management
  useUrlState(
    {
      view: viewMode,
      indicator: selectedIndicatorCode || undefined,
      governments: compareGovernmentIds.length > 0 ? compareGovernmentIds : undefined,
      government: selectedGovernmentId || undefined,
    },
    (urlState) => {
      if (!initialUrlLoaded) {
        if (urlState.view) setViewMode(urlState.view)
        if (urlState.indicator) setSelectedIndicatorCode(urlState.indicator)
        if (urlState.governments) setCompareGovernmentIds(urlState.governments)
        if (urlState.government) setSelectedGovernmentId(urlState.government)
        setInitialUrlLoaded(true)
      }
    }
  )

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
      
      // Only set default if no URL state was loaded
      if (govs.length >= 2 && compareGovernmentIds.length === 0) {
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

  // Load all comparisons for ranking view
  useEffect(() => {
    if (viewMode !== 'ranking' || indicators.length === 0 || governments.length < 2) {
      return
    }

    const govIds = governments.map(g => g.id)
    
    setRankingLoading(true)
    setAllComparisons([])

    Promise.all(
      indicators.map(ind => 
        api.compareIndicator(ind.code, govIds).catch(() => null)
      )
    )
      .then(results => {
        const validResults = results.filter((r): r is ComparisonData => r !== null)
        setAllComparisons(validResults)
      })
      .catch(err => {
        console.error('Error loading ranking data:', err)
      })
      .finally(() => setRankingLoading(false))
  }, [viewMode, indicators, governments])

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
        <div className="app-header-row">
          <div className="app-header-content">
            <p className="app-kicker">GobData CL</p>
            <h1 className="app-title">Explorador de datos de gobiernos</h1>
            <p className="app-subtitle">
              Visualizacion neutral de indicadores oficiales por periodo de gobierno en Chile.
            </p>
          </div>
          <div className="app-header-actions">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="app-main">
        <SearchBar
          indicators={indicators}
          onSelect={(code) => {
            setSelectedIndicatorCode(code)
            setViewMode('compare')
          }}
          placeholder="Buscar indicador (ej: PIB, desempleo, inflacion...)"
        />

        <div className="view-tabs">
          <button
            className={`view-tab ${viewMode === 'ranking' ? 'active' : ''}`}
            onClick={() => setViewMode('ranking')}
          >
            Balance general
          </button>
          <button
            className={`view-tab ${viewMode === 'compare' ? 'active' : ''}`}
            onClick={() => setViewMode('compare')}
          >
            Comparar indicador
          </button>
          <button
            className={`view-tab ${viewMode === 'profile' ? 'active' : ''}`}
            onClick={() => setViewMode('profile')}
          >
            Ver perfil
          </button>
        </div>

        {viewMode === 'ranking' && (
          <>
            <div className="quick-compare-banner ranking-banner">
              <h2 className="banner-title">Balance general de todos los gobiernos</h2>
              <p className="banner-subtitle">
                Analisis estadistico de todos los indicadores disponibles.
                Muestra el porcentaje de indicadores que mejoraron o empeoraron durante cada gobierno.
              </p>
            </div>

            {rankingLoading && (
              <LoadingSpinner message="Analizando todos los indicadores..." />
            )}

            {!rankingLoading && allComparisons.length > 0 && (
              <div ref={rankingRef}>
                <div className="section-header-row" style={{ marginBottom: '16px' }}>
                  <div />
                  <ExportButtons
                    targetRef={rankingRef}
                    filename="gobdata-balance-general"
                    data={null}
                  />
                </div>
                <GovernmentScoreCard
                  comparisons={allComparisons}
                  governmentNames={Object.fromEntries(governments.map(g => [g.id, g.name]))}
                />
              </div>
            )}

            {!rankingLoading && allComparisons.length === 0 && (
              <EmptyState
                title="Sin datos suficientes"
                description="No se encontraron suficientes datos para calcular el balance general."
              />
            )}
          </>
        )}

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

            <section className="comparison-section" ref={comparisonRef}>
              <div className="section-header-row">
                <div>
                  <h2 className="section-heading">Comparar indicadores</h2>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {comparisonData && (
                    <ExportButtons
                      targetRef={comparisonRef}
                      filename={`gobdata-${selectedIndicatorCode || 'comparacion'}`}
                      data={comparisonData.data.map(d => ({
                        gobierno: d.government_name,
                        valor_inicio: d.start_value,
                        valor_fin: d.end_value,
                        cambio_porcentual: d.percent_change,
                      }))}
                    />
                  )}
                  <ShareButton
                    view="compare"
                    indicator={selectedIndicatorCode}
                    governments={compareGovernmentIds}
                  />
                </div>
              </div>

              <FeaturedIndicators
                indicators={indicators}
                selectedCode={selectedIndicatorCode}
                onSelect={setSelectedIndicatorCode}
              />

              <div className="comparison-selectors">
                <IndicatorSelector
                  indicators={indicators}
                  categories={categories}
                  selectedCode={selectedIndicatorCode}
                  onSelect={setSelectedIndicatorCode}
                  label="O elige de la lista completa:"
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
                          aria-label={`Incluir a ${gov.name}`}
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
                  description="Elige un indicador de los mas consultados arriba o de la lista completa para ver su evolucion."
                />
              )}

              {timelineLoading && (
                <SkeletonChart />
              )}

              {!timelineLoading && timelineData && (
                <TimelineChart data={timelineData} />
              )}

              {comparisonLoading && (
                <SkeletonTable />
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
