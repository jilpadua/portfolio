export const CATEGORY_LABELS: Record<string, string> = {
  backend: 'Backend',
  api: 'API',
  database: 'Database',
  frontend: 'Frontend',
  tools: 'Tools',
}

export function formatDateRange(
  startDate?: string,
  endDate?: string,
  isCurrent?: boolean,
): string {
  const format = (date?: string) => {
    if (!date) return null
    const d = new Date(date)
    return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  const start = format(startDate)
  const end = isCurrent ? 'Present' : format(endDate)

  if (start && end) return `${start} — ${end}`
  if (start) return start
  if (end) return end
  return ''
}

export function flattenTechnologies(
  techGroups?: { category: string; technologies?: string[] }[],
): string {
  if (!techGroups?.length) return ''
  return techGroups
    .flatMap((g) => g.technologies ?? [])
    .filter(Boolean)
    .join(' · ')
}

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
}
