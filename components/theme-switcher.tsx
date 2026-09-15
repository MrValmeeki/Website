"use client";

import { Palette } from "lucide-react";
import { useEffect, useState } from "react";

export type ThemeOption = "cyan" | "violet" | "amber" | "emerald" | "rose";

interface ThemeSwitcherProps {
  currentTheme: ThemeOption;
  onThemeChange: (theme: ThemeOption) => void;
}

const themeConfigs: { id: ThemeOption; label: string; color: string }[] = [
  { id: "cyan", label: "Industrial Slate", color: "#95a5a6" },
  { id: "violet", label: "Cosmic Violet", color: "#8b5cf6" },
  { id: "amber", label: "Solar Amber", color: "#f59e0b" },
  { id: "emerald", label: "Matrix Emerald", color: "#10b981" },
  { id: "rose", label: "Electric Rose", color: "#ec4899" },
];

export function ThemeSwitcher({ currentTheme, onThemeChange }: ThemeSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("atharv-portfolio-theme") as ThemeOption | null;
    if (saved && themeConfigs.some((t) => t.id === saved)) {
      onThemeChange(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, [onThemeChange]);

  const selectTheme = (theme: ThemeOption) => {
    onThemeChange(theme);
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("atharv-portfolio-theme", theme);
    } catch {}
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-1.5 p-1.5 sm:px-2.5 sm:py-1 rounded-md text-xs font-mono text-slate-300 border border-white/10 hover:border-white/20 bg-slate-900 transition-all"
        title="Customize Color Accent"
        aria-label="Customize accent colors"
        aria-expanded={isOpen}
      >
        <Palette size={14} className="text-cyan-400" />
        <span className="hidden sm:inline">Theme</span>
        <span
          className="w-2.5 h-2.5 rounded-full inline-block border border-black"
          style={{ background: themeConfigs.find((t) => t.id === currentTheme)?.color || "#95a5a6" }}
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 top-full mt-2 z-50 w-48 p-2 rounded-xl bg-slate-900 border border-white/15 backdrop-blur-xl shadow-2xl">
            <div className="text-[0.68rem] font-mono uppercase tracking-wider text-slate-400 px-2 py-1 mb-1">
              Select Color Mood
            </div>
            <div className="space-y-1">
              {themeConfigs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => selectTheme(t.id)}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs transition-colors text-left ${
                    currentTheme === t.id
                      ? "bg-white/10 text-white font-semibold"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full shrink-0 border border-black/40"
                    style={{ background: t.color }}
                  />
                  <span>{t.label}</span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
