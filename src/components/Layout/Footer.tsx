export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-400 py-8">
      <div className="max-w-7xl mx-auto px-6 text-center text-sm">
        <p>&copy; {currentYear} Jilmer Padua. All rights reserved.</p>
      </div>
    </footer>
  )
}
