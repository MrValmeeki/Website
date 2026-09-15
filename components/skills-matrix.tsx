"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Bot, Code, Cpu, Layers } from "lucide-react";
import { useState } from "react";
import { skillCategories, type SkillCategory } from "@/data/skills";
import { sound } from "@/lib/sound";

const categoryIcons: Record<string, React.ReactNode> = {
  languages: <Code size={15} />,
  "ai-robotics": <Bot size={15} />,
  "graphics-games": <Layers size={15} />,
  "systems-tools": <Cpu size={15} />,
};

export function SkillsMatrix() {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].id);
  const reduceMotion = useReducedMotion();

  const currentCategory = skillCategories.find((c) => c.id === activeCategory) || skillCategories[0];

  const accentColorMap: Record<string, { tab: string; border: string; text: string }> = {
    cyan: {
      tab: "border-cyan-400 bg-cyan-950 text-cyan-300",
      border: "hover:border-cyan-400/60",
      text: "text-cyan-400",
    },
    violet: {
      tab: "border-violet-400 bg-violet-950 text-violet-300",
      border: "hover:border-violet-400/60",
      text: "text-violet-400",
    },
    amber: {
      tab: "border-amber-400 bg-amber-950 text-amber-300",
      border: "hover:border-amber-400/60",
      text: "text-amber-400",
    },
    emerald: {
      tab: "border-emerald-400 bg-emerald-950 text-emerald-300",
      border: "hover:border-emerald-400/60",
      text: "text-emerald-400",
    },
  };

  const currentStyle = accentColorMap[currentCategory.accent] || accentColorMap.cyan;

  return (
    <div className="w-full corner-frame">
      {/* Industrial Subsystem Category Selector */}
      <div
        className="flex flex-wrap items-center gap-2 p-2 bg-slate-900 border border-white/15 mb-6 font-mono"
        role="tablist"
        aria-label="Skill subsystem diagnostic categories"
      >
        <span className="text-[0.68rem] text-slate-500 uppercase px-2 font-bold hidden sm:inline">
          SUBSYSTEM SELECT:
        </span>
        {skillCategories.map((cat, idx) => {
          const isActive = cat.id === activeCategory;
          const style = accentColorMap[cat.accent];

          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${cat.id}`}
              id={`tab-${cat.id}`}
              onClick={() => {
                sound.playClick(1000 + idx * 100, 0.02);
                setActiveCategory(cat.id);
              }}
              className={`relative flex items-center gap-2 px-3 py-2 text-xs font-mono transition-colors ${
                isActive
                  ? "text-white font-bold"
                  : "text-slate-400 hover:text-white hover:bg-white/[0.04] border border-white/5"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="activeSubsystemTab"
                  className={`absolute inset-0 border ${style.tab} -z-0`}
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                />
              )}
              <span className="relative z-10">{categoryIcons[cat.id]}</span>
              <span className="relative z-10">SUB-0{idx + 1}: {cat.name}</span>
            </button>
          );
        })}
      </div>

      {/* Diagnostics Rack Status Banner */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-6 p-3 bg-slate-950 border border-white/10 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-emerald-400" />
          <span className="text-white font-bold">{currentCategory.name.toUpperCase()}</span>
          <span className="text-slate-600">/</span>
          <span className="text-slate-400 text-[0.72rem]">{currentCategory.subtitle}</span>
        </div>

        <div className="flex items-center gap-2 text-[0.68rem] text-slate-400">
          <span className="text-cyan-400 font-bold">STATUS: OK</span>
          <span>•</span>
          <span>{currentCategory.skills.length} UNITS REGISTERED</span>
        </div>
      </div>

      {/* Diagnostic Module Cards Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentCategory.id}
          id={`panel-${currentCategory.id}`}
          role="tabpanel"
          aria-labelledby={`tab-${currentCategory.id}`}
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -10 }}
          transition={{ duration: 0.18 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {currentCategory.skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : index * 0.035, duration: 0.2 }}
              whileHover={reduceMotion ? undefined : { y: -3, transition: { duration: 0.15 } }}
              className={`p-4 bg-[#090c13] border border-white/10 ${currentStyle.border} hover:bg-slate-900/60 transition-all flex flex-col justify-between font-mono group cursor-default`}
            >
              <div>
                {/* Module Header */}
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-[0.62rem] text-slate-500 font-bold">
                      MOD // 0{index + 1}
                    </span>
                    <h4 className="text-sm font-bold text-white tracking-wide">{skill.name}</h4>
                  </div>
                  <span
                    className={`text-[0.65rem] px-2 py-0.5 border ${
                      skill.level === "Advanced"
                        ? "text-emerald-400 bg-emerald-950 border-emerald-500/30 font-bold"
                        : skill.level === "Proficient"
                        ? "text-cyan-400 bg-cyan-950 border-cyan-500/30"
                        : "text-amber-400 bg-amber-950 border-amber-500/30"
                    }`}
                  >
                    {skill.level.toUpperCase()}
                  </span>
                </div>

                {/* Practical Engineering Application */}
                <p className="text-xs text-slate-400 leading-relaxed mb-4 font-sans">
                  {skill.experience}
                </p>
              </div>

              {/* Applied Projects Footnote */}
              {skill.projects && skill.projects.length > 0 && (
                <div className="pt-2.5 border-t border-white/5 flex flex-wrap items-center gap-1.5 text-[0.65rem]">
                  <span className="text-slate-500">APPLIED IN:</span>
                  {skill.projects.map((proj) => (
                    <span
                      key={proj}
                      className="px-1.5 py-0.5 bg-slate-900 text-slate-300 border border-white/15"
                    >
                      {proj}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
