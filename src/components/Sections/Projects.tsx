'use client';

export default function Projects({ data }: any) {
  return (
    <section id="projects" className="bg-gray-800 text-white py-24">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold mb-12 text-center">Projects</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data.items?.map((project: any) => (
            <div key={project._id} className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-300">{project.description}</p>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 mt-2 inline-block"
                >
                  View Project
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
