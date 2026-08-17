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
      <ol className="flex flex-col items-center md:flex-row md:items-start md:justify-center">
        {nodes.map((node, index) => (
          <li
            key={node.id}
            className="flex w-full max-w-[11rem] flex-col items-center text-center md:w-auto md:flex-row md:items-start"
          >
            {index > 0 && (
              <>
                <div
                  aria-hidden="true"
                  className="flex flex-col items-center py-3 md:hidden"
                >
                  <span className="h-5 w-px bg-border" />
                  <span className="text-sm leading-none text-accent">↓</span>
                </div>
                <div
                  aria-hidden="true"
                  className="mt-[1.625rem] hidden h-10 items-center px-2 md:flex"
                >
                  <span className="h-px w-5 bg-border" />
                  <span className="text-sm leading-none text-accent">→</span>
                </div>
              </>
            )}
            <div className="flex w-full flex-col items-center">
              <p className="mono-label">{node.type}</p>
              <span className="mt-2 flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface text-foreground">
                <ArchitectureNodeLogoIcon logo={node.logo} />
              </span>
              <p className="mt-2 break-words text-sm font-medium text-foreground">
                {node.label}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}
