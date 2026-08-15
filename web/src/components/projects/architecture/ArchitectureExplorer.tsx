'use client'

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from 'react'
import {
  deriveNodeTechnology,
  matchContributionsToNode,
} from '@/lib/case-study'
import type { ArchitectureGraph, ArchitectureNode, TechGroup } from '@/lib/sanity/types'
import { ArchitectureLegend } from './ArchitectureLegend'
import { ArchitectureNodeDetail } from './ArchitectureNodeDetail'
import { ArchitectureTextFlow } from './ArchitectureTextFlow'
import {
  computeVerticalLayout,
  getCanvasSize,
  getConnectedNodeIds,
  getOrderedNodes,
  NODE_HEIGHT,
  NODE_WIDTH,
  type LayoutNode,
} from './layout'

type ArchitectureExplorerProps = {
  graph: ArchitectureGraph
  projectTitle: string
  contributions?: string[]
  techGroups?: TechGroup[]
  clearSelectionSignal?: number
  onSelectionChange?: (hasSelection: boolean) => void
}

const MIN_SCALE = 0.75
const MAX_SCALE = 1.5
const SCALE_STEP = 0.15

export function ArchitectureExplorer({
  graph,
  projectTitle,
  contributions,
  techGroups,
  clearSelectionSignal = 0,
  onSelectionChange,
}: ArchitectureExplorerProps) {
  const nodes = graph.nodes ?? []
  const connections = graph.connections ?? []
  const layout = useMemo(() => computeVerticalLayout(graph), [graph])
  const canvasSize = useMemo(() => getCanvasSize(layout), [layout])
  const orderedNodes = useMemo(() => getOrderedNodes(graph), [graph])

  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [scale, setScale] = useState(1)
  const [pan, setPan] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const panOrigin = useRef({ x: 0, y: 0, panX: 0, panY: 0 })
  const viewportRef = useRef<HTMLDivElement>(null)

  const selectedNode = nodes.find((node) => node.id === selectedId) ?? null
  const connectedIds = selectedId
    ? getConnectedNodeIds(selectedId, connections)
    : new Set<string>()

  useEffect(() => {
    if (clearSelectionSignal > 0) {
      setSelectedId(null)
    }
  }, [clearSelectionSignal])

  useEffect(() => {
    onSelectionChange?.(selectedId !== null)
  }, [onSelectionChange, selectedId])

  const relatedLabels = useMemo(() => {
    if (!selectedId) return []
    return Array.from(connectedIds)
      .filter((id) => id !== selectedId)
      .map((id) => nodes.find((node) => node.id === id)?.label)
      .filter((label): label is string => Boolean(label))
  }, [connectedIds, nodes, selectedId])

  const matchedContributions = useMemo(() => {
    if (!selectedNode) return []
    return matchContributionsToNode(selectedNode, contributions)
  }, [contributions, selectedNode])

  const derivedTechnology = useMemo(() => {
    if (!selectedNode) return null
    return deriveNodeTechnology(selectedNode, techGroups)
  }, [selectedNode, techGroups])

  const selectNode = useCallback((nodeId: string) => {
    setSelectedId((current) => (current === nodeId ? null : nodeId))
  }, [])

  const resetView = useCallback(() => {
    setScale(1)
    setPan({ x: 0, y: 0 })
  }, [])

  const fitView = useCallback(() => {
    const viewport = viewportRef.current
    if (!viewport) return

    const padding = 24
    const scaleX = (viewport.clientWidth - padding * 2) / canvasSize.width
    const scaleY = (viewport.clientHeight - padding * 2) / canvasSize.height
    const nextScale = Math.min(Math.max(Math.min(scaleX, scaleY), MIN_SCALE), 1)
    setScale(nextScale)
    setPan({ x: 0, y: 0 })
  }, [canvasSize.height, canvasSize.width])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (!orderedNodes.length) return
      const currentIndex = selectedId
        ? orderedNodes.findIndex((node) => node.id === selectedId)
        : -1

      if (event.key === 'ArrowDown') {
        event.preventDefault()
        const next = orderedNodes[Math.min(currentIndex + 1, orderedNodes.length - 1)]
        if (next) setSelectedId(next.id)
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault()
        const next = orderedNodes[Math.max(currentIndex - 1, 0)]
        if (next) setSelectedId(next.id)
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [orderedNodes, selectedId])

  function onPointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (window.matchMedia('(max-width: 767px)').matches) return
    if ((event.target as HTMLElement).closest('[data-architecture-node]')) return

    setIsPanning(true)
    panOrigin.current = {
      x: event.clientX,
      y: event.clientY,
      panX: pan.x,
      panY: pan.y,
    }
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!isPanning) return
    setPan({
      x: panOrigin.current.panX + (event.clientX - panOrigin.current.x),
      y: panOrigin.current.panY + (event.clientY - panOrigin.current.y),
    })
  }

  function onPointerUp(event: React.PointerEvent<HTMLDivElement>) {
    setIsPanning(false)
    event.currentTarget.releasePointerCapture(event.pointerId)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="mono-label">Architecture explorer · {projectTitle}</p>
        <div className="hidden flex-wrap gap-2 md:flex">
          <ControlButton label="Reset view" onClick={resetView} />
          <ControlButton
            label="Zoom out"
            onClick={() => setScale((value) => Math.max(value - SCALE_STEP, MIN_SCALE))}
          />
          <ControlButton
            label="Zoom in"
            onClick={() => setScale((value) => Math.min(value + SCALE_STEP, MAX_SCALE))}
          />
          <ControlButton label="Fit architecture" onClick={fitView} />
        </div>
      </div>

      <ArchitectureTextFlow
        graph={graph}
        className="rounded-md border border-border bg-surface/60 p-4"
      />

      <div className="grid gap-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div
          ref={viewportRef}
          className="relative min-h-[320px] overflow-hidden rounded-md border border-border bg-background/70 md:min-h-[420px] md:cursor-grab md:active:cursor-grabbing"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          aria-label="Interactive architecture diagram"
        >
          <div
            className="absolute inset-0 hidden origin-center transition-transform duration-200 motion-reduce:transition-none md:block"
            style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})` }}
          >
            <DesktopDiagram
              layout={layout}
              connections={connections}
              canvasSize={canvasSize}
              selectedId={selectedId}
              connectedIds={connectedIds}
              onSelect={selectNode}
            />
          </div>

          <div className="p-4 md:hidden">
            <MobileDiagram
              layout={layout}
              selectedId={selectedId}
              connectedIds={connectedIds}
              onSelect={selectNode}
            />
          </div>
        </div>

        <ArchitectureNodeDetail
          node={selectedNode}
          relatedLabels={relatedLabels}
          matchedContributions={matchedContributions}
          derivedTechnology={derivedTechnology}
        />
      </div>

      <ArchitectureLegend />

      <div className="sr-only" aria-live="polite">
        {selectedNode
          ? `Selected ${selectedNode.label}. ${relatedLabels.length ? `Connected systems: ${relatedLabels.join(', ')}` : ''}${matchedContributions.length ? `. Your contribution: ${matchedContributions.join(', ')}` : ''}`
          : 'No component selected'}
      </div>
    </div>
  )
}

function DesktopDiagram({
  layout,
  connections,
  canvasSize,
  selectedId,
  connectedIds,
  onSelect,
}: {
  layout: LayoutNode[]
  connections: ArchitectureGraph['connections']
  canvasSize: { width: number; height: number }
  selectedId: string | null
  connectedIds: Set<string>
  onSelect: (nodeId: string) => void
}) {
  const nodeMap = new Map(layout.map((node) => [node.id, node]))

  return (
    <div
      className="relative mx-auto"
      style={{ width: canvasSize.width, height: canvasSize.height }}
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
        viewBox={`0 0 ${canvasSize.width} ${canvasSize.height}`}
      >
        {(connections ?? []).map((connection) => {
          const from = nodeMap.get(connection.from)
          const to = nodeMap.get(connection.to)
          if (!from || !to) return null

          const isHighlighted =
            Boolean(selectedId) &&
            (connection.from === selectedId || connection.to === selectedId)

          return (
            <line
              key={`${connection.from}-${connection.to}`}
              x1={from.x}
              y1={from.y + NODE_HEIGHT / 2}
              x2={to.x}
              y2={to.y - NODE_HEIGHT / 2}
              stroke={isHighlighted ? 'var(--accent)' : 'var(--border)'}
              strokeWidth={isHighlighted ? 2 : 1.5}
              markerEnd="url(#arrowhead)"
            />
          )
        })}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="8"
            markerHeight="8"
            refX="4"
            refY="4"
            orient="auto"
          >
            <path d="M0,0 L8,4 L0,8 Z" fill="var(--border)" />
          </marker>
        </defs>
      </svg>

      {layout.map((node) => {
        const selected = selectedId === node.id
        const neighbor = Boolean(selectedId) && !selected && connectedIds.has(node.id)
        const dimmed = Boolean(selectedId && !connectedIds.has(node.id))

        return (
          <NodeButton
            key={node.id}
            node={node}
            selected={selected}
            neighbor={neighbor}
            dimmed={dimmed}
            onSelect={onSelect}
            style={{
              left: node.x - NODE_WIDTH / 2,
              top: node.y - NODE_HEIGHT / 2,
              width: NODE_WIDTH,
              height: NODE_HEIGHT,
            }}
            className="absolute"
          />
        )
      })}
    </div>
  )
}

function MobileDiagram({
  layout,
  selectedId,
  connectedIds,
  onSelect,
}: {
  layout: LayoutNode[]
  selectedId: string | null
  connectedIds: Set<string>
  onSelect: (nodeId: string) => void
}) {
  return (
    <ol className="space-y-3">
      {layout.map((node, index) => {
        const selected = selectedId === node.id
        const neighbor = Boolean(selectedId) && !selected && connectedIds.has(node.id)
        const dimmed = Boolean(selectedId && !connectedIds.has(node.id))

        return (
          <li key={node.id} className="relative">
            <NodeButton
              node={node}
              selected={selected}
              neighbor={neighbor}
              dimmed={dimmed}
              onSelect={onSelect}
              className="w-full"
            />
            {index < layout.length - 1 && (
              <div className="flex justify-center py-1" aria-hidden="true">
                <span className="font-mono text-xs text-muted">↓</span>
              </div>
            )}
          </li>
        )
      })}
    </ol>
  )
}

function NodeButton({
  node,
  selected,
  neighbor,
  dimmed,
  onSelect,
  className = '',
  style,
}: {
  node: ArchitectureNode
  selected: boolean
  neighbor: boolean
  dimmed: boolean
  onSelect: (nodeId: string) => void
  className?: string
  style?: CSSProperties
}) {
  return (
    <button
      type="button"
      data-architecture-node
      aria-pressed={selected}
      aria-label={`${node.label}, ${node.type}${selected ? ', selected' : neighbor ? ', connected' : ''}`}
      onClick={() => onSelect(node.id)}
      style={style}
      className={`rounded-md border bg-surface px-3 py-2 text-left transition-[opacity,transform,border-color,box-shadow] duration-200 motion-reduce:transition-none architecture-node-${node.type} ${
        selected
          ? 'border-accent ring-2 ring-accent/25 shadow-sm'
          : neighbor
            ? 'border-accent/60 ring-1 ring-accent/15'
            : 'border-border hover:border-accent/40'
      } ${dimmed ? 'opacity-40' : 'opacity-100'} ${className}`}
    >
      <span className="block font-mono text-[10px] uppercase tracking-wide text-muted">
        {node.type}
      </span>
      <span className="mt-0.5 block text-sm font-medium leading-snug">{node.label}</span>
      {selected && (
        <span className="mt-1 block font-mono text-[10px] uppercase tracking-wide text-accent">
          Selected
        </span>
      )}
    </button>
  )
}

function ControlButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs transition-colors hover:bg-background"
    >
      {label}
    </button>
  )
}
