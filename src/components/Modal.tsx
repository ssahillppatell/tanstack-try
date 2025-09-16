import React from 'react'

const Modal = ({ open, title, onClose, children }: {
  open: boolean
  title?: string
  onClose: () => void
  children: React.ReactNode
}) => {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-lg overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
            <h2 className="text-sm font-semibold text-slate-800">{title}</h2>
            <button className="text-slate-500 hover:text-slate-700" onClick={onClose} aria-label="Close">✕</button>
          </div>
          <div className="p-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Modal

