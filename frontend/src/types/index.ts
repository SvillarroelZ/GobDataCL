export type ApiStatus = 'official' | 'estimated' | 'missing' | 'not_applicable'

export interface PoliticalAffiliation {
  party: string
  start_year: number
  end_year: number | null
  role: string
}

export interface DocumentedEvent {
  title: string
  date: string
  description: string
  source_url: string
  type: string
}

export interface Government {
  id: number
  name: string
  slug: string
  start_date: string
  end_date: string
  coalition: string
  short_bio: string
  image_url: string | null
}

export interface GovernmentDetail extends Government {
  political_party_history: string
  documented_controversies: string
}

export interface GovernmentSummary {
  government: {
    id: number
    name: string
    slug: string
    period: string
    duration_years: number
    coalition: string
    short_bio: string
    image_url: string | null
  }
  introduction: string
  key_metrics: Array<{
    label: string
    value: string
    explanation: string
  }>
  political_history: PoliticalAffiliation[]
  documented_events: DocumentedEvent[]
  indicators_by_category: Record<string, Record<string, {
    name: string
    unit: string
    values: Array<{
      year: number
      value: number | null
      status: ApiStatus
    }>
  }>>
  data_disclaimer: string
}

export interface Category {
  code: string
  name: string
  description: string
  icon: string
  indicator_count: number
}

export interface Indicator {
  id: number
  code: string
  name: string
  description: string
  unit: string
  source_name: string
  source_url: string
  frequency: string
  category: string
}

export interface IndicatorValue {
  date: string
  year: number
  value: number | null
  status: ApiStatus
  government_id?: number
}

export interface TimelineData {
  indicator: {
    code: string
    name: string
    description: string
    unit: string
    source_name: string
    source_url: string
  }
  explanation: string
  data: Array<{
    date: string
    year: number
    value: number | null
    status: ApiStatus
    government: {
      id: number
      name: string
      slug: string
      coalition: string
    } | null
  }>
  government_periods: Array<{
    id: number
    name: string
    slug: string
    start_year: number
    end_year: number
    coalition: string
  }>
  chart_config: {
    x_axis: string
    y_axis: string
    y_label: string
    x_label: string
  }
}

export interface ComparisonData {
  indicator: {
    code: string
    name: string
    description: string
    unit: string
    source_name: string
  }
  explanation: string
  comparison: Array<{
    government: {
      id: number
      name: string
      slug: string
      period: string
      coalition: string
    }
    values: IndicatorValue[]
    summary: {
      count: number
      average: number | null
      min: number | null
      max: number | null
      first_value: number | null
      last_value: number | null
      change: number | null
    }
  }>
}

export interface ApiError {
  detail: string
}
