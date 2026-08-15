import type { ArchitectureNode } from '@/lib/sanity/types'
import { ARCHITECTURE_NODE_TYPE_LABELS } from '@/lib/case-study'

type ArchitectureNodeDetailProps = {
  node: ArchitectureNode | null
  relatedLabels?: string[]
  matchedContributions?: string[]
}

export function ArchitectureNodeDetail({
  node,
  relatedLabels,
  matchedContributions,
}: ArchitectureNodeDetailProps) {
  if (!node) {
    return (
      <div className="rounded-md border border-dashed border-border bg-background/60 p-5">
        <p className="mono-label">Selected component</p>
        <p className="mt-2 text-sm text-muted">
          Select a component to inspect its role in the system.
        </p>
      </div>
    )
  }

  return (
    <article className="rounded-md border border-border bg-surface p-5">
      <p className="mono-label">{ARCHITECTURE_NODE_TYPE_LABELS[node.type]}</p>
      <h3 className="mt-2 text-lg font-semibold tracking-tight">{node.label}</h3>

      {node.technology && (
        <div className="mt-4">
          <p className="mono-label mb-2">Technology</p>
          <p className="font-mono text-sm text-muted">{node.technology}</p>
        </div>
      )}

      {node.purpose && (
        <div className="mt-4">
          <p className="mono-label mb-2">Purpose</p>
          <p className="text-sm leading-relaxed text-muted">{node.purpose}</p>
        </div>
      )}

      {node.responsibilities?.length ? (
        <div className="mt-4">
          <p className="mono-label mb-2">Responsibilities</p>
          <ul className="space-y-1.5 text-sm text-muted">
            {node.responsibilities.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-accent" aria-hidden="true">
                  •
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {relatedLabels?.length ? (
        <div className="mt-4">
          <p className="mono-label mb-2">Connected systems</p>
          <div className="flex flex-wrap gap-2">
            {relatedLabels.map((label) => (
              <span
                key={label}
                className="rounded-md border border-border bg-background px-2 py-1 text-xs text-muted"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {node.relatedApis?.length ? (
        <div className="mt-4">
          <p className="mono-label mb-2">Related APIs</p>
          <ul className="space-y-1.5 font-mono text-xs text-muted">
            {node.relatedApis.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {matchedContributions?.length ? (
        <div className="mt-4">
          <p className="mono-label mb-2">Your involvement</p>
          <ul className="space-y-1.5 text-sm text-muted">
            {matchedContributions.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-accent" aria-hidden="true">
                  •
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </article>
  )
}
