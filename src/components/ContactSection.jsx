export default function ContactSection({ dict }) {
  const contact = dict?.contact || {
    badge: "RESERVE A SLOT",
    title: "Ready to start?",
    info: {
      emailLabel: "Email our team",
      emailValue: "hello@corevasystems.com",
      callLabel: "Book a call",
      callValue: "Schedule Strategy Session",
    },
    form: {
      name: "Full Name",
      email: "Email Address",
      company: "Company Name",
      message: "Tell us about your project goals",
      button: "Send Message",
    },
  };
  return (
    <section className="bg-slate-50/50 py-32" id="contact">
      <div className="mx-auto max-w-7xl px-8">
        <div className="mb-24 text-center">
          <div className="mb-6 inline-block rounded-full bg-primary/5 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-primary">
            {contact.badge}
          </div>
          <h2 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            {contact.title}
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
                  {contact.info.emailLabel}
                </h4>
                <p className="text-2xl font-bold text-slate-900">
                  {contact.info.emailValue}
                </p>
              </div>
            </div>

            <div className="group flex gap-8">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-white text-primary shadow-sm transition-shadow group-hover:shadow-md">
                <span className="text-3xl">📅</span>
              </div>
              <div>
                <h4 className="mb-2 text-[11px] font-bold uppercase tracking-widest text-slate-400">
                  {contact.info.callLabel}
                </h4>
                <p className="text-2xl font-bold text-slate-900">
                  {contact.info.callValue}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[2.5rem] border border-slate-100 bg-white p-12 shadow-xl shadow-slate-200/50">
            <form className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder={contact.form.name}
                  className="w-full rounded-xl border-transparent bg-slate-50 p-4 text-sm font-medium transition-all focus:bg-white focus:ring-2 focus:ring-primary/20"
                />
                <input
                  type="email"
                  placeholder={contact.form.email}
                  className="w-full rounded-xl border-transparent bg-slate-50 p-4 text-sm font-medium transition-all focus:bg-white focus:ring-2 focus:ring-primary/20"
                />
              </div>

              <input
                type="text"
                placeholder={contact.form.company}
                className="w-full rounded-xl border-transparent bg-slate-50 p-4 text-sm font-medium transition-all focus:bg-white focus:ring-2 focus:ring-primary/20"
              />

              <textarea
                placeholder={contact.form.message}
                className="h-32 w-full rounded-xl border-transparent bg-slate-50 p-4 text-sm font-medium transition-all focus:bg-white focus:ring-2 focus:ring-primary/20"
              />

              <button className="gradient-soft w-full rounded-xl py-5 text-lg font-bold text-white shadow-lg shadow-primary/20 transition-all hover:opacity-95">
                {contact.form.button}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}