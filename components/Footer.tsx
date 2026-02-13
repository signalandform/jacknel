export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 text-sm text-contrast/60 sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} Jack Nelson</span>
        <span>Built with Next.js</span>
      </div>
    </footer>
  );
}
