"use client";

import { usePathname, useRouter } from "next/navigation";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { useTranslations, useLocale } from "next-intl";

const SUPPORTED_LOCALES = ["en", "fa"] as const;

export default function LangToggle() {
  const pathname = usePathname();
  const router = useRouter();

  const currentLocale =
    SUPPORTED_LOCALES.find((l) => pathname.startsWith(`/${l}`)) ?? "en";

  const isFa = currentLocale === "fa";

  const toggleLanguage = (checked: boolean) => {
    const newLocale = checked ? "fa" : "en";
    const newPath = pathname.replace(/^\/(en|fa)/, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-2" dir="ltr">
      {/* EN */}
      <span
        className={`text-xs font-bold transition-colors ${
          !isFa ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        EN
      </span>

      <Switch id="lang-mode" checked={isFa} onCheckedChange={toggleLanguage} />

      {/* FA */}
      <span
        className={`text-xs font-bold transition-colors ${
          isFa ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        FA
      </span>

      <Label htmlFor="lang-mode" className="sr-only">
        Toggle Language
      </Label>
    </div>
  );
}
