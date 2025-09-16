import { useEffect, useRef, useState } from 'react'

interface LoadingSpinnerProps {
  active: boolean
  delayMs?: number
  text?: string
}

const LoadingSpinner = ({ active, delayMs = 2000, text = 'Loading…' }: LoadingSpinnerProps) => {
  const [visible, setVisible] = useState(false)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    if (active) {
      // Show spinner after delay to avoid flicker on quick operations
      timerRef.current = window.setTimeout(() => setVisible(true), delayMs)
    } else {
      // Cancel pending show and hide immediately
      if (timerRef.current) window.clearTimeout(timerRef.current)
      timerRef.current = null
      setVisible(false)
    }

    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [active, delayMs])

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="flex flex-col items-center gap-3 rounded-lg bg-white px-6 py-5 shadow-lg">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-slate-300 border-t-blue-600" />
        <div className="text-sm text-slate-700">{text}</div>
      </div>
    </div>
  )
}

export default LoadingSpinner

