"use client";

import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

const SUPPORTED_LOCALES = ["en", "fa"] as const;

export default function LangToggle() {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("Common.language");

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
      {/* FA */}
      <span
        className={`text-xs font-bold transition-colors ${
          isFa ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        FA
      </span>

      <Switch id="lang-mode" checked={!isFa} onCheckedChange={toggleLanguage} />

      {/* EN */}
      <span
        className={`text-xs font-bold transition-colors ${
          !isFa ? "text-foreground" : "text-muted-foreground"
        }`}
      >
        EN
      </span>

      <Label htmlFor="lang-mode" className="sr-only">
        Toggle Language
      </Label>
    </div>
  );
}
