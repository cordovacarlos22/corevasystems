import Link from "next/link";

export default function Footer({ dict, lang = "en" }) {
  const footer = dict?.footer || {
    brand: "Coreva Systems",
    description:
      "We build systems that generate predictable growth. Automation + websites designed to scale your business.",
    columns: {
      services: "Services",
      resources: "Resources",
      contact: "Contact",
      legal: "Legal",
    },
    links: {
      websites: "Websites",
      automation: "Automation",
      seo: "SEO Systems",
      faq: "FAQ",
      caseStudies: "Case Studies",
      emailUs: "Email Us",
      contactForm: "Contact Form",
      privacy: "Privacy",
      terms: "Terms",
    },
    copyright: "© 2024 COREVA SYSTEMS. ALL RIGHTS RESERVED.",
    tagline: "Engineered for Performance. Built for Growth.",
  };

  return (
    <footer className="bg-dark-navy py-24 text-white">
      <div className="mx-auto max-w-7xl px-8">
        <div className="mb-20 grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-24">
          <div className="lg:col-span-5">
            <h4 className="text-gradient mb-6 text-3xl font-bold">
              {footer.brand}
            </h4>

            <p className="mb-8 max-w-md text-lg leading-relaxed text-slate-400">
              {footer.description}
            </p>

            <div className="flex gap-4">
              <Link
                href={`/${lang}`}
                className="flex size-10 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-primary"
              >
                <span className="text-xl">🌐</span>
              </Link>

              <a
                href="mailto:hello@corevasystems.com"
                className="flex size-10 items-center justify-center rounded-full bg-white/5 transition-colors hover:bg-primary"
              >
                <span className="text-xl">@</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12 md:grid-cols-4 lg:col-span-7">
            <div>
              <h5 className="mb-8 text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                {footer.columns.services}
              </h5>
              <ul className="space-y-4 text-sm font-medium text-slate-400">
                <li>
                  <Link
                    href={`/${lang}#services`}
                    className="transition-colors hover:text-primary"
                  >
                    {footer.links.websites}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${lang}#services`}
                    className="transition-colors hover:text-primary"
                  >
                    {footer.links.automation}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${lang}#services`}
                    className="transition-colors hover:text-primary"
                  >
                    {footer.links.seo}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="mb-8 text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                {footer.columns.resources}
              </h5>
              <ul className="space-y-4 text-sm font-medium text-slate-400">
                <li>
                  <Link
                    href={`/${lang}#faq`}
                    className="transition-colors hover:text-primary"
                  >
                    {footer.links.faq}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${lang}#results`}
                    className="transition-colors hover:text-primary"
                  >
                    {footer.links.caseStudies}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="mb-8 text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                {footer.columns.contact}
              </h5>
              <ul className="space-y-4 text-sm font-medium text-slate-400">
                <li>
                  <a
                    href="mailto:hello@corevasystems.com"
                    className="transition-colors hover:text-primary"
                  >
                    {footer.links.emailUs}
                  </a>
                </li>
                <li>
                  <Link
                    href={`/${lang}#contact`}
                    className="transition-colors hover:text-primary"
                  >
                    {footer.links.contactForm}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="mb-8 text-[11px] font-bold uppercase tracking-[0.2em] text-white">
                {footer.columns.legal}
              </h5>
              <ul className="space-y-4 text-sm font-medium text-slate-400">
                <li>
                  <Link
                    href={`/${lang}/privacy`}
                    className="transition-colors hover:text-primary"
                  >
                    {footer.links.privacy}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${lang}/terms`}
                    className="transition-colors hover:text-primary"
                  >
                    {footer.links.terms}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center border-t border-white/5 pt-16">
          <div className="mb-4 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
            {footer.copyright}
          </div>
          <div className="text-xs font-medium text-slate-600">
            {footer.tagline}
          </div>
        </div>
      </div>
    </footer>
  );
}