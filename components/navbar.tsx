"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, Terminal, Volume2, VolumeX, X } from "lucide-react";
import { useEffect, useState } from "react";
import { sound } from "@/lib/sound";

interface NavbarProps {
  onOpenTerminal: () => void;
}

const navLinks = [
  { href: "#home", label: "Overview", index: "00" },
  { href: "#about", label: "Spec", index: "01" },
  { href: "#projects", label: "Case Logs", index: "02" },
  { href: "#skills", label: "Diagnostics", index: "03" },
  { href: "#journey", label: "Changelog", index: "04" },
  { href: "#contact", label: "Dispatch", index: "05" },
];

export function Navbar({ onOpenTerminal }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const [isCondensed, setIsCondensed] = useState(false);
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const reduceMotion = useReducedMotion();

  // Load sound preference from localStorage (defaults to ON)
  useEffect(() => {
    try {
      const stored = localStorage.getItem("atharv-portfolio-sfx");
      if (stored !== null) {
        const isEnabled = stored === "true";
        setSfxEnabled(isEnabled);
        sound.enabled = isEnabled;
      } else {
        sound.enabled = true;
      }
    } catch {
      sound.enabled = true;
    }
  }, []);

  // Scroll listener for active section indicator
  useEffect(() => {
    const handleScroll = () => {
      setIsCondensed(window.scrollY > 25);
      const marker = window.scrollY + window.innerHeight * 0.35;
      let current = "home";

      navLinks.forEach(({ href }) => {
        const el = document.querySelector<HTMLElement>(href);
        if (el && el.offsetTop <= marker) {
          current = el.id;
        }
      });
      setActiveId(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Global hotkey: press ~ or ` to open terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "~" || e.key === "`") && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        sound.playBlip();
        onOpenTerminal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onOpenTerminal]);

  const toggleSfx = () => {
    const next = !sfxEnabled;
    setSfxEnabled(next);
    sound.enabled = next;
    try {
      localStorage.setItem("atharv-portfolio-sfx", String(next));
    } catch {}
    if (next) sound.playClick(1100, 0.04);
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <header className={`site-header ${isCondensed ? "is-condensed" : ""}`}>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>

      <nav className="nav-shell" aria-label="Main Navigation">
        {/* Brand with Hardware Monospace aesthetic */}
        <a
          className="brand group"
          href="#home"
          onClick={() => {
            sound.playClick();
            closeMenu();
          }}
        >
          <span className="brand-mark">
            SYS:AB
          </span>
          <div className="flex flex-col">
            <span className="brand-name font-bold leading-tight font-mono text-sm tracking-wider text-white">
              ATHARV.OS
            </span>
            <span className="text-[0.62rem] font-mono text-cyan-400 leading-none">
              ROBOTICS &amp; AI LAB
            </span>
          </div>
        </a>

        {/* Desktop Links with Industrial Index Numbers */}
        <div className="desktop-nav font-mono" role="menubar">
          {navLinks.map((item) => (
            <a
              key={item.href}
              href={item.href}
              role="menuitem"
              onClick={() => sound.playClick()}
              className={`flex items-center gap-1.5 ${activeId === item.href.slice(1) ? "is-active" : ""}`}
            >
              <span className="text-[0.65rem] text-slate-500">{item.index}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </div>

        {/* Right Actions */}
        <div className="nav-actions">
          {/* Mechanical Sound Effects Toggle */}
          <button
            type="button"
            onClick={toggleSfx}
            className={`flex items-center gap-1.5 px-2 py-1 rounded text-[0.68rem] font-mono border transition-colors ${
              sfxEnabled
                ? "bg-cyan-950 text-cyan-300 border-cyan-500/40"
                : "bg-slate-900 text-slate-400 border-white/10 hover:text-white"
            }`}
            title="Toggle mechanical synthetic audio clicks"
            aria-label="Toggle sound feedback"
          >
            {sfxEnabled ? <Volume2 size={12} /> : <VolumeX size={12} />}
            <span className="hidden sm:inline">SFX: {sfxEnabled ? "ON" : "OFF"}</span>
          </button>

          {/* Interactive CLI Terminal Launch Button */}
          <button
            type="button"
            onClick={() => {
              sound.playBlip();
              onOpenTerminal();
            }}
            className="nav-cli-btn"
            title="Launch interactive terminal (~ or `)"
            aria-label="Open Interactive CLI Terminal"
          >
            <Terminal size={13} />
            <span>CLI</span>
            <kbd className="hidden sm:inline text-[0.62rem] px-1 py-0.2 bg-black/50 rounded border border-cyan-400/40">~</kbd>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            className="menu-toggle"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => {
              sound.playClick();
              setIsOpen((prev) => !prev);
            }}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-nav font-mono"
            initial={reduceMotion ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
          >
            {navLinks.map((item, index) => (
              <motion.a
                key={item.href}
                href={item.href}
                onClick={() => {
                  sound.playClick();
                  closeMenu();
                }}
                initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: reduceMotion ? 0 : 0.03 * index }}
              >
                <span>{item.index}</span>
                <span className="text-white">{item.label}</span>
              </motion.a>
            ))}
            <div className="pt-3 mt-2 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
              <button
                type="button"
                onClick={() => {
                  closeMenu();
                  sound.playBlip();
                  onOpenTerminal();
                }}
                className="flex items-center gap-2 text-cyan-400 hover:underline"
              >
                <Terminal size={14} />
                <span>Launch CLI Terminal</span>
              </button>
              <button type="button" onClick={toggleSfx} className="text-slate-300">
                SFX: {sfxEnabled ? "ON" : "OFF"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
