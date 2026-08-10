const BASE_URL = "https://www.corevasystems.com";

// Builds a consistent metadata object (title, description, canonical,
// hreflang alternates, OG/Twitter) for a localized page at `path`
// (e.g. "/services/ai-solutions", or "" for a locale root).
export function buildLocalizedMetadata({ lang, path = "", seo }) {
  const canonical = `${BASE_URL}/${lang}${path}`;

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical,
      languages: {
        en: `${BASE_URL}/en${path}`,
        es: `${BASE_URL}/es${path}`,
        "x-default": `${BASE_URL}/en${path}`,
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: canonical,
      locale: lang === "es" ? "es_ES" : "en_US",
    },
    twitter: {
      title: seo.title,
      description: seo.description,
    },
  };
}

export { BASE_URL };
