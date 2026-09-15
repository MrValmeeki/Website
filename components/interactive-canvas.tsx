"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  strokeColor: string;
}

export function InteractiveCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const mouse = {
      x: -1000,
      y: -1000,
      radius: 130,
    };

    const isMobile = window.innerWidth < 768;
    const nodeCount = isMobile ? 28 : 55;
    const maxDistance = isMobile ? 85 : 120;

    const solidPalette = [
      { fill: "#95a5a6", rgb: "149, 165, 166" },
      { fill: "#8b5cf6", rgb: "139, 92, 246" },
      { fill: "#f59e0b", rgb: "245, 158, 11" },
      { fill: "#10b981", rgb: "16, 185, 129" },
    ];

    const nodes: Node[] = [];
    for (let i = 0; i < nodeCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const paletteItem = solidPalette[Math.floor(Math.random() * solidPalette.length)];
      nodes.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 1.8 + 1.2,
        color: paletteItem.fill,
        strokeColor: paletteItem.rgb,
      });
    }

    const onResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const onPointerLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerleave", onPointerLeave);

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 0.5;

      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (1 - dist / mouse.radius) * 3;
          const angle = Math.atan2(dy, dx);
          n.x -= Math.cos(angle) * force;
          n.y -= Math.sin(angle) * force;
        }

        // Draw solid node
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();

        // Connect with solid lines (no gradients)
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const distBetween = Math.hypot(n.x - n2.x, n.y - n2.y);

          if (distBetween < maxDistance) {
            const alpha = (1 - distBetween / maxDistance) * 0.22;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(${n.strokeColor}, ${alpha})`;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <div className="hero-canvas-wrap" aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="w-full h-full block opacity-60"
        style={{ pointerEvents: "none" }}
      />
    </div>
  );
}
