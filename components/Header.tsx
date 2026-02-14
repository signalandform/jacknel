import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-contrast/10 bg-base/70 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-semibold tracking-tight">
          jack nelson
        </Link>
        <nav className="flex items-center gap-6 text-sm text-contrast/70 hover:[&>a]:text-contrast">
          <Link href="#portfolio">Portfolio</Link>
          <Link href="#contact">contact me</Link>
          <Link href="https://thingsonstuff.store" target="_blank" rel="noopener noreferrer">
            things on stuff
          </Link>
        </nav>
      </div>
    </header>
  );
}
