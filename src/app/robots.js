export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: "https://www.corevasystems.com/sitemap.xml",
    host: "https://www.corevasystems.com",
  };
}
