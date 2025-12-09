import { useState } from 'react'

interface TooltipProps {
  content: string
  children: React.ReactNode
}

export function Tooltip({ content, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <span 
      className="tooltip-wrapper"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <span className="tooltip-content" role="tooltip">
          {content}
        </span>
      )}
    </span>
  )
}

interface InfoButtonProps {
  text: string
  label?: string
}

export function InfoButton({ text, label = 'Mas informacion' }: InfoButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <span className="info-button-wrapper">
      <button
        type="button"
        className="info-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={label}
        aria-expanded={isOpen}
      >
        ?
      </button>
      {isOpen && (
        <span className="info-popup" role="tooltip">
          {text}
          <button 
            className="info-close" 
            onClick={() => setIsOpen(false)}
            aria-label="Cerrar"
          >
            Cerrar
          </button>
        </span>
      )}
    </span>
  )
}

interface MetricExplainerProps {
  metric: string
  value: string | number
  explanation: string
  source?: string
  sourceUrl?: string
}

export function MetricExplainer({ metric, value, explanation, source, sourceUrl }: MetricExplainerProps) {
  return (
    <div className="metric-explainer">
      <div className="metric-header">
        <span className="metric-name">{metric}</span>
        <InfoButton text={explanation} />
      </div>
      <span className="metric-value">{value}</span>
      {source && (
        <span className="metric-source">
          Fuente: {sourceUrl ? (
            <a href={sourceUrl} target="_blank" rel="noopener noreferrer">{source}</a>
          ) : source}
        </span>
      )}
    </div>
  )
}
