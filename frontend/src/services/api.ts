// Detectar URL del backend automaticamente en Codespaces
function getApiBaseUrl(): string {
  // Si hay variable de entorno, usarla
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL
  }
  
  // En Codespaces, construir URL del backend basado en la URL actual
  const currentHost = window.location.hostname
  if (currentHost.includes('.app.github.dev')) {
    // Reemplazar el puerto 5173 por 8000 en la URL de Codespaces
    return window.location.origin.replace('-5173.', '-8000.').replace('-5174.', '-8000.')
  }
  
  // Local development
  return 'http://localhost:8000'
}

const API_BASE_URL = getApiBaseUrl()

const MAX_REQUEST_TIMEOUT = 30000
const MAX_GOVERNMENT_IDS = 10
const VALID_CODE_PATTERN = /^[a-z_]+$/

import type {
  Government,
  GovernmentSummary,
  Category,
  Indicator,
  TimelineData,
  ComparisonData,
  ApiError,
} from '../types'

function sanitizeId(id: number): number {
  const numId = Number(id)
  if (!Number.isInteger(numId) || numId < 1 || numId > 1000000) {
    throw new Error('ID invalido')
  }
  return numId
}

function sanitizeCode(code: string): string {
  const trimmed = code.trim().toLowerCase()
  if (!VALID_CODE_PATTERN.test(trimmed) || trimmed.length > 50) {
    throw new Error('Codigo de indicador invalido')
  }
  return trimmed
}

function sanitizeGovernmentIds(ids: number[]): number[] {
  if (!Array.isArray(ids) || ids.length === 0) {
    throw new Error('Se requiere al menos un ID de gobierno')
  }
  if (ids.length > MAX_GOVERNMENT_IDS) {
    throw new Error(`No se pueden comparar mas de ${MAX_GOVERNMENT_IDS} gobiernos`)
  }
  return ids.map(sanitizeId)
}

class ApiService {
  private baseUrl: string
  private abortControllers: Map<string, AbortController> = new Map()

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private cancelPreviousRequest(key: string): void {
    const existingController = this.abortControllers.get(key)
    if (existingController) {
      existingController.abort()
    }
  }

  private async fetch<T>(endpoint: string, requestKey?: string): Promise<T> {
    if (requestKey) {
      this.cancelPreviousRequest(requestKey)
    }

    const controller = new AbortController()
    if (requestKey) {
      this.abortControllers.set(requestKey, controller)
    }

    const timeoutId = setTimeout(() => controller.abort(), MAX_REQUEST_TIMEOUT)

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        signal: controller.signal,
        headers: {
          'Accept': 'application/json',
        },
        credentials: 'omit',
      })
      
      clearTimeout(timeoutId)
      
      if (!response.ok) {
        let errorDetail = `Error ${response.status}: ${response.statusText}`
        try {
          const error: ApiError = await response.json()
          errorDetail = error.detail || errorDetail
        } catch {
          // Keep default error message
        }
        throw new Error(errorDetail)
      }
      
      const data = await response.json()
      return data as T
    } catch (error) {
      clearTimeout(timeoutId)
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('La solicitud fue cancelada o tomo demasiado tiempo')
        }
        throw error
      }
      throw new Error('Error de conexion. Verifica tu conexion a internet.')
    } finally {
      if (requestKey) {
        this.abortControllers.delete(requestKey)
      }
    }
  }

  async getGovernments(): Promise<Government[]> {
    return this.fetch<Government[]>('/governments', 'governments')
  }

  async getGovernment(id: number): Promise<Government> {
    const safeId = sanitizeId(id)
    return this.fetch<Government>(`/governments/${safeId}`, `government-${safeId}`)
  }

  async getGovernmentSummary(id: number): Promise<GovernmentSummary> {
    const safeId = sanitizeId(id)
    return this.fetch<GovernmentSummary>(`/governments/${safeId}/summary`, `summary-${safeId}`)
  }

  async getCategories(): Promise<Category[]> {
    return this.fetch<Category[]>('/categories', 'categories')
  }

  async getCategory(code: string): Promise<Category & { indicators: Indicator[] }> {
    const safeCode = sanitizeCode(code)
    return this.fetch<Category & { indicators: Indicator[] }>(`/categories/${safeCode}`, `category-${safeCode}`)
  }

  async getIndicators(category?: string): Promise<Indicator[]> {
    let query = ''
    if (category) {
      const safeCategory = sanitizeCode(category)
      query = `?category=${encodeURIComponent(safeCategory)}`
    }
    return this.fetch<Indicator[]>(`/indicators${query}`, 'indicators')
  }

  async getIndicator(code: string): Promise<Indicator> {
    const safeCode = sanitizeCode(code)
    return this.fetch<Indicator>(`/indicators/${safeCode}`, `indicator-${safeCode}`)
  }

  async getIndicatorTimeline(code: string): Promise<TimelineData> {
    const safeCode = sanitizeCode(code)
    return this.fetch<TimelineData>(`/indicators/${safeCode}/timeline`, `timeline-${safeCode}`)
  }

  async compareIndicator(code: string, governmentIds: number[]): Promise<ComparisonData> {
    const safeCode = sanitizeCode(code)
    const safeIds = sanitizeGovernmentIds(governmentIds)
    const idsParam = safeIds.join(',')
    return this.fetch<ComparisonData>(
      `/indicators/${safeCode}/compare?government_ids=${idsParam}`,
      `compare-${safeCode}`
    )
  }

  async checkHealth(): Promise<{ status: string }> {
    return this.fetch<{ status: string }>('/health', 'health')
  }

  cancelAllRequests(): void {
    for (const controller of this.abortControllers.values()) {
      controller.abort()
    }
    this.abortControllers.clear()
  }
}

export const api = new ApiService(API_BASE_URL)
export default api
