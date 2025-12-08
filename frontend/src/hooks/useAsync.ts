import { useState, useEffect, useCallback } from 'react'

type AsyncState<T> = {
  data: T | null
  loading: boolean
  error: string | null
}

export function useAsync<T>(
  asyncFn: () => Promise<T>,
  dependencies: unknown[] = []
): AsyncState<T> & { refetch: () => void } {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: true,
    error: null,
  })

  const execute = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    try {
      const data = await asyncFn()
      setState({ data, loading: false, error: null })
    } catch (err) {
      const message = err instanceof Error 
        ? err.message 
        : 'Ocurrio un error inesperado'
      setState({ data: null, loading: false, error: message })
    }
  }, dependencies)

  useEffect(() => {
    execute()
  }, [execute])

  return { ...state, refetch: execute }
}

export function useLazyAsync<T, Args extends unknown[]>(
  asyncFn: (...args: Args) => Promise<T>
): AsyncState<T> & { execute: (...args: Args) => Promise<void> } {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const execute = useCallback(async (...args: Args) => {
    setState(prev => ({ ...prev, loading: true, error: null }))
    try {
      const data = await asyncFn(...args)
      setState({ data, loading: false, error: null })
    } catch (err) {
      const message = err instanceof Error 
        ? err.message 
        : 'Ocurrio un error inesperado'
      setState({ data: null, loading: false, error: message })
    }
  }, [asyncFn])

  return { ...state, execute }
}