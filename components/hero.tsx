"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Binary, Bot, Cpu, Github, Linkedin, Mail, Sparkles, Terminal } from "lucide-react";
import { RoboticsSimulation } from "@/components/robotics-simulation";
import { profile } from "@/data/profile";
import { sound } from "@/lib/sound";

interface HeroProps {
  onOpenTerminal: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export function Hero({ onOpenTerminal }: HeroProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="page-width hero-layout">
        {/* Left Column: Industrial Spec Typography & Controls */}
        <motion.div
          className="relative z-10 flex flex-col items-start max-w-2xl"
          initial={reduceMotion ? false : "hidden"}
          animate="show"
          variants={{
            show: {
              transition: {
                staggerChildren: 0.07,
                delayChildren: 0.1,
              },
            },
          }}
        >
          {/* Hardware Identifier Tag */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2.5 px-3 py-1 rounded bg-slate-900 border border-white/15 text-xs font-mono text-slate-300 mb-6"
          >
            <span className="w-2 h-2 bg-emerald-400 rounded-none inline-block animate-pulse" />
            <span className="text-cyan-400 font-bold uppercase tracking-wider">
              {profile.role}
            </span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-400">HARDWARE &amp; AI BENCH</span>
          </motion.div>

          {/* Large Expressive Technical Headline (Solid colors - NO Gradients) */}
          <motion.h1
            id="hero-title"
            variants={fadeUp}
            className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6 font-display"
          >
            <span className="block text-white">Atharv</span>
            <span className="block text-cyan-400">
              Babu<span className="text-white">.</span>
            </span>
          </motion.h1>

          {/* Tagline / Subsystem Modules */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center gap-x-3 gap-y-1 text-base sm:text-lg font-mono font-medium text-slate-300 mb-5"
          >
            <span className="text-cyan-400">ROBOTICS</span>
            <span className="text-slate-600">//</span>
            <span className="text-violet-400">ARTIFICIAL INTELLIGENCE</span>
            <span className="text-slate-600">//</span>
            <span className="text-amber-400">GAME DEV</span>
          </motion.div>

          {/* Brief Profile Bio */}
          <motion.p
            variants={fadeUp}
            className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mb-8 font-normal"
          >
            {profile.heroBio}
          </motion.p>

          {/* Action Hardware Controls */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3.5 mb-10">
            <motion.a
              whileHover={reduceMotion ? undefined : { scale: 1.02, y: -1 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              href="#projects"
              onClick={() => sound.playClick(900, 0.03)}
              className="btn btn-primary group"
            >
              <span>Inspect Case Logs</span>
              <ArrowDownRight size={16} aria-hidden="true" className="group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
            </motion.a>

            <motion.a
              whileHover={reduceMotion ? undefined : { scale: 1.02, y: -1 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              href="#contact"
              onClick={() => sound.playClick(800, 0.03)}
              className="btn btn-secondary group"
            >
              <span>Dispatch Message</span>
              <ArrowUpRight size={16} aria-hidden="true" className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>

            <motion.button
              whileHover={reduceMotion ? undefined : { scale: 1.02, y: -1 }}
              whileTap={reduceMotion ? undefined : { scale: 0.98 }}
              type="button"
              onClick={() => {
                sound.playBlip();
                onOpenTerminal();
              }}
              className="btn btn-secondary !border-cyan-500/40 !bg-slate-900 text-cyan-300 hover:!border-cyan-400 group"
              title="Launch interactive terminal (~ or `)"
            >
              <Terminal size={15} className="group-hover:rotate-12 transition-transform" />
              <span>Launch CLI</span>
              <kbd className="text-[0.62rem] px-1 py-0.5 rounded bg-slate-950 border border-cyan-400/40 font-mono">~</kbd>
            </motion.button>
          </motion.div>

          {/* Hardware Status Strip */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap items-center gap-5 text-xs font-mono text-slate-400 pt-4 border-t border-white/10 w-full"
          >
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick()}
              className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
            >
              <Github size={14} />
              <span>github.com/{profile.githubUsername}</span>
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick()}
              className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
            >
              <Linkedin size={14} />
              <span>linkedin.com/in/{profile.linkedinUsername}</span>
            </a>

            <a
              href={"mailto:" + profile.email}
              onClick={() => sound.playClick()}
              className="flex items-center gap-2 hover:text-amber-400 transition-colors"
            >
              <Mail size={14} />
              <span>{profile.email}</span>
            </a>

            <span className="text-slate-600 hidden sm:inline">|</span>

            <div className="flex items-center gap-2 text-slate-400">
              <span className="w-1.5 h-1.5 bg-emerald-400" />
              <span>KINEMATICS &amp; ML SIMULATION</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Interactive Autonomous Robotics Viewport */}
        <motion.div
          className="relative z-10"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {/* Autonomous Mobile Robot Canvas Simulation */}
          <RoboticsSimulation />

          {/* Subsystem Hardware Spec Sheet below Canvas */}
          <div className="mt-3 p-3.5 bg-slate-900 border border-white/10 rounded-lg text-xs font-mono">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
              <span className="text-slate-400 font-bold uppercase text-[0.68rem]">
                SUBSYSTEM DIAGNOSTICS
              </span>
              <span className="text-cyan-400 text-[0.65rem]">STATUS: NOMINAL</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[0.7rem]">
              <div>
                <span className="text-slate-500 block text-[0.62rem]">CONTROLLER</span>
                <span className="text-white font-bold">Closed-Loop PID</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[0.62rem]">PERCEPTION</span>
                <span className="text-cyan-400 font-bold">2D Lidar Array</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[0.62rem]">SIM ENGINE</span>
                <span className="text-amber-400 font-bold">Custom Canvas 60FPS</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Hero Bottom Bar */}
      <div className="page-width mt-10 flex items-center justify-between text-xs font-mono text-slate-500 relative z-10 border-t border-white/10 pt-3">
        <div className="flex items-center gap-2">
          <Sparkles size={12} className="text-cyan-400" />
          <span>AUTONOMOUS SYSTEM LAB // WORKBENCH V2.6</span>
        </div>
        <div className="text-slate-400">ATHARV BABU • BUILDER</div>
      </div>
    </section>
  );
}
