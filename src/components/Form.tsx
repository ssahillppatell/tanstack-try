import { useState } from 'react'
import type { HealthType, Server } from '../types/server'

export type ServerInput = Omit<Server, 'id' | 'createdAt'>

const Form = ({ onSubmit, onCancel, defaultValues }: {
  onSubmit: (values: ServerInput) => Promise<void> | void
  onCancel?: () => void
  defaultValues?: Partial<ServerInput>
}) => {
  const [values, setValues] = useState<ServerInput>({
    name: defaultValues?.name ?? '',
    location: defaultValues?.location ?? '',
    health: defaultValues?.health ?? 'healthy',
    ip: defaultValues?.ip ?? '',
    volume: defaultValues?.volume ?? 1000,
  })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setValues((v) => ({
      ...v,
      [name]: name === 'volume' ? Number(value) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(values)
    try {
      setSubmitting(true)
      await onSubmit(values)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="space-y-1">
          <span className="block text-sm text-slate-700">Name</span>
          <input
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
            name="name"
            value={values.name}
            onChange={handleChange}
            required
          />
        </label>
        <label className="space-y-1">
          <span className="block text-sm text-slate-700">Location</span>
          <input
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
            name="location"
            value={values.location}
            onChange={handleChange}
            required
          />
        </label>
        <label className="space-y-1">
          <span className="block text-sm text-slate-700">Health</span>
          <select
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm bg-white"
            name="health"
            value={values.health}
            onChange={handleChange}
          >
            {(['healthy','disabled','error'] as HealthType[]).map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </label>
        <label className="space-y-1">
          <span className="block text-sm text-slate-700">IP Address</span>
          <input
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
            name="ip"
            value={values.ip}
            onChange={handleChange}
            placeholder="e.g. 192.168.1.10"
            required
          />
        </label>
        <label className="space-y-1">
          <span className="block text-sm text-slate-700">Volume</span>
          <input
            className="w-full rounded border border-slate-300 px-3 py-2 text-sm"
            name="volume"
            type="number"
            min={0}
            value={values.volume}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="flex justify-end gap-2">
        {onCancel && (
          <button type="button" onClick={onCancel} className="rounded border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">
            Cancel
          </button>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="rounded bg-emerald-600 px-3 py-2 text-sm text-white hover:bg-emerald-700 disabled:opacity-60"
        >
          {submitting ? 'Adding…' : 'Add'}
        </button>
      </div>
    </form>
  )
}

export default Form
