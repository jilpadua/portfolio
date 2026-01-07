type FooterProps = {
  data: {
    socialLinks?: {
      label: string
      url: string
    }[]
  } | null
}

export default function Footer({ data }: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-400 py-10">
      <div className="max-w-7xl mx-auto px-6 text-center text-sm space-y-4">
        {/* Copyright */}
        <p>&copy; {currentYear} Jilmer Padua. All rights reserved.</p>

        {/* Social Links */}
        {data?.socialLinks && data.socialLinks.length > 0 && (
          <div className="flex justify-center gap-6 flex-wrap">
            {data.socialLinks.map((link, index) => (
              <a
                key={index}
                // Ensure full external URL, prepend https if missing
                href={link.url.startsWith('http') ? link.url : `https://${link.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors font-medium break-words"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </footer>
  )
}
