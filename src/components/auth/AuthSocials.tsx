"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "./AuthIcon";

interface AuthSocialsProps {
  t: (key: string) => string;
}

export function AuthSocials({ t }: AuthSocialsProps) {
  const [isMoreSocialsOpen, setIsMoreSocialsOpen] = useState(false);

  return (
    <div className="space-y-3">
      {/* Main Google Button */}
      <Button
        variant="outline"
        className="w-full h-13 rounded-full gap-2 font-medium bg-background hover:bg-muted/50 transition-colors"
        title="Google"
      >
        <Icons.Google />
        {t("google")}
      </Button>

      {/* Primary Social Grid (Row 1) */}
      <div className="grid grid-cols-3 gap-3">
        <Button
          variant="outline"
          className="h-11 rounded-full bg-background hover:bg-muted/50"
          title="Apple"
        >
          <Icons.Apple />
        </Button>
        <Button
          variant="outline"
          className="h-11 rounded-full bg-background hover:bg-muted/50"
          title="Linkedin"
        >
          <Icons.Linkedin />
        </Button>
        <Button
          variant="outline"
          className="h-11 rounded-full bg-background hover:bg-muted/50"
        >
          <Icons.Twitter />
        </Button>
      </div>

      {/* Toggle More Options */}
      <div className="text-center">
        <button
          type="button"
          onClick={() => setIsMoreSocialsOpen(!isMoreSocialsOpen)}
          className="group flex items-center justify-center gap-1 mx-auto text-xs text-muted-foreground hover:text-foreground transition-colors py-1"
        >
          <span className="underline ">{t("moreOptions")}</span>
        </button>

        {/* Expanded Social Grid (Row 2 & 3) - Animated */}
        <div
          className={`grid grid-cols-5 gap-2 overflow-hidden transition-all duration-300 ease-in-out ${
            isMoreSocialsOpen
              ? "max-h-25 mt-3 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <Button
            variant="outline"
            className="h-10 rounded-xl bg-background hover:bg-muted/50 p-0"
            title="Microsoft"
          >
            <Icons.Microsoft />
          </Button>
          <Button
            variant="outline"
            className="h-10 rounded-xl bg-background hover:bg-muted/50 p-0"
            title="Facebook"
          >
            <Icons.Facebook />
          </Button>
          <Button
            variant="outline"
            className="h-10 rounded-xl bg-background hover:bg-muted/50 p-0"
            title="Github"
          >
            <Icons.Github />
          </Button>
          <Button
            variant="outline"
            className="h-10 rounded-xl bg-background hover:bg-muted/50 p-0"
            title="Gitlab"
          >
            <Icons.Gitlab />
          </Button>
          <Button
            variant="outline"
            className="h-10 rounded-xl bg-background hover:bg-muted/50 p-0"
            title="Discord"
          >
            <Icons.Discord />
          </Button>
        </div>
      </div>
    </div>
  );
}
