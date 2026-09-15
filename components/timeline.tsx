"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Building2, Calendar, GitCommit, Sparkles, Terminal } from "lucide-react";
import { researchInterests, timeline, type ResearchInterest, type TimelineEntry } from "@/data/experience";
import { sound } from "@/lib/sound";

export function Timeline() {
  const reduceMotion = useReducedMotion();

  const accentColorMap: Record<string, { badge: string; node: string }> = {
    cyan: {
      badge: "text-cyan-400 bg-cyan-950 border-cyan-500/30",
      node: "border-cyan-400 bg-cyan-400",
    },
    rose: {
      badge: "text-rose-400 bg-rose-950 border-rose-500/30",
      node: "border-rose-400 bg-rose-400",
    },
    amber: {
      badge: "text-amber-400 bg-amber-950 border-amber-500/30",
      node: "border-amber-400 bg-amber-400",
    },
    violet: {
      badge: "text-violet-400 bg-violet-950 border-violet-500/30",
      node: "border-violet-400 bg-violet-400",
    },
  };

  return (
    <div className="space-y-14 font-mono">
      {/* 1. Architecture Changelog Timeline */}
      <div className="relative">
        {/* Solid hairline vertical track */}
        <div
          className="absolute top-4 bottom-4 left-4 sm:left-8 w-[1px] bg-slate-800"
          aria-hidden="true"
        />

        <div className="space-y-8">
          {timeline.map((entry, index) => {
            const style = accentColorMap[entry.accent] || accentColorMap.cyan;

            return (
              <motion.div
                key={entry.role}
                initial={reduceMotion ? false : { opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, delay: reduceMotion ? 0 : index * 0.06 }}
                className="relative pl-12 sm:pl-20"
              >
                {/* Milestone Node on Line */}
                <div
                  className={`absolute left-[13px] sm:left-[29px] top-2 w-2.5 h-2.5 rounded-none border ${style.node}`}
                  aria-hidden="true"
                />

                {/* Changelog Card */}
                <motion.div
                  whileHover={reduceMotion ? undefined : { x: 4 }}
                  transition={{ duration: 0.18 }}
                  className="p-5 sm:p-6 bg-[#090c13] border border-white/10 hover:border-white/25 transition-all group"
                >
                  {/* Top Bar: Release Period & Badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-white/10 text-xs">
                    <div className="flex items-center gap-2 text-slate-300 font-bold">
                      <GitCommit size={14} className="text-cyan-400" />
                      <span>LOG // {entry.period}</span>
                    </div>
                    <span className={`text-[0.65rem] px-2 py-0.5 border uppercase ${style.badge}`}>
                      {entry.badge}
                    </span>
                  </div>

                  {/* Role & Organization */}
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-1 font-sans">
                    {entry.role}
                  </h3>

                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-3">
                    <Building2 size={13} className="text-violet-400" />
                    <span className="text-slate-300 font-semibold">{entry.organization}</span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4 font-sans">
                    {entry.description}
                  </p>

                  {/* Highlights Bullet List */}
                  <ul className="space-y-1 mb-4 text-xs text-slate-300 font-sans">
                    {entry.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-cyan-400 font-mono mt-0.5">›</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2.5 border-t border-white/5">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[0.65rem] bg-slate-950 text-slate-400 border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 2. Active R&D Investigation Labs */}
      <div className="pt-8 border-t border-white/10 corner-frame">
        <div className="flex items-center gap-2 mb-2 text-xs text-violet-400 uppercase tracking-widest font-bold">
          <Sparkles size={14} />
          <span>ACTIVE R&amp;D INVESTIGATION LABS</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight font-display">
          Current Research &amp; Theoretical Studies
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mb-8 font-sans">
          Current investigations bridging physical mechanics, robotics perception, and simulation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {researchInterests.map((research, idx) => (
            <motion.div
              key={research.title}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08, duration: 0.35 }}
              whileHover={reduceMotion ? undefined : { y: -4 }}
              className="p-5 bg-[#090c13] border border-white/10 hover:border-violet-400/60 hover:bg-slate-900/60 transition-all flex flex-col justify-between group cursor-default"
            >
              <div>
                <span className="text-[0.65rem] px-2 py-0.5 bg-violet-950 text-violet-300 border border-violet-500/30 uppercase block w-fit mb-2.5 font-bold">
                  LAB-0{idx + 1} // {research.domain}
                </span>
                <h4 className="text-base font-bold text-white mb-2 leading-snug font-sans">
                  {research.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed mb-4 font-sans">
                  {research.description}
                </p>
              </div>

              <div className="pt-2.5 border-t border-white/5 space-y-1">
                <span className="text-[0.62rem] text-slate-500 uppercase block">CORE DIRECTIVES:</span>
                <div className="flex flex-wrap gap-1">
                  {research.focusTopics.map((topic) => (
                    <span
                      key={topic}
                      className="text-[0.65rem] text-cyan-300 bg-cyan-950 px-1.5 py-0.5 border border-cyan-500/20"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
