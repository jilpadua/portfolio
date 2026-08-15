import type { ArchitectureConnection, ArchitectureGraph, ArchitectureNode } from '@/lib/sanity/types'

export function getOrderedNodes(graph: ArchitectureGraph): ArchitectureNode[] {
  const nodes = graph.nodes ?? []
  if (!nodes.length) return []

  const connections = graph.connections ?? []
  if (!connections.length) return nodes

  const incoming = new Map<string, number>()
  for (const node of nodes) incoming.set(node.id, 0)
  for (const connection of connections) {
    incoming.set(connection.to, (incoming.get(connection.to) ?? 0) + 1)
  }

  const roots = nodes.filter((node) => (incoming.get(node.id) ?? 0) === 0)
  const startNodes = roots.length ? roots : [nodes[0]]
  const visited = new Set<string>()
  const ordered: ArchitectureNode[] = []

  const adjacency = new Map<string, string[]>()
  for (const connection of connections) {
    const list = adjacency.get(connection.from) ?? []
    list.push(connection.to)
    adjacency.set(connection.from, list)
  }

  function visit(nodeId: string) {
    if (visited.has(nodeId)) return
    visited.add(nodeId)
    const node = nodes.find((item) => item.id === nodeId)
    if (node) ordered.push(node)
    for (const nextId of adjacency.get(nodeId) ?? []) {
      visit(nextId)
    }
  }

  for (const root of startNodes) {
    visit(root.id)
  }

  for (const node of nodes) {
    if (!visited.has(node.id)) ordered.push(node)
  }

  return ordered
}

export function getConnectedNodeIds(
  nodeId: string,
  connections: ArchitectureConnection[],
): Set<string> {
  const related = new Set<string>([nodeId])
  for (const connection of connections) {
    if (connection.from === nodeId) related.add(connection.to)
    if (connection.to === nodeId) related.add(connection.from)
  }
  return related
}

export function formatArchitectureTextFlow(graph: ArchitectureGraph): string[] {
  return getOrderedNodes(graph).map((node) => node.label)
}
