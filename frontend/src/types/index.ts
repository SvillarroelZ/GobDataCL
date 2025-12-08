export type ApiStatus = 'official' | 'missing' | 'not_applicable'

export interface Government {
  id: number
  name: string
  slug: string
  start_date: string
  end_date: string | null
  coalition?: string | null
  short_bio: string
  image_url?: string | null
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
  value: number | null
  status: ApiStatus
  government_id: number
}
