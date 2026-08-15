import type { ArchitectureGraph, ArchitectureNode } from '@/lib/sanity/types'
import { getConnectedNodeIds, getOrderedNodes } from '@/lib/architecture-graph'

export const NODE_WIDTH = 208
export const NODE_HEIGHT = 58
export const NODE_GAP_Y = 28
export const NODE_GAP_X = 72

export type LayoutNode = ArchitectureNode & {
  x: number
  y: number
}

export { getConnectedNodeIds, getOrderedNodes }

export function computeVerticalLayout(graph: ArchitectureGraph): LayoutNode[] {
  const ordered = getOrderedNodes(graph)
  const centerX = NODE_WIDTH / 2

  return ordered.map((node, index) => ({
    ...node,
    x: centerX,
    y: index * (NODE_HEIGHT + NODE_GAP_Y) + NODE_HEIGHT / 2,
  }))
}

export function getCanvasSize(layout: LayoutNode[]) {
  if (!layout.length) {
    return { width: NODE_WIDTH, height: NODE_HEIGHT }
  }

  const maxY = Math.max(...layout.map((node) => node.y))
  return {
    width: NODE_WIDTH + 48,
    height: maxY + NODE_HEIGHT / 2 + 24,
  }
}
