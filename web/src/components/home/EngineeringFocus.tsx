import { SectionHeading } from '@/components/ui/SectionHeading'
import { CATEGORY_LABELS } from '@/lib/utils'
import type { SkillGroup as SkillGroupType } from '@/lib/sanity/types'

type EngineeringFocusProps = {
  groups: SkillGroupType[]
}

export function EngineeringFocus({ groups }: EngineeringFocusProps) {
  if (!groups.length) return null

  return (
    <section id="engineering" className="section-padding border-t border-border">
      <div className="container-main">
        <SectionHeading
          eyebrow="Technical focus"
          title="Engineering"
          description="Technologies organized by capability, with a clear backend emphasis."
        />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <div key={group._id}>
              <h3 className="mono-label mb-3">
                {group.label ?? CATEGORY_LABELS[group.category] ?? group.category}
              </h3>
              <p className="text-base leading-relaxed">
                {group.technologies?.join(' · ')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
