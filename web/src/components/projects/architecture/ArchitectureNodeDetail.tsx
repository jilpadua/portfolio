import type { ArchitectureNode } from '@/lib/sanity/types'
import { ARCHITECTURE_NODE_TYPE_LABELS } from '@/lib/case-study'

type ArchitectureNodeDetailProps = {
  node: ArchitectureNode | null
  relatedLabels?: string[]
  matchedContributions?: string[]
  derivedTechnology?: string | null
}

export function ArchitectureNodeDetail({
  node,
  relatedLabels,
  matchedContributions,
  derivedTechnology,
}: ArchitectureNodeDetailProps) {
  if (!node) {
    return (
      <div className="rounded-md border border-dashed border-border bg-background/60 p-5">
        <p className="mono-label">Explore the architecture</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Select a component to inspect how it fits into the system.
        </p>
        <p className="mt-4 mono-label mb-2">You can explore</p>
        <ul className="space-y-1.5 text-sm text-muted">
          <li className="flex gap-2">
            <span className="text-accent" aria-hidden="true">
              •
            </span>
            <span>What the component is</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent" aria-hidden="true">
              •
            </span>
            <span>Its technology</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent" aria-hidden="true">
              •
            </span>
            <span>Connected systems</span>
          </li>
          <li className="flex gap-2">
            <span className="text-accent" aria-hidden="true">
              •
            </span>
            <span>Relevant contribution</span>
          </li>
        </ul>
      </div>
    )
  }

  const technology = node.technology || derivedTechnology || null

  return (
    <article className="rounded-md border border-border bg-surface p-5">
      <h3 className="text-lg font-semibold tracking-tight">{node.label}</h3>
      <p className="mt-1 mono-label">{ARCHITECTURE_NODE_TYPE_LABELS[node.type]}</p>

      {technology && (
        <div className="mt-4">
          <p className="mono-label mb-2">Technology</p>
          <p className="font-mono text-sm text-muted">{technology}</p>
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

      {matchedContributions?.length ? (
        <div className="mt-4">
          <p className="mono-label mb-2">Your contribution</p>
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
    </article>
  )
}
