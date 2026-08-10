const BASE_URL = "https://www.corevasystems.com";

const LOCALES = ["en", "es"];

// Paths relative to /{locale}, "" = the locale root itself
const ROUTES = [
  "",
  "/book",
  "/services/ai-solutions",
  "/services/websites",
  "/services/automation",
  "/pricing",
  "/industries/healthcare",
  "/industries/construction",
  "/blog",
];

function languageAlternates(path) {
  return Object.fromEntries(
    LOCALES.map((locale) => [locale, `${BASE_URL}/${locale}${path}`])
  );
}

export default function sitemap() {
  const now = new Date();

  return ROUTES.flatMap((path) =>
    LOCALES.map((locale) => ({
      url: `${BASE_URL}/${locale}${path}`,
      lastModified: now,
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: path === "" ? 1 : 0.6,
      alternates: {
        languages: {
          ...languageAlternates(path),
          "x-default": `${BASE_URL}/en${path}`,
        },
      },
    }))
  );
}
