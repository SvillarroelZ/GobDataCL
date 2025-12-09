import { useCallback, useRef } from 'react'

interface ExportButtonsProps {
  targetRef: React.RefObject<HTMLElement>
  filename?: string
  data?: Record<string, unknown>[] | null
}

export function ExportButtons({ targetRef, filename = 'gobdata-export', data }: ExportButtonsProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const exportAsImage = useCallback(async () => {
    if (!targetRef.current) return

    try {
      // Dynamic import to avoid bundling if not used
      const html2canvas = (await import('html2canvas')).default
      
      const canvas = await html2canvas(targetRef.current, {
        backgroundColor: '#ffffff',
        scale: 2, // Higher quality
        logging: false,
        useCORS: true,
      })

      canvasRef.current = canvas

      // Convert to blob and download
      canvas.toBlob(blob => {
        if (!blob) return
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.download = `${filename}.png`
        link.href = url
        link.click()
        URL.revokeObjectURL(url)
      }, 'image/png')
    } catch (err) {
      console.error('Error exporting image:', err)
      alert('Error al exportar imagen. Intenta de nuevo.')
    }
  }, [targetRef, filename])

  const exportAsCSV = useCallback(() => {
    if (!data || data.length === 0) {
      alert('No hay datos para exportar')
      return
    }

    try {
      const headers = Object.keys(data[0])
      const csvRows = [
        headers.join(','), // Header row
        ...data.map(row =>
          headers.map(header => {
            const value = row[header]
            // Escape strings with commas or quotes
            if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
              return `"${value.replace(/"/g, '""')}"`
            }
            return value ?? ''
          }).join(',')
        )
      ]

      const csvString = csvRows.join('\n')
      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.download = `${filename}.csv`
      link.href = url
      link.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Error exporting CSV:', err)
      alert('Error al exportar CSV. Intenta de nuevo.')
    }
  }, [data, filename])

  return (
    <div className="export-buttons">
      <button
        className="export-button"
        onClick={exportAsImage}
        aria-label="Exportar como imagen PNG"
        title="Descargar como imagen"
      >
        <span aria-hidden="true">📷</span>
        <span>Imagen</span>
      </button>
      
      {data && data.length > 0 && (
        <button
          className="export-button"
          onClick={exportAsCSV}
          aria-label="Exportar como archivo CSV"
          title="Descargar datos en CSV"
        >
          <span aria-hidden="true">📊</span>
          <span>CSV</span>
        </button>
      )}
    </div>
  )
}

// Simple version without html2canvas dependency
export function ExportCSVButton({ data, filename = 'gobdata-export' }: { data: Record<string, unknown>[] | null; filename?: string }) {
  const exportAsCSV = useCallback(() => {
    if (!data || data.length === 0) {
      alert('No hay datos para exportar')
      return
    }

    try {
      const headers = Object.keys(data[0])
      const csvRows = [
        headers.join(','),
        ...data.map(row =>
          headers.map(header => {
            const value = row[header]
            if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
              return `"${value.replace(/"/g, '""')}"`
            }
            return value ?? ''
          }).join(',')
        )
      ]

      const csvString = csvRows.join('\n')
      const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.download = `${filename}.csv`
      link.href = url
      link.click()
      URL.revokeObjectURL(url)
    } catch (err) {
      console.error('Error exporting CSV:', err)
    }
  }, [data, filename])

  if (!data || data.length === 0) return null

  return (
    <button
      className="export-button export-csv"
      onClick={exportAsCSV}
      aria-label="Exportar datos como CSV"
    >
      <span aria-hidden="true">⬇️</span>
      <span>Descargar CSV</span>
    </button>
  )
}
