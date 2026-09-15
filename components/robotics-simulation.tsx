"use client";

import { useEffect, useRef, useState } from "react";
import { sound } from "@/lib/sound";

interface Obstacle {
  x: number;
  y: number;
  w: number;
  h: number;
}

export function RoboticsSimulation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [telemetry, setTelemetry] = useState({
    speed: "0.0",
    heading: "000.0",
    distance: "0",
    lidarRays: 16,
    activeContacts: 0,
    status: "AUTONOMOUS NAVIGATION",
  });
  const [showLidar, setShowLidar] = useState(true);

  // State refs for simulation loop
  const simState = useRef({
    robot: {
      x: 80,
      y: 120,
      angle: 0, // radians
      targetAngle: 0,
      speed: 0,
      maxSpeed: 2.2,
      angularSpeed: 0.05,
      size: 18,
    },
    target: {
      x: 280,
      y: 180,
      active: true,
    },
    obstacles: [
      { x: 160, y: 60, w: 45, h: 45 },
      { x: 190, y: 170, w: 55, h: 35 },
      { x: 310, y: 90, w: 40, h: 50 },
    ] as Obstacle[],
    showLidar: true,
  });

  useEffect(() => {
    simState.current.showLidar = showLidar;
  }, [showLidar]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", onResize);

    // Click canvas to drop waypoint
    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      simState.current.target = { x: clickX, y: clickY, active: true };
      sound.playClick(950, 0.03);
    };
    canvas.addEventListener("click", handleCanvasClick);

    // Frame ticker
    let tickCount = 0;

    const loop = () => {
      ctx.fillStyle = "#07090e";
      ctx.fillRect(0, 0, width, height);

      // 1. Draw subtle background coordinate grid (Solid lines, no gradients)
      ctx.strokeStyle = "#151b26";
      ctx.lineWidth = 1;
      const gridSize = 30;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      const { robot, target, obstacles, showLidar: activeShowLidar } = simState.current;

      // 2. Draw Obstacles
      ctx.fillStyle = "#161e2c";
      ctx.strokeStyle = "#253347";
      ctx.lineWidth = 1.5;
      obstacles.forEach((obs) => {
        ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
        ctx.strokeRect(obs.x, obs.y, obs.w, obs.h);

        // Technical crosshair mark on obstacle
        ctx.strokeStyle = "#95a5a6";
        ctx.beginPath();
        ctx.moveTo(obs.x + obs.w / 2 - 4, obs.y + obs.h / 2);
        ctx.lineTo(obs.x + obs.w / 2 + 4, obs.y + obs.h / 2);
        ctx.moveTo(obs.x + obs.w / 2, obs.y + obs.h / 2 - 4);
        ctx.lineTo(obs.x + obs.w / 2, obs.y + obs.h / 2 + 4);
        ctx.stroke();
      });

      // 3. Draw Target Waypoint
      if (target.active) {
        ctx.strokeStyle = "#f59e0b";
        ctx.lineWidth = 1.5;
        // Inner circle
        ctx.beginPath();
        ctx.arc(target.x, target.y, 7, 0, Math.PI * 2);
        ctx.stroke();

        // Target crosshair
        ctx.beginPath();
        ctx.moveTo(target.x - 12, target.y);
        ctx.lineTo(target.x + 12, target.y);
        ctx.moveTo(target.x, target.y - 12);
        ctx.lineTo(target.x, target.y + 12);
        ctx.stroke();

        // Pulse ring
        const pulse = (Date.now() % 1500) / 1500;
        ctx.beginPath();
        ctx.arc(target.x, target.y, 8 + pulse * 14, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(245, 158, 11, ${1 - pulse})`;
        ctx.stroke();

        // Trajectory line from robot to target
        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = "#f59e0b";
        ctx.beginPath();
        ctx.moveTo(robot.x, robot.y);
        ctx.lineTo(target.x, target.y);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // 4. Robot Autonomous Kinematic Steering
      const dx = target.x - robot.x;
      const dy = target.y - robot.y;
      const distance = Math.hypot(dx, dy);

      if (distance > 10) {
        robot.targetAngle = Math.atan2(dy, dx);
        // Normalize angle difference (-PI to PI)
        let diff = robot.targetAngle - robot.angle;
        while (diff < -Math.PI) diff += Math.PI * 2;
        while (diff > Math.PI) diff -= Math.PI * 2;

        robot.angle += Math.sign(diff) * Math.min(Math.abs(diff), robot.angularSpeed);

        // Accelerate
        robot.speed = Math.min(robot.speed + 0.08, robot.maxSpeed);
        robot.x += Math.cos(robot.angle) * robot.speed;
        robot.y += Math.sin(robot.angle) * robot.speed;
      } else {
        // Destination reached, decelerate
        robot.speed = Math.max(0, robot.speed - 0.15);
      }

      // Boundary constrain
      robot.x = Math.max(20, Math.min(width - 20, robot.x));
      robot.y = Math.max(20, Math.min(height - 20, robot.y));

      // 5. Lidar Sensor Simulation (Rays casting 360 deg)
      let contacts = 0;
      const rayCount = 16;
      const maxLidarRange = 100;

      if (activeShowLidar) {
        for (let i = 0; i < rayCount; i++) {
          const rayAngle = robot.angle + (i / rayCount) * Math.PI * 2;
          let rayDist = maxLidarRange;
          let hasHit = false;

          // Check hit against obstacles
          for (let step = 8; step < maxLidarRange; step += 4) {
            const rx = robot.x + Math.cos(rayAngle) * step;
            const ry = robot.y + Math.sin(rayAngle) * step;

            for (const obs of obstacles) {
              if (rx >= obs.x && rx <= obs.x + obs.w && ry >= obs.y && ry <= obs.y + obs.h) {
                rayDist = step;
                hasHit = true;
                contacts++;
                break;
              }
            }
            if (hasHit) break;
          }

          // Draw ray
          ctx.strokeStyle = hasHit ? "#ec4899" : "#95a5a6";
          ctx.lineWidth = hasHit ? 1.5 : 0.75;
          ctx.beginPath();
          ctx.moveTo(robot.x, robot.y);
          ctx.lineTo(robot.x + Math.cos(rayAngle) * rayDist, robot.y + Math.sin(rayAngle) * rayDist);
          ctx.stroke();

          // Draw contact point
          if (hasHit) {
            ctx.fillStyle = "#ec4899";
            ctx.beginPath();
            ctx.arc(
              robot.x + Math.cos(rayAngle) * rayDist,
              robot.y + Math.sin(rayAngle) * rayDist,
              2.5,
              0,
              Math.PI * 2
            );
            ctx.fill();
          }
        }
      }

      // 6. Draw Robot Chassis & Hardware Markers
      ctx.save();
      ctx.translate(robot.x, robot.y);
      ctx.rotate(robot.angle);

      // Outer chassis
      ctx.fillStyle = "#0c1524";
      ctx.strokeStyle = "#95a5a6";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-16, -12, 32, 24, 4);
      ctx.fill();
      ctx.stroke();

      // Omnidirectional Wheels
      ctx.fillStyle = "#1e293b";
      ctx.fillRect(-14, -15, 8, 3);
      ctx.fillRect(6, -15, 8, 3);
      ctx.fillRect(-14, 12, 8, 3);
      ctx.fillRect(6, 12, 8, 3);

      // Heading forward arrow
      ctx.fillStyle = "#95a5a6";
      ctx.beginPath();
      ctx.moveTo(14, 0);
      ctx.lineTo(6, -5);
      ctx.lineTo(6, 5);
      ctx.closePath();
      ctx.fill();

      // Center sensor dome
      ctx.fillStyle = "#10b981";
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();

      // Update telemetry state occasionally
      tickCount++;
      if (tickCount % 8 === 0) {
        const deg = (((robot.angle * 180) / Math.PI + 360) % 360).toFixed(1);
        setTelemetry({
          speed: robot.speed.toFixed(1),
          heading: deg.padStart(5, "0"),
          distance: Math.round(distance).toString(),
          lidarRays: rayCount,
          activeContacts: contacts,
          status: distance > 10 ? "WAYPOINT ACQUIRED" : "TARGET REACHED // IDLE",
        });
      }

      animId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("click", handleCanvasClick);
    };
  }, []);

  const resetTarget = () => {
    sound.playClick();
    simState.current.target = { x: 260, y: 150, active: true };
    simState.current.robot.x = 70;
    simState.current.robot.y = 100;
  };

  return (
    <div className="border border-white/15 rounded-lg bg-[#07090e] overflow-hidden shadow-2xl relative font-mono">
      {/* Top Hardware Control Bar */}
      <div className="px-3.5 py-2 bg-slate-900 border-b border-white/10 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-cyan-400 rounded-none inline-block animate-pulse" />
          <span className="font-bold text-white tracking-wider text-[0.72rem]">
            ROBOTICS LAB // AUTONOMOUS_SYS_V2
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              sound.playClick();
              setShowLidar((prev) => !prev);
            }}
            className={`px-2 py-0.5 rounded text-[0.65rem] border transition-colors ${
              showLidar
                ? "bg-cyan-950 text-cyan-300 border-cyan-500/50"
                : "bg-slate-950 text-slate-400 border-white/10"
            }`}
          >
            LIDAR: {showLidar ? "ON" : "OFF"}
          </button>
          <button
            type="button"
            onClick={resetTarget}
            className="px-2 py-0.5 rounded text-[0.65rem] bg-slate-950 text-amber-400 border border-amber-500/40 hover:bg-amber-950/40 transition-colors"
          >
            RESET
          </button>
        </div>
      </div>

      {/* Main Canvas Viewport */}
      <div className="relative w-full h-64 sm:h-72 cursor-crosshair">
        <canvas ref={canvasRef} className="w-full h-full block" />

        {/* Viewport Overlay Hints */}
        <div className="absolute bottom-2 left-2.5 text-[0.65rem] text-slate-400 bg-slate-950/80 px-2 py-0.5 border border-white/10 pointer-events-none">
          CLICK ANYWHERE TO DROP WAYPOINT
        </div>
        <div className="absolute top-2 right-2 text-[0.65rem] text-emerald-400 bg-slate-950/80 px-2 py-0.5 border border-emerald-500/30 pointer-events-none">
          {telemetry.status}
        </div>
      </div>

      {/* Industrial Telemetry Strip (Solid Colors - No Gradients) */}
      <div className="grid grid-cols-4 gap-0 border-t border-white/10 bg-slate-950 text-xs">
        <div className="p-2.5 border-r border-white/10">
          <span className="text-[0.62rem] text-slate-500 block">VELOCITY</span>
          <span className="text-cyan-400 font-bold text-[0.82rem]">{telemetry.speed} m/s</span>
        </div>
        <div className="p-2.5 border-r border-white/10">
          <span className="text-[0.62rem] text-slate-500 block">HEADING</span>
          <span className="text-white font-bold text-[0.82rem]">{telemetry.heading}°</span>
        </div>
        <div className="p-2.5 border-r border-white/10">
          <span className="text-[0.62rem] text-slate-500 block">DISTANCE</span>
          <span className="text-amber-400 font-bold text-[0.82rem]">{telemetry.distance} px</span>
        </div>
        <div className="p-2.5">
          <span className="text-[0.62rem] text-slate-500 block">LIDAR PINGS</span>
          <span className="text-rose-400 font-bold text-[0.82rem]">{telemetry.activeContacts} HITS</span>
        </div>
      </div>
    </div>
  );
}
