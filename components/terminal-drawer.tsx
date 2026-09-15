"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Maximize2, Minimize2, Terminal as TerminalIcon, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTheme?: (theme: string) => void;
}

interface CommandOutput {
  command: string;
  result: React.ReactNode;
}

export function TerminalDrawer({ isOpen, onClose, onSelectTheme }: TerminalProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMaximized, setIsMaximized] = useState(false);
  const [outputs, setOutputs] = useState<CommandOutput[]>([
    {
      command: "welcome",
      result: (
        <div className="space-y-1 text-slate-300">
          <p className="text-cyan-400 font-semibold">Atharv Babu — Interactive Engineering Terminal v2.4</p>
          <p className="text-xs text-slate-400">
            Heritage CLI from <span className="text-cyan-300">atharvbabu.netlify.app</span>. Type <span className="text-amber-400 font-bold">&apos;help&apos;</span> to explore available commands.
          </p>
        </div>
      ),
    },
  ]);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [outputs]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const lower = trimmed.toLowerCase();
    let res: React.ReactNode = null;

    if (lower === "help") {
      res = (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs py-1">
          <div><span className="text-cyan-400 font-bold">whoami</span> — Display background &amp; bio</div>
          <div><span className="text-cyan-400 font-bold">skills</span> — List technical proficiencies</div>
          <div><span className="text-cyan-400 font-bold">projects</span> — List all active projects</div>
          <div><span className="text-cyan-400 font-bold">cat [ashvale|cosmic|wakeme]</span> — View project details</div>
          <div><span className="text-cyan-400 font-bold">github</span> — Fetch GitHub repository data</div>
          <div><span className="text-cyan-400 font-bold">linkedin</span> — Open LinkedIn network profile</div>
          <div><span className="text-cyan-400 font-bold">theme [cyan|violet|amber|emerald|rose]</span> — Change site accent</div>
          <div><span className="text-cyan-400 font-bold">contact</span> — Show direct channels</div>
          <div><span className="text-cyan-400 font-bold">clear</span> — Clear terminal output</div>
        </div>
      );
    } else if (lower === "whoami") {
      res = (
        <div className="space-y-1.5 text-xs text-slate-300">
          <p className="text-cyan-300 font-bold text-sm">{profile.name} — {profile.role}</p>
          <p className="text-slate-400">Focus: Robotics, AI &amp; Interactive Graphics</p>
          <p className="mt-2">{profile.about[0]}</p>
          <p>{profile.about[1]}</p>
        </div>
      );
    } else if (lower === "skills" || lower === "ls skills" || lower === "ls -la skills/") {
      res = (
        <div className="space-y-2 text-xs">
          <div>
            <span className="text-cyan-400 font-semibold">[Languages]:</span> C++, Python, C, Kotlin, JavaScript, TypeScript, HTML5/CSS
          </div>
          <div>
            <span className="text-violet-400 font-semibold">[AI &amp; Robotics]:</span> Autonomous Systems, Computer Vision, Machine Learning, Embedded Systems, N-body Physics
          </div>
          <div>
            <span className="text-amber-400 font-semibold">[Graphics &amp; Engines]:</span> 2D Game Engine Architecture, Pygame, Physics Simulation, State Machines
          </div>
          <div>
            <span className="text-emerald-400 font-semibold">[Tools &amp; Systems]:</span> Git/GitHub, Jetpack Compose, Linux/Bash, System Design, Technical Docs
          </div>
        </div>
      );
    } else if (lower === "projects") {
      res = (
        <div className="space-y-1.5 text-xs">
          <p className="text-slate-400 mb-1">Found {projects.length} verified projects:</p>
          {projects.map((p) => (
            <div key={p.title} className="flex items-center justify-between border-b border-white/5 py-1">
              <div>
                <span className="text-cyan-300 font-bold">{p.title}</span> — <span className="text-slate-400">{p.label}</span>
              </div>
              <a href={p.href} target="_blank" rel="noreferrer" className="text-amber-400 hover:underline">
                [GitHub ↗]
              </a>
            </div>
          ))}
        </div>
      );
    } else if (lower.startsWith("cat ")) {
      const target = lower.replace("cat ", "").replace("projects/", "").replace(".md", "").trim();
      const proj = projects.find((p) => p.title.toLowerCase().includes(target));
      if (proj) {
        res = (
          <div className="space-y-1 text-xs text-slate-300">
            <p className="text-cyan-400 font-bold text-sm">{proj.title} ({proj.number})</p>
            <p className="text-slate-400">{proj.tagline}</p>
            <p className="my-1">{proj.description}</p>
            <p><span className="text-amber-400">Stack:</span> {proj.technologies.join(" • ")}</p>
            <p><span className="text-emerald-400">Repository:</span> <a href={proj.href} target="_blank" rel="noreferrer" className="underline">{proj.href}</a></p>
          </div>
        );
      } else {
        res = <span className="text-rose-400">File not found. Try &apos;cat ashvale&apos; or &apos;cat cosmic&apos;.</span>;
      }
    } else if (lower.startsWith("theme")) {
      const chosen = lower.split(" ")[1];
      const valid = ["cyan", "violet", "amber", "emerald", "rose"];
      if (valid.includes(chosen)) {
        if (onSelectTheme) onSelectTheme(chosen);
        document.documentElement.setAttribute("data-theme", chosen);
        res = <span className="text-emerald-400">Theme switched to [{chosen.toUpperCase()}].</span>;
      } else {
        res = <span className="text-slate-400">Available themes: cyan, violet, amber, emerald, rose. Usage: theme violet</span>;
      }
    } else if (lower === "contact" || lower === "contact --list") {
      res = (
        <div className="space-y-1 text-xs text-slate-300">
          <p><span className="text-cyan-400 font-semibold">Email:</span> <a href={"mailto:" + profile.email} className="underline text-slate-200">{profile.email}</a></p>
          <p><span className="text-cyan-400 font-semibold">GitHub:</span> <a href={profile.github} target="_blank" rel="noreferrer" className="underline text-slate-200">{profile.github}</a></p>
          <p><span className="text-cyan-400 font-semibold">LinkedIn:</span> <a href={profile.linkedin} target="_blank" rel="noreferrer" className="underline text-slate-200">{profile.linkedin}</a></p>
        </div>
      );
    } else if (lower === "linkedin") {
      res = (
        <div className="space-y-1 text-xs text-slate-300">
          <p className="text-cyan-400 font-bold">LinkedIn Profile</p>
          <p>Connect: <a href={profile.linkedin} target="_blank" rel="noreferrer" className="underline text-cyan-300">{profile.linkedin}</a></p>
        </div>
      );
    } else if (lower === "github" || lower.startsWith("fetch-github")) {
      res = (
        <div className="space-y-1 text-xs text-slate-300">
          <p className="text-cyan-400 font-bold">GitHub Activity for @{profile.githubUsername}</p>
          <p>Public Profile: <a href={profile.github} target="_blank" rel="noreferrer" className="underline">{profile.github}</a></p>
          <p>Primary Stack: C++, Python, Kotlin, JavaScript</p>
          <p className="text-slate-400 mt-1">Key Repositories: AshVale, Cosmic-Canvas, WakeMeThere, FaceClub, Mini-Blog</p>
        </div>
      );
    } else if (lower === "clear") {
      setOutputs([]);
      return;
    } else {
      res = (
        <span className="text-rose-400">
          Command &apos;{trimmed}&apos; not recognized. Type <span className="text-amber-400 font-bold">&apos;help&apos;</span> for a list of available commands.
        </span>
      );
    }

    setOutputs((prev) => [...prev, { command: trimmed, result: res }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      if (history.length > 0) {
        const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
      e.preventDefault();
    } else if (e.key === "ArrowDown") {
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < history.length) {
          setHistoryIndex(nextIndex);
          setInput(history[nextIndex]);
        } else {
          setHistoryIndex(-1);
          setInput("");
        }
      }
      e.preventDefault();
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="terminal-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            className={`terminal-drawer ${isMaximized ? "!w-[96vw] !h-[92vh] !max-w-none" : ""}`}
            role="dialog"
            aria-label="Interactive CLI Terminal"
            initial={{ opacity: 0, scale: 0.96, y: "-45%", x: "-50%" }}
            animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
            exit={{ opacity: 0, scale: 0.96, y: "-45%", x: "-50%" }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          >
            {/* Terminal Header */}
            <div className="terminal-topbar">
              <div className="flex items-center gap-3">
                <div className="terminal-dots">
                  <span className="bg-red-500 cursor-pointer" onClick={onClose} title="Close" />
                  <span className="bg-amber-500" />
                  <span className="bg-emerald-500" />
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <TerminalIcon size={14} className="text-cyan-400" />
                  <span>atharv@portfolio:~ (bash)</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-slate-400">
                <button
                  type="button"
                  onClick={() => setIsMaximized((m) => !m)}
                  className="p-1 hover:text-white transition-colors"
                  aria-label={isMaximized ? "Restore window" : "Maximize window"}
                >
                  {isMaximized ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1 hover:text-white transition-colors"
                  aria-label="Close terminal"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Terminal Content */}
            <div ref={scrollRef} className="terminal-screen" onClick={() => inputRef.current?.focus()}>
              {outputs.map((out, idx) => (
                <div key={idx} className="mb-3">
                  {out.command !== "welcome" && (
                    <div className="flex items-center gap-2 text-slate-400 mb-1">
                      <span className="text-cyan-400 font-bold">atharv@portfolio</span>
                      <span className="text-slate-600">:</span>
                      <span className="text-violet-400">~</span>
                      <span className="text-slate-500">$</span>
                      <span className="text-white font-semibold">{out.command}</span>
                    </div>
                  )}
                  <div className="pl-0">{out.result}</div>
                </div>
              ))}

              {/* Active Prompt Line */}
              <div className="terminal-prompt-line">
                <span className="terminal-prompt-user">atharv@portfolio</span>
                <span className="text-slate-600">:</span>
                <span className="terminal-prompt-path">~</span>
                <span className="text-cyan-400 font-bold">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  className="terminal-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoComplete="off"
                  spellCheck="false"
                  aria-label="Terminal input prompt"
                />
              </div>
            </div>

            {/* Terminal Footer Quick Bar */}
            <div className="px-4 py-2 bg-slate-950 border-t border-white/5 flex flex-wrap items-center justify-between text-[0.7rem] text-slate-500">
              <div className="flex items-center gap-3">
                <span>Quick:</span>
                <button type="button" onClick={() => handleCommand("whoami")} className="hover:text-cyan-400">whoami</button>
                <button type="button" onClick={() => handleCommand("skills")} className="hover:text-cyan-400">skills</button>
                <button type="button" onClick={() => handleCommand("projects")} className="hover:text-cyan-400">projects</button>
                <button type="button" onClick={() => handleCommand("help")} className="hover:text-cyan-400">help</button>
              </div>
              <div className="text-slate-600 hidden sm:block">
                Press <kbd className="px-1.5 py-0.5 rounded bg-white/5 text-slate-400">Esc</kbd> to exit
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
