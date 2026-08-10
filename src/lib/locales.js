export const LOCALES = ["en", "es"];
export const DEFAULT_LOCALE = "en";

export function isValidLocale(lang) {
  return LOCALES.includes(lang);
}
