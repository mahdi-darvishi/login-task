import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  // Check the requested locale, default to 'fa' if not found or invalid
  let locale = await requestLocale;

  // List of supported locales
  const supportedLocales = ["en", "fa"];

  if (!locale || !supportedLocales.includes(locale)) {
    locale = "fa";
  }

  return {
    locale,
    // Load messages from the root messages folder (../../messages)
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
