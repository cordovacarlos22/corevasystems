const brands = [
  "CLÍNICA ARIAS",
  "CALI CONSTRUCTION",
];

export default function TrustedBySection() {
  const repeatedBrands = [...brands, ...brands];

  return (
    <section className="overflow-hidden border-y border-slate-50 bg-white py-24">
      <div className="mx-auto max-w-7xl px-8">
        <p className="mb-16 text-center text-[10px] font-bold uppercase tracking-[0.4em] text-slate-400">
          TRUSTED BY GROWTH-MINDED BUSINESSES
        </p>

        <div className="relative">
          <div className="logo-scroll flex items-center gap-24 opacity-40 md:gap-40">
            {repeatedBrands.map((brand, index) => (
              <span
                key={`${brand}-${index}`}
                className="whitespace-nowrap text-3xl font-black tracking-tighter"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}