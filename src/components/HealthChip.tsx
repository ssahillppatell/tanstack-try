import type { HealthType } from '../types/server.ts'

const HealthChip = ({
  type
}: { type: HealthType }) => {
  const chipClass: Record<HealthType, string> = {
    healthy: "bg-emerald-600",
    error: "bg-rose-600",
    disabled: "bg-slate-500"
  } as const;

  return (
    <div className={`text-white rounded-full px-2 py-1 text-sm font-medium text-center mr-2 mb-2 ${chipClass[type]}`}>
      { type }
    </div>
  )
}

export default HealthChip
