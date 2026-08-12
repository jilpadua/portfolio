type SectionHeadingProps = {
  id?: string
  eyebrow?: string
  title: string
  description?: string
}

export function SectionHeading({ id, eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mb-10 max-w-2xl">
      {eyebrow && <p className="mono-label mb-3">{eyebrow}</p>}
      <h2 id={id} className="text-3xl font-semibold tracking-tight md:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base leading-relaxed text-muted md:text-lg">{description}</p>
      )}
    </div>
  )
}
