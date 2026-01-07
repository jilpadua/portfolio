'use client'

type Experience = {
  company: string
  role: string
  startDate?: string
  endDate?: string
  description?: string
}

type ExperienceProps = {
  data: Experience[] | null
}

function formatDate(date?: string) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  })
}

export default function Experience({ data }: ExperienceProps) {
  if (!data || data.length === 0) return null

  return (
    <section id="experience" className="bg-gray-900 text-white py-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Experience
        </h2>

        {/* Timeline */}
        <div className="relative border-l border-gray-700">
          {data.map((item, index) => (
            <div key={index} className="relative pl-8 pb-10">
              {/* Dot */}
              <span className="absolute left-[-6px] top-1 w-3 h-3 rounded-full bg-blue-500" />

              {/* Content */}
              <div className="bg-gray-800/60 backdrop-blur-sm rounded-lg p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                  <h3 className="text-lg font-semibold">
                    {item.role}
                  </h3>
                  {(item.startDate || item.endDate) && (
                    <span className="text-sm text-gray-400">
                      {formatDate(item.startDate)}{' '}
                      {item.endDate ? `– ${formatDate(item.endDate)}` : '– Present'}
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-300 mb-2">
                  {item.company}
                </p>

                {item.description && (
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
