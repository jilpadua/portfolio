import type { ArchitectureGraph } from '@/lib/sanity/types'
import { getOrderedNodes } from '@/lib/architecture-graph'
import { ArchitectureNodeLogoIcon } from './architectureLogos'

type ArchitectureTextFlowProps = {
  graph: ArchitectureGraph
  className?: string
}

export function ArchitectureTextFlow({ graph, className = '' }: ArchitectureTextFlowProps) {
  const nodes = getOrderedNodes(graph)
  if (!nodes.length) return null

  return (
    <div className={className}>
      <p className="mono-label mb-6">Architecture flow</p>
      <ol className="flex flex-col items-center md:w-full md:flex-row md:items-start">
        {nodes.map((node, index) => {
          const isLast = index === nodes.length - 1

          return (
            <li
              key={node.id}
              className={`flex w-full max-w-[11rem] flex-col items-center text-center md:w-auto md:max-w-none md:flex-row md:items-start ${
                isLast ? 'md:flex-none' : 'md:grow'
              }`}
            >
              <div className="flex w-full flex-col items-center gap-1.5 md:w-auto md:shrink-0">
                <p className="mono-label">{node.type}</p>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-border bg-surface text-foreground">
                  <ArchitectureNodeLogoIcon logo={node.logo} />
                </span>
                <p className="max-w-[7.5rem] break-words text-sm font-medium text-foreground">
                  {node.label}
                </p>
              </div>
              {!isLast && (
                <>
                  <div
                    aria-hidden="true"
                    className="flex flex-col items-center py-3 md:hidden"
                  >
                    <span className="h-6 w-px bg-border" />
                    <span className="text-sm leading-none text-accent/80">↓</span>
                  </div>
                  <div
                    aria-hidden="true"
                    className="mt-6 hidden h-11 min-w-6 flex-1 items-center px-1 md:flex"
                  >
                    <span className="h-px min-w-6 flex-1 bg-border" />
                    <span className="text-sm leading-none text-accent/80">→</span>
                  </div>
                </>
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}
