const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

import type {
  Government,
  GovernmentSummary,
  Category,
  Indicator,
  TimelineData,
  ComparisonData,
  ApiError,
} from '../types'

class ApiService {
  private baseUrl: string

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
  }

  private async fetch<T>(endpoint: string): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`)
      
      if (!response.ok) {
        const error: ApiError = await response.json().catch(() => ({
          detail: `Error ${response.status}: ${response.statusText}`,
        }))
        throw new Error(error.detail || 'Error desconocido')
      }
      
      return response.json()
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Error de conexion. Verifica tu conexion a internet.')
    }
  }

  async getGovernments(): Promise<Government[]> {
    return this.fetch<Government[]>('/governments')
  }

  async getGovernment(id: number): Promise<Government> {
    return this.fetch<Government>(`/governments/${id}`)
  }

  async getGovernmentSummary(id: number): Promise<GovernmentSummary> {
    return this.fetch<GovernmentSummary>(`/governments/${id}/summary`)
  }

  async getCategories(): Promise<Category[]> {
    return this.fetch<Category[]>('/categories')
  }

  async getCategory(code: string): Promise<Category & { indicators: Indicator[] }> {
    return this.fetch<Category & { indicators: Indicator[] }>(`/categories/${code}`)
  }

  async getIndicators(category?: string): Promise<Indicator[]> {
    const query = category ? `?category=${encodeURIComponent(category)}` : ''
    return this.fetch<Indicator[]>(`/indicators${query}`)
  }

  async getIndicator(code: string): Promise<Indicator> {
    return this.fetch<Indicator>(`/indicators/${code}`)
  }

  async getIndicatorTimeline(code: string): Promise<TimelineData> {
    return this.fetch<TimelineData>(`/indicators/${code}/timeline`)
  }

  async compareIndicator(code: string, governmentIds: number[]): Promise<ComparisonData> {
    const ids = governmentIds.join(',')
    return this.fetch<ComparisonData>(`/indicators/${code}/compare?government_ids=${ids}`)
  }

  async checkHealth(): Promise<{ status: string }> {
    return this.fetch<{ status: string }>('/health')
  }
}

export const api = new ApiService(API_BASE_URL)
export default api