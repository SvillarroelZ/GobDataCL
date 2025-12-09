import { useEffect, useCallback } from 'react'

interface UrlState {
  view?: 'compare' | 'profile'
  indicator?: string
  governments?: number[]
  government?: number
}

export function useUrlState(
  state: UrlState,
  onStateChange: (state: UrlState) => void
) {
  // Parse URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const newState: UrlState = {}

    const view = params.get('view')
    if (view === 'compare' || view === 'profile') {
      newState.view = view
    }

    const indicator = params.get('indicator')
    if (indicator && /^[a-z_]+$/.test(indicator)) {
      newState.indicator = indicator
    }

    const governments = params.get('governments')
    if (governments) {
      const ids = governments.split(',').map(Number).filter(n => !isNaN(n) && n > 0)
      if (ids.length > 0) {
        newState.governments = ids
      }
    }

    const government = params.get('government')
    if (government) {
      const id = Number(government)
      if (!isNaN(id) && id > 0) {
        newState.government = id
      }
    }

    if (Object.keys(newState).length > 0) {
      onStateChange(newState)
    }
  }, [])

  // Update URL when state changes
  const updateUrl = useCallback((newState: UrlState) => {
    const params = new URLSearchParams()

    if (newState.view) {
      params.set('view', newState.view)
    }

    if (newState.indicator) {
      params.set('indicator', newState.indicator)
    }

    if (newState.governments && newState.governments.length > 0) {
      params.set('governments', newState.governments.join(','))
    }

    if (newState.government) {
      params.set('government', String(newState.government))
    }

    const newUrl = params.toString() 
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname

    window.history.replaceState({}, '', newUrl)
  }, [])

  useEffect(() => {
    updateUrl(state)
  }, [state, updateUrl])

  return { updateUrl }
}

export function getShareableUrl(state: UrlState): string {
  const params = new URLSearchParams()

  if (state.view) {
    params.set('view', state.view)
  }

  if (state.indicator) {
    params.set('indicator', state.indicator)
  }

  if (state.governments && state.governments.length > 0) {
    params.set('governments', state.governments.join(','))
  }

  if (state.government) {
    params.set('government', String(state.government))
  }

  const baseUrl = window.location.origin + window.location.pathname
  return params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl
}

export function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(text).then(() => true).catch(() => false)
  }
  
  // Fallback for older browsers
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'fixed'
  textarea.style.opacity = '0'
  document.body.appendChild(textarea)
  textarea.select()
  
  try {
    document.execCommand('copy')
    return Promise.resolve(true)
  } catch {
    return Promise.resolve(false)
  } finally {
    document.body.removeChild(textarea)
  }
}
