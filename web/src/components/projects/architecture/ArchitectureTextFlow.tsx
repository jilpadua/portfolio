import type { ArchitectureGraph } from '@/lib/sanity/types'
import { formatArchitectureTextFlow } from '@/lib/architecture-graph'

type ArchitectureTextFlowProps = {
  graph: ArchitectureGraph
  className?: string
}

export function ArchitectureTextFlow({ graph, className = '' }: ArchitectureTextFlowProps) {
  const steps = formatArchitectureTextFlow(graph)
  if (!steps.length) return null

  return (
    <div className={className}>
      <p className="mono-label mb-3">Architecture flow</p>
      <ol className="mx-auto w-full space-y-1 font-mono text-sm leading-relaxed text-muted sm:w-[82%] md:w-[68%]">
        {steps.map((step, index) => (
          <li key={`${step}-${index}`}>
            {index > 0 && (
              <span aria-hidden="true" className="mb-1 block text-center text-accent">
                ↓
              </span>
            )}
            <span className="block rounded-md border border-border bg-surface px-3 py-2 text-center break-words text-foreground">
              {step}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}
