'use client'

import { useState } from 'react'
import { resolveArchitectureGraph } from '@/lib/case-study'
import type { Project } from '@/lib/sanity/types'
import { ArchitectureTextFlow } from './architecture/ArchitectureTextFlow'
import { ArchitectureExplorerDialog } from './architecture/ArchitectureExplorerDialog'

type ArchitectureSectionProps = {
  project: Project
}

export function ArchitectureSection({ project }: ArchitectureSectionProps) {
  const graph = resolveArchitectureGraph(project)
  const [explorerOpen, setExplorerOpen] = useState(false)

  if (!graph?.nodes?.length) return null

  const hasInteractiveGraph = Boolean(project.architectureGraph?.nodes?.length)

  return (
    <>
      <section
        id="architecture"
        className="case-study-section section-padding border-b border-border"
      >
        <div className="container-main max-w-3xl">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="mono-label">Architecture</h2>
            {hasInteractiveGraph && (
              <button
                type="button"
                className="rounded-md border border-accent bg-surface px-3 py-1.5 text-sm font-medium text-accent transition-colors hover:bg-accent hover:text-accent-foreground"
                onClick={() => setExplorerOpen(true)}
              >
                Explore Architecture
              </button>
            )}
          </div>

          {project.architectureGraph?.description && (
            <p className="mt-4 leading-relaxed text-muted">
              {project.architectureGraph.description}
            </p>
          )}

          <ArchitectureTextFlow graph={graph} className="mt-6" />
        </div>
      </section>

      {hasInteractiveGraph && project.architectureGraph && (
        <ArchitectureExplorerDialog
          graph={project.architectureGraph}
          projectTitle={project.title}
          contributions={project.contribution}
          techGroups={project.techGroups}
          open={explorerOpen}
          onClose={() => setExplorerOpen(false)}
        />
      )}
    </>
  )
}
