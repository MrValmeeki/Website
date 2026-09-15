"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const sync = () => setEnabled(finePointer.matches && !reduceMotion);
    sync();
    finePointer.addEventListener("change", sync);
    return () => finePointer.removeEventListener("change", sync);
  }, [reduceMotion]);

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const root = document.documentElement;

    const onPointerMove = (e: PointerEvent) => {
      setVisible(true);
      const x = e.clientX;
      const y = e.clientY;
      if (!frame) {
        frame = requestAnimationFrame(() => {
          root.style.setProperty("--cursor-x", `${x}px`);
          root.style.setProperty("--cursor-y", `${y}px`);
          frame = 0;
        });
      }
    };

    const onPointerOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        target.closest("a, button, [role='button'], input, textarea, select, .btn, summary")
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onPointerDown = () => setIsPressed(true);
    const onPointerUp = () => setIsPressed(false);
    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerover", onPointerOver, { passive: true });
    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerover", onPointerOver);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled || !visible) return null;

  return (
    <span
      className={`cursor-halo ${isHovered ? "is-hovered" : ""} ${isPressed ? "is-pressed" : ""}`}
      aria-hidden="true"
    />
  );
}
