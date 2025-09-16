import type { HealthType } from '../types/server.ts'

const HealthChip = ({
  type
}: { type: HealthType }) => {
  const chipClass: Record<HealthType, string> = {
    healthy: "bg-green-400",
    error: "bg-red-400",
    disabled: "bg-gray-400"
  } as const;

  return (
    <div className={`text-white rounded-full px-2 py-1 text-sm font-semibold text-center mr-2 mb-2 ${chipClass[type]}`}>
      { type }
    </div>
  )
}

export default HealthChip
