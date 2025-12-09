import { useState, useMemo, useRef, useEffect } from 'react'
import type { Indicator } from '../types'

interface SearchBarProps {
  indicators: Indicator[]
  onSelect: (code: string) => void
  placeholder?: string
}

export function SearchBar({ indicators, onSelect, placeholder = 'Buscar indicador...' }: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const results = useMemo(() => {
    if (!query.trim()) return []
    
    const q = query.toLowerCase().trim()
    return indicators
      .filter(ind => 
        ind.name.toLowerCase().includes(q) ||
        ind.description?.toLowerCase().includes(q) ||
        ind.code.toLowerCase().includes(q)
      )
      .slice(0, 8) // Max 8 results
  }, [query, indicators])

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Keyboard navigation
  const [selectedIndex, setSelectedIndex] = useState(-1)

  useEffect(() => {
    setSelectedIndex(-1)
  }, [results])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!isOpen || results.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => (prev + 1) % results.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => (prev - 1 + results.length) % results.length)
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault()
      handleSelect(results[selectedIndex].code)
    } else if (e.key === 'Escape') {
      setIsOpen(false)
      inputRef.current?.blur()
    }
  }

  function handleSelect(code: string) {
    onSelect(code)
    setQuery('')
    setIsOpen(false)
    inputRef.current?.blur()
  }

  return (
    <div className="search-bar-container" ref={containerRef}>
      <div className="search-input-wrapper">
        <span className="search-icon" aria-hidden="true">🔍</span>
        <input
          ref={inputRef}
          type="search"
          className="search-input"
          placeholder={placeholder}
          value={query}
          onChange={e => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          aria-label="Buscar indicadores"
          aria-expanded={isOpen && results.length > 0}
          aria-autocomplete="list"
          aria-controls="search-results"
        />
        {query && (
          <button
            className="search-clear"
            onClick={() => {
              setQuery('')
              inputRef.current?.focus()
            }}
            aria-label="Limpiar busqueda"
          >
            ✕
          </button>
        )}
      </div>

      {isOpen && results.length > 0 && (
        <ul
          id="search-results"
          className="search-results"
          role="listbox"
          aria-label="Resultados de busqueda"
        >
          {results.map((ind, index) => (
            <li
              key={ind.code}
              className={`search-result-item ${index === selectedIndex ? 'selected' : ''}`}
              onClick={() => handleSelect(ind.code)}
              role="option"
              aria-selected={index === selectedIndex}
            >
              <span className="result-name">{ind.name}</span>
              {ind.unit && <span className="result-unit">({ind.unit})</span>}
            </li>
          ))}
        </ul>
      )}

      {isOpen && query.trim() && results.length === 0 && (
        <div className="search-no-results">
          No se encontraron indicadores para "{query}"
        </div>
      )}
    </div>
  )
}
