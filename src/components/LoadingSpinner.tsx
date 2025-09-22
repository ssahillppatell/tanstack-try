import { useEffect, useRef, useState } from 'react'

interface LoadingSpinnerProps {
  active: boolean
  delayMs?: number
  text?: string
}

const LoadingSpinner = ({ text = 'Loading…' }: LoadingSpinnerProps) => {
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

