'use client';

interface ExperienceItem {
  _id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export default function Experience({
  data,
}: {
  data: ExperienceItem[];
}) {
  return (
    <section id="experience" className="bg-gray-900 text-white py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center">
          Experience
        </h2>

        <div className="space-y-8 max-w-3xl mx-auto">
          {data.map((item) => (
            <div key={item._id} className="border-l-2 border-blue-500 pl-6">
              <h3 className="text-xl font-semibold">
                {item.role} · {item.company}
              </h3>
              <span className="text-sm text-gray-400">
                {item.period}
              </span>
              <p className="mt-2 text-gray-300">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
