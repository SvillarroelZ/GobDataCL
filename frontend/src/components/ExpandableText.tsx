import { useState } from 'react'

interface ExpandableTextProps {
  text: string
  maxLength?: number
  className?: string
}

/**
 * Componente para mostrar texto largo con opcion de expandir.
 * Por defecto trunca a 200 caracteres.
 */
export function ExpandableText({ 
  text, 
  maxLength = 200,
  className = ''
}: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  // Si el texto es corto, mostrarlo completo
  if (text.length <= maxLength) {
    return <span className={className}>{text}</span>
  }

  const displayText = isExpanded 
    ? text 
    : text.slice(0, maxLength).trim() + '...'

  return (
    <span className={`expandable-text ${className}`}>
      {displayText}
      <button
        className="expand-button"
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-label={isExpanded ? 'Mostrar menos' : 'Mostrar mas'}
      >
        {isExpanded ? ' [menos]' : ' [mas]'}
      </button>
    </span>
  )
}

interface TruncatedTextProps {
  text: string
  maxLength?: number
  className?: string
}

/**
 * Componente simple que trunca texto sin opcion de expandir.
 * Usa CSS text-overflow para el truncado.
 */
export function TruncatedText({ 
  text, 
  maxLength = 150,
  className = ''
}: TruncatedTextProps) {
  if (text.length <= maxLength) {
    return <span className={className}>{text}</span>
  }

  return (
    <span 
      className={`truncated-text ${className}`}
      title={text}
    >
      {text.slice(0, maxLength).trim()}...
    </span>
  )
}
