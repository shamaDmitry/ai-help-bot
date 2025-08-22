"use client";

import { useTheme } from "./ThemeContext";

const themes = [
  { name: "Light", value: "light" as const },
  { name: "Dark", value: "dark" as const },
];

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-2 items-center">
      {themes.map((t) => (
        <button
          key={t.value}
          className={`px-3 py-1 rounded border text-sm transition-colors duration-150 ${
            theme === t.value
              ? "bg-primary text-primary-foreground border-primary"
              : "bg-card text-foreground border-border hover:bg-muted"
          }`}
          onClick={() => {
            return setTheme(t.value);
          }}
          aria-pressed={theme === t.value}
        >
          {t.name}
        </button>
      ))}
    </div>
  );
}
