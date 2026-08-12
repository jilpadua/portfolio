type ArchitectureDiagramProps = {
  steps?: string[]
}

export function ArchitectureDiagram({ steps }: ArchitectureDiagramProps) {
  if (!steps?.length) return null

  return (
    <section className="section-padding border-b border-border">
      <div className="container-main max-w-3xl">
        <h2 className="mono-label mb-6">Architecture</h2>
        <ol className="space-y-0">
          {steps.map((step, index) => (
            <li key={`${step}-${index}`} className="relative">
              <div className="flex items-stretch gap-4">
                <div className="flex w-8 flex-col items-center">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface font-mono text-xs">
                    {index + 1}
                  </span>
                  {index < steps.length - 1 && (
                    <span className="my-1 w-px flex-1 bg-border" aria-hidden="true" />
                  )}
                </div>
                <div className="pb-6 pt-1">
                  <p className="font-mono text-sm leading-relaxed md:text-base">{step}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
