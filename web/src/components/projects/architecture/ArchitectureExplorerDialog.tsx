'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef } from 'react'
import type { ArchitectureGraph, TechGroup } from '@/lib/sanity/types'

const ArchitectureExplorer = dynamic(
  () =>
    import('./ArchitectureExplorer').then((module) => ({
      default: module.ArchitectureExplorer,
    })),
  {
    loading: () => (
      <div className="flex h-full items-center justify-center p-6 text-sm text-muted">
        Loading architecture explorer…
      </div>
    ),
  },
)

type ArchitectureExplorerDialogProps = {
  graph: ArchitectureGraph
  projectTitle: string
  contributions?: string[]
  techGroups?: TechGroup[]
  open: boolean
  onClose: () => void
}

export function ArchitectureExplorerDialog({
  graph,
  projectTitle,
  contributions,
  techGroups,
  open,
  onClose,
}: ArchitectureExplorerDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const triggerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open && !dialog.open) {
      triggerRef.current = document.activeElement as HTMLElement
      dialog.showModal()
    }

    if (!open && dialog.open) {
      dialog.close()
      triggerRef.current?.focus()
    }
  }, [open])

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-[70] m-0 h-full max-h-none w-full max-w-none border-0 bg-transparent p-0 backdrop:bg-foreground/40"
      onClose={onClose}
      onCancel={(event) => {
        event.preventDefault()
        onClose()
      }}
    >
      <div className="flex h-full items-stretch justify-center p-0 md:items-center md:p-6">
        <div className="flex h-full max-h-none w-full max-w-6xl flex-col overflow-hidden border border-border bg-background shadow-xl md:h-[min(92vh,900px)] md:rounded-lg">
          <div className="flex shrink-0 items-center justify-between border-b border-border px-4 py-3 md:px-6">
            <h2 className="text-base font-semibold tracking-tight">Architecture Explorer</h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm transition-colors hover:bg-background"
            >
              Close
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto md:overflow-hidden">
            {open ? (
              <ArchitectureExplorer
                graph={graph}
                projectTitle={projectTitle}
                contributions={contributions}
                techGroups={techGroups}
              />
            ) : null}
          </div>
        </div>
      </div>
    </dialog>
  )
}
