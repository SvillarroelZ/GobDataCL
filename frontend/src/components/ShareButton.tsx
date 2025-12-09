import { useState } from 'react'
import { getShareableUrl, copyToClipboard } from '../hooks/useUrlState'

interface ShareButtonProps {
  view: 'compare' | 'profile'
  indicator?: string | null
  governments?: number[]
  government?: number | null
}

export function ShareButton({ view, indicator, governments, government }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    const url = getShareableUrl({
      view,
      indicator: indicator || undefined,
      governments: governments && governments.length > 0 ? governments : undefined,
      government: government || undefined,
    })

    const success = await copyToClipboard(url)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <button
      className="share-button"
      onClick={handleShare}
      aria-label="Copiar enlace para compartir"
    >
      {copied ? (
        <>
          <span aria-hidden="true">✓</span>
          <span>Enlace copiado</span>
        </>
      ) : (
        <>
          <span aria-hidden="true">🔗</span>
          <span>Compartir</span>
        </>
      )}
    </button>
  )
}

interface ShareModalProps {
  isOpen: boolean
  onClose: () => void
  url: string
  title: string
}

export function ShareModal({ isOpen, onClose, url, title }: ShareModalProps) {
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const handleCopy = async () => {
    const success = await copyToClipboard(url)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`${title} - GobData CL`)
    const shareUrl = encodeURIComponent(url)
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${shareUrl}`, '_blank')
  }

  const shareOnFacebook = () => {
    const shareUrl = encodeURIComponent(url)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank')
  }

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(`${title} - GobData CL: ${url}`)
    window.open(`https://wa.me/?text=${text}`, '_blank')
  }

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="share-title">
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h3 id="share-title" className="modal-title">Compartir esta comparacion</h3>
        
        <div className="share-url-container">
          <input
            type="text"
            value={url}
            readOnly
            className="share-url-input"
            aria-label="URL para compartir"
          />
          <button className="share-copy-button" onClick={handleCopy}>
            {copied ? 'Copiado' : 'Copiar'}
          </button>
        </div>

        <div className="share-social">
          <button className="social-button twitter" onClick={shareOnTwitter} aria-label="Compartir en Twitter">
            Twitter
          </button>
          <button className="social-button facebook" onClick={shareOnFacebook} aria-label="Compartir en Facebook">
            Facebook
          </button>
          <button className="social-button whatsapp" onClick={shareOnWhatsApp} aria-label="Compartir en WhatsApp">
            WhatsApp
          </button>
        </div>

        <button className="modal-close" onClick={onClose} aria-label="Cerrar">
          Cerrar
        </button>
      </div>
    </div>
  )
}
