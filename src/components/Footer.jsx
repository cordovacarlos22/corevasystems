export default function Footer() {
  return (
    <footer className="bg-dark-navy py-24 text-white">
      <div className="mx-auto max-w-7xl px-8">
        <div className="mb-20 grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24">
          <div className="lg:col-span-5">
            <h4 className="text-gradient mb-6 text-3xl font-bold">
              Coreva Systems
            </h4>

            <p className="mb-8 max-w-md text-lg leading-relaxed text-slate-400">
              We build systems that generate predictable growth. Automation +
              websites designed to scale your business.
            </p>

            <div className="flex gap-4">
              <a
                href="#"
                className="flex size-10 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-primary"
              >
                <span className="text-xl">🌐</span>
              </a>
              <a
                href="#"
                className="flex size-10 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-primary"
              >
                <span className="text-xl">@</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12 md:grid-cols-4 lg:col-span-7">
            <div>
              <h5 className="mb-8 text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                Services
              </h5>
              <ul className="space-y-4 text-sm font-medium text-slate-400">
                <li>
                  <a href="#" className="transition-colors hover:text-primary">
                    Websites
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-primary">
                    Automation
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-primary">
                    SEO Systems
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="mb-8 text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                Resources
              </h5>
              <ul className="space-y-4 text-sm font-medium text-slate-400">
                <li>
                  <a href="#faq" className="transition-colors hover:text-primary">
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#results"
                    className="transition-colors hover:text-primary"
                  >
                    Case Studies
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="mb-8 text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                Contact
              </h5>
              <ul className="space-y-4 text-sm font-medium text-slate-400">
                <li>
                  <a
                    href="mailto:hello@corevasystems.com"
                    className="transition-colors hover:text-primary"
                  >
                    Email Us
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="transition-colors hover:text-primary"
                  >
                    Contact Form
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="mb-8 text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                Legal
              </h5>
              <ul className="space-y-4 text-sm font-medium text-slate-400">
                <li>
                  <a href="#" className="transition-colors hover:text-primary">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="transition-colors hover:text-primary">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center border-t border-white/5 pt-16">
          <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
            © 2026 COREVA SYSTEMS. ALL RIGHTS RESERVED.
          </div>
          <div className="text-xs font-medium text-slate-600">
            Engineered for Performance. Built for Growth.
          </div>
        </div>
      </div>
    </footer>
  );
}