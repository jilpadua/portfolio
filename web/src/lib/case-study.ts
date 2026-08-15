import type {
  ArchitectureGraph,
  ArchitectureNode,
  CaseStudySectionId,
  ImplementationSection,
  Project,
  TechnicalChallenge,
  TechnicalDecision,
} from '@/lib/sanity/types'
import { formatArchitectureTextFlow } from '@/lib/architecture-graph'

export const CASE_STUDY_SECTION_LABELS: Record<CaseStudySectionId, string> = {
  overview: 'Overview',
  problem: 'Problem',
  architecture: 'Architecture',
  implementation: 'Implementation',
  challenges: 'Challenges',
  contribution: 'Contribution',
  outcome: 'Outcome',
  technologies: 'Technologies',
}

export function slugifyId(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export function inferNodeType(label: string): ArchitectureNode['type'] {
  const lower = label.toLowerCase()
  if (lower.includes('app') || lower.includes('client') || lower.includes('flutter')) {
    return 'client'
  }
  if (lower.includes('gateway') || lower.includes('api')) {
    return 'gateway'
  }
  if (lower.includes('database') || lower.includes('db') || lower.includes('mongo') || lower.includes('sql')) {
    return 'database'
  }
  if (lower.includes('device') || lower.includes('external') || lower.includes('hardware')) {
    return 'external'
  }
  return 'service'
}

export function architectureStepsToGraph(steps: string[]): ArchitectureGraph {
  const nodes: ArchitectureNode[] = steps.map((label, index) => ({
    id: slugifyId(label) || `node-${index}`,
    label,
    type: inferNodeType(label),
  }))

  const connections = nodes.slice(0, -1).map((node, index) => ({
    from: node.id,
    to: nodes[index + 1].id,
  }))

  return { nodes, connections }
}

export function resolveArchitectureGraph(project: Project): ArchitectureGraph | null {
  const graph = project.architectureGraph
  if (graph?.nodes?.length) {
    return graph
  }
  if (project.architecture?.length) {
    return architectureStepsToGraph(project.architecture)
  }
  return null
}

export function hasImplementationContent(
  implementation?: ImplementationSection[],
  decisions?: TechnicalDecision[],
): boolean {
  if (implementation?.some((section) => section.title || section.summary || section.steps?.length)) {
    return true
  }
  return Boolean(decisions?.some((decision) => decision.title || decision.rationale))
}

export function hasChallengeContent(challenges?: TechnicalChallenge[]): boolean {
  return Boolean(
    challenges?.some(
      (challenge) =>
        challenge.problem ||
        challenge.investigation ||
        challenge.solution ||
        challenge.result,
    ),
  )
}

export function getCaseStudySections(project: Project): CaseStudySectionId[] {
  const sections: CaseStudySectionId[] = []
  const graph = resolveArchitectureGraph(project)

  if (project.overview || project.audience) sections.push('overview')
  if (project.problem) sections.push('problem')
  if (
    project.role ||
    project.contribution?.length ||
    project.contributionGroups?.some((group) => group.items?.length)
  ) {
    sections.push('contribution')
  }
  if (project.techGroups?.length) sections.push('technologies')
  if (graph?.nodes?.length) sections.push('architecture')
  if (hasImplementationContent(project.implementation, project.technicalDecisions)) {
    sections.push('implementation')
  }
  if (hasChallengeContent(project.technicalChallenges)) sections.push('challenges')
  if (project.outcomes?.length) sections.push('outcome')

  return sections
}

function tokenize(value: string): string[] {
  return value
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length >= 4)
}

export function matchContributionsToNode(
  node: ArchitectureNode,
  contributions?: string[],
): string[] {
  if (!contributions?.length) return []

  const labelLower = node.label.toLowerCase()
  const nodeTokens = tokenize(node.label)
  const matches = new Set<string>()

  for (const contribution of contributions) {
    const contributionLower = contribution.toLowerCase()
    const contributionTokens = tokenize(contribution)

    const labelInContribution = nodeTokens.some((token) => contributionLower.includes(token))
    const contributionInLabel = contributionTokens.some((token) => labelLower.includes(token))

    const keywordPairs: Array<[string[], string[]]> = [
      [['booking'], ['booking', 'reservation']],
      [['hardware'], ['hardware', 'bollard', 'device']],
      [['graphql', 'gateway'], ['graphql']],
      [['parking'], ['parking', 'slot']],
      [['flutter', 'app'], ['flutter', 'mobile']],
    ]

    let keywordMatch = false
    for (const [labelKeys, contributionKeys] of keywordPairs) {
      const labelHit = labelKeys.some((key) => labelLower.includes(key))
      const contributionHit = contributionKeys.some((key) => contributionLower.includes(key))
      if (labelHit && contributionHit) {
        keywordMatch = true
        break
      }
    }

    if (keywordMatch || labelInContribution || contributionInLabel) {
      matches.add(contribution)
    }
  }

  return Array.from(matches)
}

export { formatArchitectureTextFlow }

export const FOCUS_AREA_LABELS: Record<string, string> = {
  backend: 'Backend',
  api: 'APIs',
  database: 'Databases',
  frontend: 'Frontend',
  mobile: 'Mobile',
}

export const ARCHITECTURE_NODE_TYPE_LABELS: Record<ArchitectureNode['type'], string> = {
  client: 'Client',
  gateway: 'API / Gateway',
  service: 'Service',
  database: 'Database',
  external: 'External System',
}

export function deriveFocusAreasFromTechGroups(
  techGroups?: { category: string; technologies?: string[] }[],
): string[] {
  if (!techGroups?.length) return []

  const areas = new Set<string>()
  for (const group of techGroups) {
    if (group.category) areas.add(group.category)
    const techs = group.technologies?.join(' ').toLowerCase() ?? ''
    if (techs.includes('flutter')) areas.add('mobile')
  }
  return Array.from(areas)
}
