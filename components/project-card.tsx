"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Code2, Github, Orbit, Play, Radio, RotateCcw, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/data/projects";
import { sound } from "@/lib/sound";

interface ProjectCardProps {
  project: Project;
  index: number;
}

// 1. Interactive N-Body Gravity Simulation with Live Presets
function CosmicCanvasMini() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activePreset, setActivePreset] = useState<"solar" | "binary" | "chaos">("solar");

  interface Body {
    x: number;
    y: number;
    vx: number;
    vy: number;
    mass: number;
    color: string;
    trail: { x: number; y: number }[];
  }

  const bodiesRef = useRef<Body[]>([]);

  const loadPreset = (preset: "solar" | "binary" | "chaos", width: number, height: number) => {
    setActivePreset(preset);
    sound.playClick(1000, 0.03);
    const cx = width / 2;
    const cy = height / 2;

    if (preset === "solar") {
      bodiesRef.current = [
        { x: cx, y: cy, vx: 0, vy: 0, mass: 700, color: "#f59e0b", trail: [] },
        { x: cx + 45, y: cy, vx: 0, vy: 3.1, mass: 8, color: "#8b5cf6", trail: [] },
        { x: cx - 75, y: cy, vx: 0, vy: -2.4, mass: 14, color: "#95a5a6", trail: [] },
        { x: cx, y: cy + 100, vx: 1.9, vy: 0, mass: 10, color: "#ec4899", trail: [] },
      ];
    } else if (preset === "binary") {
      bodiesRef.current = [
        { x: cx - 35, y: cy, vx: 0, vy: -1.6, mass: 350, color: "#95a5a6", trail: [] },
        { x: cx + 35, y: cy, vx: 0, vy: 1.6, mass: 350, color: "#f59e0b", trail: [] },
        { x: cx, y: cy - 90, vx: 2.1, vy: 0, mass: 10, color: "#8b5cf6", trail: [] },
      ];
    } else {
      // Chaos
      bodiesRef.current = [
        { x: cx - 50, y: cy - 30, vx: 1.2, vy: -1.2, mass: 280, color: "#ec4899", trail: [] },
        { x: cx + 50, y: cy + 30, vx: -1.2, vy: 1.2, mass: 280, color: "#95a5a6", trail: [] },
        { x: cx, y: cy - 60, vx: 1.5, vy: 1.1, mass: 180, color: "#f59e0b", trail: [] },
      ];
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const width = (canvas.width = canvas.offsetWidth);
    const height = (canvas.height = canvas.offsetHeight);

    loadPreset("solar", width, height);
    const G = 0.6;

    const render = () => {
      ctx.fillStyle = "#07090e";
      ctx.fillRect(0, 0, width, height);

      const bodies = bodiesRef.current;

      // Gravity calculations
      for (let i = 0; i < bodies.length; i++) {
        const b1 = bodies[i];
        for (let j = 0; j < bodies.length; j++) {
          if (i === j) continue;
          const b2 = bodies[j];
          const dx = b2.x - b1.x;
          const dy = b2.y - b1.y;
          const dist = Math.max(Math.hypot(dx, dy), 14);
          const force = (G * b1.mass * b2.mass) / (dist * dist);
          b1.vx += (force / b1.mass) * (dx / dist);
          b1.vy += (force / b1.mass) * (dy / dist);
        }

        b1.x += b1.vx;
        b1.y += b1.vy;

        b1.trail.push({ x: b1.x, y: b1.y });
        if (b1.trail.length > 20) b1.trail.shift();

        // Solid orbit path
        if (b1.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(b1.trail[0].x, b1.trail[0].y);
          for (let t = 1; t < b1.trail.length; t++) {
            ctx.lineTo(b1.trail[t].x, b1.trail[t].y);
          }
          ctx.strokeStyle = b1.color;
          ctx.lineWidth = 0.75;
          ctx.stroke();
        }

        // Solid celestial body
        ctx.beginPath();
        const r = b1.mass > 300 ? 6.5 : b1.mass > 100 ? 5 : 3.5;
        ctx.arc(b1.x, b1.y, r, 0, Math.PI * 2);
        ctx.fillStyle = b1.color;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    // Click to add planet
    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      sound.playClick(1200, 0.02);

      const angle = Math.atan2(clickY - height / 2, clickX - width / 2) + Math.PI / 2;
      const speed = 2.3;
      bodiesRef.current.push({
        x: clickX,
        y: clickY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        mass: Math.random() * 10 + 6,
        color: ["#95a5a6", "#10b981", "#f59e0b", "#ec4899"][Math.floor(Math.random() * 4)],
        trail: [],
      });
      if (bodiesRef.current.length > 10) bodiesRef.current.splice(1, 1);
    };

    canvas.addEventListener("click", handleCanvasClick);

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener("click", handleCanvasClick);
    };
  }, []);

  return (
    <div className="relative w-full h-full bg-[#07090e] flex flex-col justify-between p-4 border border-violet-500/30">
      {/* Top Header with Preset Switches */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-violet-400 inline-block" />
          <span className="text-violet-400 font-bold tracking-wider text-[0.72rem]">
            COSMIC SIMULATOR // NUMERICAL G
          </span>
        </div>

        {/* Orbit Presets */}
        <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded border border-white/10">
          {(["solar", "binary", "chaos"] as const).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => {
                if (canvasRef.current) {
                  loadPreset(p, canvasRef.current.offsetWidth, canvasRef.current.offsetHeight);
                }
              }}
              className={`px-2 py-0.5 rounded text-[0.65rem] uppercase font-mono transition-colors ${
                activePreset === p
                  ? "bg-violet-950 text-violet-300 font-bold border border-violet-500/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Canvas Viewport */}
      <div className="absolute inset-0 cursor-crosshair">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="relative z-10 flex items-center justify-between text-[0.68rem] font-mono text-slate-400 pt-2 border-t border-white/10 bg-slate-950/80 px-2 py-1">
        <span className="text-cyan-400">CLICK TO SPAWN ORBITING BODY</span>
        <span className="text-slate-400">G-SOLVER: 60 FPS</span>
      </div>
    </div>
  );
}

// 2. Pixel C++ Engine Inspector for AshVale
function AshValeVisual() {
  const [spriteState, setSpriteState] = useState<"combat" | "idle" | "hitbox">("combat");

  return (
    <div className="relative w-full h-full bg-[#0d0f17] flex flex-col justify-between p-4 border border-amber-500/30">
      {/* Top Header with Debug Modes */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-amber-400 inline-block" />
          <span className="text-amber-400 font-bold tracking-wider text-[0.72rem]">
            ASHVALE // C++ ENGINE LOOP
          </span>
        </div>

        <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded border border-amber-500/30">
          {(["combat", "idle", "hitbox"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              onClick={() => {
                sound.playClick();
                setSpriteState(mode);
              }}
              className={`px-2 py-0.5 rounded text-[0.65rem] uppercase font-mono transition-colors ${
                spriteState === mode
                  ? "bg-amber-950 text-amber-300 font-bold border border-amber-500/40"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Center Sprite Stage */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center">
        <div
          className={`w-28 h-28 border rounded bg-slate-900 flex items-center justify-center relative shadow-lg ${
            spriteState === "hitbox" ? "border-red-500 border-dashed" : "border-amber-500/40"
          }`}
        >
          <div className="w-14 h-14 rounded bg-amber-950 border border-amber-400 flex items-center justify-center relative">
            <span className="font-mono text-xs font-bold text-amber-300">
              {spriteState === "combat" ? "ATK_01" : spriteState === "idle" ? "IDLE_0" : "HITBOX"}
            </span>
            {spriteState === "combat" && (
              <div className="absolute -right-2 -top-2 w-4 h-4 bg-red-500 rounded-none animate-ping" />
            )}
          </div>

          <div className="absolute -bottom-2 px-2 py-0.5 rounded bg-black text-[0.62rem] font-mono text-emerald-400 border border-emerald-500/40">
            FRAME: 16.6ms (60FPS)
          </div>
        </div>

        {/* Engine Profiling Metrics */}
        <div className="mt-4 flex items-center gap-4 text-[0.7rem] font-mono text-slate-300 bg-slate-950 px-3 py-1 rounded border border-white/10">
          <span className="text-amber-400">ALLOCS: 0</span>
          <span className="text-cyan-400">DRAW CALLS: 12</span>
          <span className="text-emerald-400">MEM: 14.2 MB</span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 flex items-center justify-between text-[0.68rem] font-mono text-slate-400 pt-2 border-t border-amber-500/20 bg-slate-950 px-2 py-1">
        <span>SDL2 GRAPHICS PIPELINE</span>
        <span className="text-amber-400 font-bold">STATE: COMPILED</span>
      </div>
    </div>
  );
}

// 3. Geofence Radar Preview for WakeMeThere
function WakeMeThereVisual() {
  const [targetDist, setTargetDist] = useState(1.2);

  const pingGPS = () => {
    sound.playClick(1100, 0.03);
    setTargetDist((prev) => (prev > 0.4 ? Number((prev - 0.2).toFixed(1)) : 1.2));
  };

  return (
    <div className="relative w-full h-full bg-[#0e1214] flex flex-col justify-between p-4 border border-cyan-500/30">
      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <Radio size={14} className="text-cyan-400" />
          <span className="text-cyan-400 font-bold tracking-wider text-[0.72rem]">
            WAKEMETHERE // GEOFENCE CONTROLLER
          </span>
        </div>
        <button
          type="button"
          onClick={pingGPS}
          className="text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded border border-emerald-500/40 text-[0.65rem] hover:bg-emerald-900/40 transition-colors"
        >
          [PING GPS]
        </button>
      </div>

      {/* Destination Card */}
      <div className="relative z-10 max-w-[260px] mx-auto p-3.5 rounded bg-slate-900 border border-cyan-500/30 text-xs font-mono w-full shadow-lg">
        <div className="flex items-center justify-between text-[0.68rem] text-slate-400 mb-1">
          <span>TARGET GEOFENCE</span>
          <span className="text-cyan-300 font-bold">RADIUS: 500m</span>
        </div>
        <p className="font-bold text-white text-sm">Destination Station Arrival</p>
        <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[0.72rem]">
          <span className="text-slate-300">Distance: {targetDist} km</span>
          <span className={`font-bold ${targetDist <= 0.5 ? "text-rose-400 animate-pulse" : "text-emerald-400"}`}>
            {targetDist <= 0.5 ? "ALARM TRIGGERED!" : "TRACKING IN BOUNDS"}
          </span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 flex items-center justify-between text-[0.68rem] font-mono text-slate-400 pt-2 border-t border-cyan-500/20 bg-slate-950 px-2 py-1">
        <span>KOTLIN / JETPACK COMPOSE / ROOM</span>
        <span className="text-cyan-400 font-bold">GPS: LOCKED</span>
      </div>
    </div>
  );
}

// 4. Minimalist Publishing Preview for Mini-Blog
function MiniBlogVisual() {
  return (
    <div className="relative w-full h-full bg-[#08120e] flex flex-col justify-between p-4 border border-emerald-500/30">
      <div className="relative z-10 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <Code2 size={14} className="text-emerald-400" />
          <span className="text-emerald-400 font-bold tracking-wider text-[0.72rem]">
            MINI-BLOG // DISPATCH STREAM
          </span>
        </div>
        <span className="text-slate-400 text-[0.68rem] bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
          FIRESTORE CLOUD
        </span>
      </div>

      <div className="relative z-10 my-auto space-y-2 max-w-xs mx-auto w-full">
        <div className="p-3 rounded bg-slate-900 border border-emerald-500/30 text-xs font-mono">
          <div className="text-[0.68rem] text-emerald-400 font-bold">LATEST DISPATCH #14</div>
          <p className="text-slate-200 mt-1">C++ low-level memory control vs high-level numerical Python simulations.</p>
        </div>
        <div className="p-3 rounded bg-slate-900/60 border border-white/5 text-xs font-mono opacity-60">
          <div className="text-[0.68rem] text-slate-400">DISPATCH #13</div>
          <p className="text-slate-300 mt-1">Real-time background geofencing algorithms on modern Android runtimes.</p>
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-between text-[0.68rem] font-mono text-slate-400 pt-2 border-t border-emerald-500/20 bg-slate-950 px-2 py-1">
        <span>FIREBASE AUTH + CRUD</span>
        <span className="text-emerald-400 font-bold">PUBLISHED</span>
      </div>
    </div>
  );
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const reduceMotion = useReducedMotion();

  const renderVisual = () => {
    switch (project.kind) {
      case "orbit":
        return <CosmicCanvasMini />;
      case "pixel":
        return <AshValeVisual />;
      case "route":
        return <WakeMeThereVisual />;
      case "pulse":
        return <MiniBlogVisual />;
      default:
        return null;
    }
  };

  const accentColorMap: Record<string, { border: string; text: string }> = {
    amber: { border: "hover:border-amber-400", text: "text-amber-400" },
    violet: { border: "hover:border-violet-400", text: "text-violet-400" },
    cyan: { border: "hover:border-cyan-400", text: "text-cyan-400" },
    rose: { border: "hover:border-rose-400", text: "text-rose-400" },
    emerald: { border: "hover:border-emerald-400", text: "text-emerald-400" },
  };

  const themeStyle = accentColorMap[project.accent] || accentColorMap.cyan;

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.45, delay: reduceMotion ? 0 : Math.min(index * 0.06, 0.2) }}
      className="w-full corner-frame"
    >
      {/* Engineering Case Blueprint (Flat, Zero 3D Tilt, Clean Borders, No Gradients) */}
      <article
        className={`relative grid lg:grid-cols-12 gap-0 rounded-none bg-[#090c13] border border-white/15 ${themeStyle.border} transition-colors duration-200`}
      >
        {/* Visual Simulation Column (7 cols on desktop, spacious independent headers) */}
        <div
          className={`lg:col-span-7 h-64 sm:h-80 lg:h-auto min-h-[290px] relative border-b lg:border-b-0 ${
            index % 2 === 1 ? "lg:order-2 lg:border-l" : "lg:border-r"
          } border-white/15 overflow-hidden`}
        >
          {renderVisual()}
        </div>

        {/* Blueprint Details Column (5 cols on desktop) */}
        <div className={`lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between ${index % 2 === 1 ? "lg:order-1" : ""}`}>
          <div>
            {/* Top Industrial Case Header (Cleanly separated, NO overlap!) */}
            <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-white/10 text-xs font-mono">
              <span className="font-bold text-white bg-slate-900 px-2.5 py-0.5 border border-white/20">
                CASE // 00{project.number}
              </span>
              <span className={`font-semibold uppercase tracking-wider ${themeStyle.text}`}>
                {project.category}
              </span>
            </div>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 tracking-tight">
              {project.title}
            </h3>

            {/* Tagline */}
            <p className="text-sm font-medium text-slate-300 mb-3 leading-snug font-mono">
              {project.tagline}
            </p>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-5 font-normal">
              {project.description}
            </p>

            {/* Engineering Specs Grid */}
            <div className="grid grid-cols-3 gap-2 py-3 mb-5 border-y border-white/10 text-[0.7rem] font-mono">
              {project.stats.map((stat) => (
                <div key={stat.label}>
                  <span className="text-slate-500 block text-[0.62rem]">{stat.label}</span>
                  <span className="text-slate-200 font-semibold truncate block">{stat.value}</span>
                </div>
              ))}
            </div>

            {/* Technologies Pills */}
            <div className="flex flex-wrap gap-1.5 mb-6" aria-label="Technologies used">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-none text-[0.72rem] font-mono text-slate-300 bg-slate-950 border border-white/10"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/10">
            <a
              href={project.href}
              target="_blank"
              rel="noreferrer"
              onClick={() => sound.playClick(900, 0.03)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-none text-xs font-mono font-bold text-white bg-slate-900 hover:bg-slate-800 border border-white/20 hover:border-white/50 transition-all group"
              aria-label={`View source code for ${project.title} on GitHub`}
            >
              <Github size={14} />
              <span>Inspect Source</span>
              <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <span className="text-[0.68rem] font-mono text-slate-400">
              {project.label}
            </span>
          </div>
        </div>
      </article>
    </motion.div>
  );
}
