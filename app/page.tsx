"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ArrowDown, ArrowUpRight, Bot, Cpu, Github, Layers, Linkedin, Mail, Sparkles, Terminal } from "lucide-react";
import { useEffect, useState } from "react";
import { ContactForm } from "@/components/contact-form";
import { CustomCursor } from "@/components/custom-cursor";
import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { ProjectCard } from "@/components/project-card";
import { SkillsMatrix } from "@/components/skills-matrix";
import { TerminalDrawer } from "@/components/terminal-drawer";
import { Timeline } from "@/components/timeline";
import { focusAreas, profile, quickStats } from "@/data/profile";
import { projects } from "@/data/projects";
import { sound } from "@/lib/sound";

export default function Home() {
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [activeProjectFilter, setActiveProjectFilter] = useState<string>("All");
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  useEffect(() => {
    try {
      localStorage.removeItem("atharv-portfolio-theme");
    } catch {}
    document.documentElement.removeAttribute("data-theme");
  }, []);

  const filteredProjects =
    activeProjectFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeProjectFilter);

  const filterCategories = ["All", "Robotics & AI", "Game Dev & Graphics", "Systems & Apps"];

  return (
    <>
      <CustomCursor />

      {/* Hardware Telemetry Top Scroll Indicator */}
      {!reduceMotion && (
        <motion.div
          className="fixed top-0 left-0 right-0 h-[2px] bg-cyan-400 origin-left z-50 pointer-events-none shadow-[0_0_10px_rgba(34,211,238,0.8)]"
          style={{ scaleX }}
          aria-hidden="true"
        />
      )}

      {/* Navigation */}
      <Navbar onOpenTerminal={() => setIsTerminalOpen(true)} />

      {/* Embedded CLI Terminal Drawer (Homage to atharvbabu.netlify.app) */}
      <TerminalDrawer
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
      />

      <main id="main-content">
        {/* Section 00: Hero (Autonomous Mobile Robotics Simulation Viewport + Hardware Spec) */}
        <Hero onOpenTerminal={() => setIsTerminalOpen(true)} />

        {/* Section 01: System Specifications & Architecture (About Bento) */}
        <section id="about" className="section border-t border-white/10 relative">
          <div className="page-width">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              <div className="section-kicker">
                <span className="kicker-index">01</span>
                <span>SYSTEM SPECIFICATION // CORE ARCHITECTURE</span>
              </div>

              <h2 className="section-title">
                Engineering with curiosity, <br className="hidden sm:inline" />
                <span className="text-cyan-400">
                  rigor, and purpose.
                </span>
              </h2>

              <p className="section-desc mb-8">
                Bridging low-level systems programming with autonomous machine intelligence.
              </p>
            </motion.div>

            {/* Industrial Bento Diagnostics Grid */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-5 corner-frame"
            >
              {/* Main Architectural Bio Card (7 cols) */}
              <motion.div
                whileHover={reduceMotion ? undefined : { y: -2 }}
                transition={{ duration: 0.2 }}
                className="lg:col-span-7 bento-card glow-cyan flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10 text-xs font-mono">
                    <span className="text-cyan-400 font-bold uppercase tracking-wider">
                      SPEC // PHILOSOPHY &amp; HARDWARE CONTEXT
                    </span>
                    <span className="text-slate-500">AUTONOMOUS ROBOTICS</span>
                  </div>

                  <p className="text-base sm:text-lg text-slate-200 leading-snug font-medium mb-4">
                    {profile.about[0]}
                  </p>

                  <div className="space-y-2.5 text-xs sm:text-sm text-slate-400">
                    <div className="flex items-start gap-2.5">
                      <span className="text-cyan-400 font-mono mt-0.5">›</span>
                      <p>{profile.about[1]}</p>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <span className="text-cyan-400 font-mono mt-0.5">›</span>
                      <p>{profile.about[2]}</p>
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-400 inline-block animate-pulse" />
                    <span>Robotics &amp; AI Engineering Student</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      sound.playBlip();
                      setIsTerminalOpen(true);
                    }}
                    className="text-cyan-400 hover:underline flex items-center gap-1 font-bold active:scale-95 transition-transform"
                  >
                    <Terminal size={13} />
                    <span>EXECUTE &apos;whoami&apos; IN CLI ↗</span>
                  </button>
                </div>
              </motion.div>

              {/* Hardware Diagnostic Metrics (5 cols) */}
              <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
                {quickStats.map((stat, idx) => (
                  <motion.div
                    key={stat.label}
                    initial={reduceMotion ? false : { opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: reduceMotion ? 0 : idx * 0.06 }}
                    whileHover={reduceMotion ? undefined : { x: 4 }}
                    className="p-4 bg-slate-900 border border-white/10 hover:border-cyan-400/50 hover:bg-slate-900/90 transition-all font-mono group cursor-default"
                  >
                    <div className="flex items-center justify-between text-[0.65rem] text-slate-500 uppercase tracking-wider mb-1">
                      <span>METRIC // 0{idx + 1}</span>
                      <span className="text-emerald-400 group-hover:drop-shadow-[0_0_6px_rgba(52,211,153,0.8)] transition-all">
                        NOMINAL
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 block mb-0.5">{stat.label}</span>
                    <span className="text-base sm:text-lg font-bold text-white tracking-tight block">
                      {stat.value}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Subsystem Disciplines Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
              {focusAreas.map((area, idx) => {
                const borderHover =
                  area.color === "cyan"
                    ? "glow-cyan"
                    : area.color === "violet"
                    ? "glow-violet"
                    : area.color === "amber"
                    ? "glow-amber"
                    : "glow-emerald";

                const icon =
                  area.color === "cyan" ? (
                    <Bot size={17} className="text-cyan-400" />
                  ) : area.color === "violet" ? (
                    <Sparkles size={17} className="text-violet-400" />
                  ) : area.color === "amber" ? (
                    <Layers size={17} className="text-amber-400" />
                  ) : (
                    <Cpu size={17} className="text-emerald-400" />
                  );

                return (
                  <motion.div
                    key={area.title}
                    initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.4, delay: reduceMotion ? 0 : idx * 0.07 }}
                    whileHover={reduceMotion ? undefined : { y: -4 }}
                    className={`bento-card ${borderHover} p-5 flex flex-col justify-between group cursor-default`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10 font-mono">
                        <span className="text-xs text-slate-500">{area.index}</span>
                        <div className="transition-transform duration-200 group-hover:scale-110 group-hover:rotate-6">
                          {icon}
                        </div>
                      </div>
                      <span className="text-[0.68rem] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                        {area.tag}
                      </span>
                      <h3 className="text-base font-bold text-white mb-2 tracking-tight group-hover:text-cyan-300 transition-colors">
                        {area.title}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed font-sans">{area.copy}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Section 02: Engineering Case Blueprints (Projects) */}
        <section id="projects" className="section border-t border-white/10 relative">
          <div className="page-width">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
            >
              <div>
                <div className="section-kicker">
                  <span className="kicker-index">02</span>
                  <span>ENGINEERING CASE BLUEPRINTS // RELEASES</span>
                </div>
                <h2 className="section-title">
                  Things engineered <br className="hidden sm:inline" />
                  <span className="text-amber-400">
                    to be explored.
                  </span>
                </h2>
                <p className="section-desc">
                  Featured builds across autonomous simulation, graphics engines, and mobile systems.
                </p>
              </div>

              {/* Subsystem Case Filters with Smooth Gliding Indicator */}
              <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-900 border border-white/10 self-start md:self-auto text-xs font-mono">
                {filterCategories.map((cat) => {
                  const isSelected = activeProjectFilter === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        sound.playClick();
                        setActiveProjectFilter(cat);
                      }}
                      className={`relative px-3 py-1.5 transition-colors ${
                        isSelected
                          ? "text-white font-bold"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {isSelected && (
                        <motion.span
                          layoutId="activeProjectFilter"
                          className="absolute inset-0 bg-slate-800 border border-white/20 -z-0"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{cat}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Engineering Case Schematics List */}
            <div className="space-y-8">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.title} project={project} index={index} />
              ))}
            </div>

            {/* Bottom GitHub Repository Command Strip */}
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              whileHover={reduceMotion ? undefined : { y: -2 }}
              className="mt-12 p-5 sm:p-6 bg-slate-900 border border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left corner-frame"
            >
              <div className="font-mono">
                <span className="text-cyan-400 text-xs font-bold block mb-1 uppercase tracking-wider">
                  REPOSITORY INDEX // GITHUB ARCHIVE
                </span>
                <h3 className="text-base font-bold text-white">Looking for experimental branches, tests &amp; commits?</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Commit history, raw sources, and architecture documentation.
                </p>
              </div>

              <motion.a
                whileHover={reduceMotion ? undefined : { scale: 1.02 }}
                whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => sound.playClick()}
                className="btn btn-secondary font-mono text-xs group"
              >
                <Github size={14} />
                <span>github.com/{profile.githubUsername}</span>
                <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.a>
            </motion.div>
          </div>
        </section>

        {/* Section 03: Subsystem Diagnostics Matrix (Skills) */}
        <section id="skills" className="section border-t border-white/10 relative">
          <div className="page-width">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              <div className="section-kicker">
                <span className="kicker-index">03</span>
                <span>SUBSYSTEM DIAGNOSTICS MATRIX</span>
              </div>

              <h2 className="section-title">
                A rigorous, expanding <br className="hidden sm:inline" />
                <span className="text-emerald-400">
                  engineering toolkit.
                </span>
              </h2>

              <p className="section-desc mb-8">
                Core technologies, low-level languages, and tools across my engineering stack.
              </p>
            </motion.div>

            <SkillsMatrix />
          </div>
        </section>

        {/* Section 04: Architecture Changelog & R&D Labs (Journey) */}
        <section id="journey" className="section border-t border-white/10 relative">
          <div className="page-width">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              <div className="section-kicker">
                <span className="kicker-index">04</span>
                <span>SYSTEM CHANGELOG &amp; ACTIVE R&amp;D</span>
              </div>

              <h2 className="section-title">
                Education, systems engineering, <br className="hidden sm:inline" />
                <span className="text-violet-400">
                  and active investigations.
                </span>
              </h2>

              <p className="section-desc mb-8">
                Academic milestones, independent systems software, and active research directions.
              </p>
            </motion.div>

            <Timeline />
          </div>
        </section>

        {/* Section 05: Technical Dispatch & Direct Channels (Contact) */}
        <section id="contact" className="section border-t border-white/10 relative">
          <div className="page-width">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: CTA Pitch & Social Details */}
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-5 space-y-6"
              >
                <div>
                  <div className="section-kicker">
                    <span className="kicker-index">05</span>
                    <span>COMMUNICATION DISPATCH</span>
                  </div>

                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight mb-4 font-display">
                    Let’s build something <br />
                    <span className="text-cyan-400">
                      extraordinary.
                    </span>
                  </h2>

                  <p className="text-sm text-slate-400 leading-relaxed font-sans">
                    Open for technical discussions, robotics collaboration, or engineering opportunities. Drop a message below.
                  </p>
                </div>

                {/* Direct Contact Cards (Solid, Clean) */}
                <div className="space-y-3 font-mono text-xs">
                  <motion.a
                    whileHover={reduceMotion ? undefined : { x: 4 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    href={"mailto:" + profile.email}
                    onClick={() => sound.playClick()}
                    className="p-4 bg-slate-900 border border-white/10 hover:border-cyan-400 flex items-center justify-between transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Mail size={15} className="text-cyan-400 group-hover:scale-110 transition-transform" />
                      <div>
                        <span className="text-[0.62rem] text-slate-500 block uppercase">DIRECT INBOX</span>
                        <span className="text-white group-hover:text-cyan-300 font-bold">{profile.email}</span>
                      </div>
                    </div>
                    <ArrowUpRight size={14} className="text-slate-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </motion.a>

                  <motion.a
                    whileHover={reduceMotion ? undefined : { x: 4 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sound.playClick()}
                    className="p-4 bg-slate-900 border border-white/10 hover:border-violet-400 flex items-center justify-between transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Github size={15} className="text-violet-400 group-hover:scale-110 transition-transform" />
                      <div>
                        <span className="text-[0.62rem] text-slate-500 block uppercase">PUBLIC REPOSITORIES</span>
                        <span className="text-white group-hover:text-violet-300 font-bold">github.com/{profile.githubUsername}</span>
                      </div>
                    </div>
                    <ArrowUpRight size={14} className="text-slate-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </motion.a>

                  <motion.a
                    whileHover={reduceMotion ? undefined : { x: 4 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.98 }}
                    transition={{ duration: 0.15 }}
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sound.playClick()}
                    className="p-4 bg-slate-900 border border-white/10 hover:border-cyan-400 flex items-center justify-between transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Linkedin size={15} className="text-cyan-400 group-hover:scale-110 transition-transform" />
                      <div>
                        <span className="text-[0.62rem] text-slate-500 block uppercase">PROFESSIONAL NETWORK</span>
                        <span className="text-white group-hover:text-cyan-300 font-bold">linkedin.com/in/{profile.linkedinUsername}</span>
                      </div>
                    </div>
                    <ArrowUpRight size={14} className="text-slate-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </motion.a>

                  <div className="p-3.5 bg-slate-900/60 border border-white/5 flex items-center justify-between text-slate-400">
                    <span className="uppercase text-[0.68rem]">ENGINEERING STATUS</span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 bg-emerald-400 rounded-full inline-block animate-pulse" />
                      <span>ONLINE // OPEN TO BUILD</span>
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Interactive Form */}
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:col-span-7"
              >
                <ContactForm />
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Industrial Footer */}
      <footer className="border-t border-white/10 bg-[#06080d] py-8">
        <div className="page-width flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2.5">
            <span className="font-bold text-white tracking-wider">ATHARV.OS</span>
            <span>//</span>
            <span>ROBOTICS &amp; ARTIFICIAL INTELLIGENCE LAB</span>
          </div>

          <div>
            <p>Engineered with curiosity, physics, and low-level code.</p>
          </div>

          <div className="flex items-center gap-4">
            <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href={"mailto:" + profile.email} className="hover:text-white transition-colors">
              Email
            </a>
            <button
              type="button"
              onClick={() => {
                sound.playBlip();
                setIsTerminalOpen(true);
              }}
              className="text-cyan-400 hover:underline"
            >
              CLI [~]
            </button>
            <a
              href="#home"
              onClick={() => sound.playClick()}
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <span>TOP</span>
              <ArrowDown size={11} className="rotate-180" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
