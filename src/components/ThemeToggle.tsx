"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="
        inline-flex items-center justify-center rounded-md p-2
        transition-all duration-300 ease-in-out
        hover:bg-muted
      "
    >
      <span className="relative h-5 w-5">
        <Sun
          className={`absolute h-5 w-5 transition-all duration-300
            ${isDark ? "opacity-0 rotate-90 scale-75" : "opacity-100"}
          `}
        />
        <Moon
          className={`absolute h-5 w-5 transition-all duration-300
            ${isDark ? "opacity-100" : "opacity-0 -rotate-90 scale-75"}
          `}
        />
      </span>
    </button>
  );
}
