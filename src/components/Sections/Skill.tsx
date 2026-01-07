'use client'

type Skill = {
  name: string
  category: 'frontend' | 'backend' | 'database' | 'tools'
}

type SkillsProps = {
  data: Skill[] | null
}

const CATEGORY_LABELS: Record<Skill['category'], string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  tools: 'Tools',
}

export default function Skills({ data }: SkillsProps) {
  if (!data || data.length === 0) return null

  const groupedSkills = data.reduce<Record<string, Skill[]>>((acc, skill) => {
    acc[skill.category] = acc[skill.category] || []
    acc[skill.category].push(skill)
    return acc
  }, {})

  return (
    <section id="skills" className="bg-gray-900 text-white py-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          Skills
        </h2>

        {/* Skills grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {Object.entries(groupedSkills).map(([category, skills]) => (
            <div
              key={category}
              className="bg-gray-800/60 backdrop-blur-sm rounded-lg p-6"
            >
              <h3 className="text-lg font-semibold mb-4">
                {CATEGORY_LABELS[category as Skill['category']]}
              </h3>

              <ul className="flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <li
                    key={skill.name}
                    className="px-3 py-1 text-sm rounded-full bg-gray-700 text-gray-200"
                  >
                    {skill.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
