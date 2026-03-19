import { headers } from "next/headers";
import { redirect } from "next/navigation";

function getPreferredLocale(acceptLanguage) {
  if (!acceptLanguage) return "en";

  const normalized = acceptLanguage.toLowerCase();

  if (
    normalized.startsWith("es") ||
    normalized.includes(",es") ||
    normalized.includes("es-")
  ) {
    return "es";
  }

  return "en";
}

export default async function Page() {
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language") || "";
  const locale = getPreferredLocale(acceptLanguage);

  redirect(`/${locale}`);
}