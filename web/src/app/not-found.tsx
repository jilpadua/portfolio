import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="section-padding">
      <div className="container-main max-w-xl">
        <p className="mono-label mb-3">404</p>
        <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
        <p className="mt-3 text-muted">
          The page you are looking for does not exist or may have moved.
        </p>
        <Link href="/" className="mt-6 inline-block text-sm font-medium text-accent hover:underline">
          Back to homepage
        </Link>
      </div>
    </section>
  )
}
