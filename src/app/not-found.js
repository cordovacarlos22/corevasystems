import Link from "next/link";

export const metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white px-8 text-center">
      <span className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-slate-400">
        404
      </span>
      <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 lg:text-5xl">
        <span className="text-gradient">Page not found</span>
      </h1>
      <p className="mb-10 max-w-md text-lg text-slate-500">
        The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
      </p>
      <Link
        href="/en"
        className="gradient-soft rounded-2xl px-8 py-4 text-base font-bold text-white shadow-xl shadow-primary/20 transition-transform hover:scale-[1.02]"
      >
        Back to homepage
      </Link>
    </main>
  );
}
