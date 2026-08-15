import { ARCHITECTURE_NODE_TYPE_LABELS } from '@/lib/case-study'
import type { ArchitectureNodeType } from '@/lib/sanity/types'

const LEGEND_TYPES: ArchitectureNodeType[] = [
  'client',
  'gateway',
  'service',
  'database',
  'external',
]

export function ArchitectureLegend() {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2" aria-label="Architecture legend">
      {LEGEND_TYPES.map((type) => (
        <div key={type} className="flex items-center gap-2 text-xs text-muted">
          <span
            className={`inline-block h-2.5 w-2.5 rounded-sm border border-border architecture-node-${type}`}
            aria-hidden="true"
          />
          <span>{ARCHITECTURE_NODE_TYPE_LABELS[type]}</span>
        </div>
      ))}
    </div>
  )
}
