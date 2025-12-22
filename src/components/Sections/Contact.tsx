'use client';

export default function Contact({ data }: any) {
  return (
    <section id="contact" className="bg-gray-900 text-white py-24">
      <div className="container mx-auto px-6 max-w-2xl text-center">
        <h2 className="text-4xl font-bold mb-6">Contact</h2>
        <p className="text-gray-300 mb-6">{data?.description || 'Feel free to reach out via email!'}</p>
        {data?.email && (
          <a
            href={`mailto:${data.email}`}
            className="inline-block px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            Email Me
          </a>
        )}
      </div>
    </section>
  );
}
