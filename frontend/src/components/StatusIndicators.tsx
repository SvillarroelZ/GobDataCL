interface LoadingSpinnerProps {
  message?: string
}

export function LoadingSpinner({ message = 'Cargando datos...' }: LoadingSpinnerProps) {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-message">{message}</p>
    </div>
  )
}

interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

export function ErrorMessage({ message, onRetry }: ErrorMessageProps) {
  return (
    <div className="error-container">
      <p className="error-title">No se pudieron cargar los datos</p>
      <p className="error-message">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="retry-button">
          Intentar de nuevo
        </button>
      )}
    </div>
  )
}

interface EmptyStateProps {
  title: string
  description: string
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="empty-state">
      <p className="empty-title">{title}</p>
      <p className="empty-description">{description}</p>
    </div>
  )
}