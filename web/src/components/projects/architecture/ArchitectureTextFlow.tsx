import type { ArchitectureGraph } from '@/lib/sanity/types'
import { getOrderedNodes } from '@/lib/architecture-graph'

type ArchitectureTextFlowProps = {
  graph: ArchitectureGraph
  className?: string
}

export function ArchitectureTextFlow({ graph, className = '' }: ArchitectureTextFlowProps) {
  const nodes = getOrderedNodes(graph)
  if (!nodes.length) return null

  return (
    <div className={className}>
      <p className="mono-label mb-3">Architecture flow</p>
      <ol className="mx-auto flex max-w-sm flex-col items-center text-center">
        {nodes.map((node, index) => (
          <li key={node.id} className="flex w-full flex-col items-center">
            {index > 0 && (
              <div
                aria-hidden="true"
                className="flex flex-col items-center py-3"
              >
                <span className="h-5 w-px bg-border" />
                <span className="text-sm leading-none text-accent">↓</span>
              </div>
            )}
            <p className="mono-label">{node.type}</p>
            <p className="mt-1 break-words text-base font-medium text-foreground">
              {node.label}
            </p>
          </li>
        ))}
      </ol>
    </div>
  )
}
