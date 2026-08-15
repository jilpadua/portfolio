'use client'

import dynamic from 'next/dynamic'
import { useEffect, useRef, useState } from 'react'
import type { ArchitectureGraph, TechGroup } from '@/lib/sanity/types'

const ArchitectureExplorer = dynamic(
  () =>
    import('./ArchitectureExplorer').then((module) => ({
      default: module.ArchitectureExplorer,
    })),
  {
    loading: () => (
      <div className="rounded-md border border-border bg-surface/60 p-6 text-sm text-muted">
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
  const [hasSelection, setHasSelection] = useState(false)
  const [selectionEpoch, setSelectionEpoch] = useState(0)

  useEffect(() => {
    if (!open) {
      setHasSelection(false)
      setSelectionEpoch(0)
    }
  }, [open])

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
        if (hasSelection) {
          setSelectionEpoch((value) => value + 1)
          setHasSelection(false)
          return
        }
        onClose()
      }}
    >
      <div className="flex min-h-full items-end justify-center p-0 md:items-center md:p-6">
        <div className="flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-none border border-border bg-background shadow-xl md:rounded-lg">
          <div className="flex items-center justify-between border-b border-border px-4 py-3 md:px-6">
            <h2 className="text-base font-semibold tracking-tight">Architecture Explorer</h2>
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm transition-colors hover:bg-background"
            >
              Close
            </button>
          </div>
          <div className="overflow-y-auto px-4 py-4 md:px-6 md:py-5">
            {open ? (
              <ArchitectureExplorer
                graph={graph}
                projectTitle={projectTitle}
                contributions={contributions}
                techGroups={techGroups}
                clearSelectionSignal={selectionEpoch}
                onSelectionChange={setHasSelection}
              />
            ) : null}
          </div>
        </div>
      </div>
    </dialog>
  )
}
