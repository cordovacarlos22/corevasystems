export default function ContactSection() {
  return (
    <section className="bg-slate-50/50 py-32" id="contact">
      <div className="mx-auto max-w-7xl px-8">
        <div className="mb-24 text-center">
          <div className="mb-6 inline-block rounded-full bg-primary/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary">
            RESERVE A SLOT
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Ready to start?
          </h2>
        </div>

        <div className="grid gap-20 lg:grid-cols-2">
          <div className="space-y-12">
            <div className="group flex gap-8">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-white text-primary shadow-sm transition-shadow group-hover:shadow-md">
                <span className="text-3xl">✉️</span>
              </div>
              <div>
                <h4 className="mb-2 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  Email our team
                </h4>
                <p className="text-2xl font-bold text-slate-900">
                  hello@corevasystems.com
                </p>
              </div>
            </div>

            <div className="group flex gap-8">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-white text-primary shadow-sm transition-shadow group-hover:shadow-md">
                <span className="text-3xl">📅</span>
              </div>
              <div>
                <h4 className="mb-2 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  Book a call
                </h4>
                <p className="text-2xl font-bold text-slate-900">
                  Schedule Strategy Session
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-slate-100 bg-white p-12 shadow-xl shadow-slate-200/50">
            <form className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full rounded-xl border-transparent bg-slate-50 p-4 text-sm font-medium transition-all focus:bg-white focus:ring-2 focus:ring-primary/20"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full rounded-xl border-transparent bg-slate-50 p-4 text-sm font-medium transition-all focus:bg-white focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <input
                type="text"
                placeholder="Company Name"
                className="w-full rounded-xl border-transparent bg-slate-50 p-4 text-sm font-medium transition-all focus:bg-white focus:ring-2 focus:ring-primary/20"
              />

              <textarea
                placeholder="Tell us about your project goals"
                className="h-32 w-full rounded-xl border-transparent bg-slate-50 p-4 text-sm font-medium transition-all focus:bg-white focus:ring-2 focus:ring-primary/20"
              />

              <button className="gradient-soft w-full rounded-xl py-5 text-lg font-bold text-white shadow-lg shadow-primary/20 transition-all hover:opacity-95">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}