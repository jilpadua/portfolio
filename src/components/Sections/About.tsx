'use client'

type AboutProps = {
  data: {
    headline: string
    summary: string
    focus?: string[]
    careerGoal?: string
  } | null
}

export default function About({ data }: AboutProps) {
  if (!data) return null

  return (
    <section
      id="about"
      className="bg-gray-900 text-white py-20"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Section title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          {data.headline}
        </h2>

        {/* Summary */}
        <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-10">
          {data.summary}
        </p>

        {/* Focus + Goal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Current Focus */}
          {data.focus && data.focus.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Current Focus
              </h3>
              <ul className="space-y-2 text-gray-300">
                {data.focus.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Career Goal */}
          {data.careerGoal && (
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Career Goal
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {data.careerGoal}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
