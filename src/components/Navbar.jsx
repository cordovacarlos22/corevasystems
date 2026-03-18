export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-slate-50 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-8">
        <div className="flex items-center gap-3">
          <div className="gradient-soft flex size-9 items-center justify-center rounded-lg text-white shadow-sm">
            <span className="text-xl font-bold">C</span>
          </div>
          <span className="text-xl font-bold tracking-tight">Coreva Systems</span>
        </div>

        <div className="hidden items-center gap-10 text-[13px] font-semibold uppercase tracking-wider text-slate-500 lg:flex">
          <a className="transition-colors hover:text-primary" href="#process">
            Process
          </a>
          <a className="transition-colors hover:text-primary" href="#packages">
            Services
          </a>
          <a className="transition-colors hover:text-primary" href="#results">
            Results
          </a>
          <a className="transition-colors hover:text-primary" href="#contact">
            Contact
          </a>
        </div>

        <div>
          <button className="gradient-soft rounded-full px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/10 transition-all hover:opacity-90">
            Book a Free Call
          </button>
        </div>
      </div>
    </nav>
  );
}