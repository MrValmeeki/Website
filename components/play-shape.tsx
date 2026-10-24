"use client";

import { motion, useMotionValue } from "framer-motion";
import { useRef, type KeyboardEvent, type ReactNode, type RefObject } from "react";

export function PlayShape({ name, className, bounds, still, children }: {
  name: string;
  className: string;
  bounds: RefObject<HTMLDivElement | null>;
  still: boolean;
  children: ReactNode;
}) {
  const element = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  function move(event: KeyboardEvent<HTMLDivElement>) {
    const node = element.current;
    const parent = bounds.current;
    if (!node || !parent) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      x.set(0);
      y.set(0);
      return;
    }
    const step = event.shiftKey ? 32 : 12;
    const directions: Record<string, [number, number]> = {
      ArrowLeft: [-step, 0], ArrowRight: [step, 0],
      ArrowUp: [0, -step], ArrowDown: [0, step],
    };
    const direction = directions[event.key];
    if (!direction) return;
    event.preventDefault();
    x.set(Math.max(12 - node.offsetLeft, Math.min(parent.clientWidth - node.offsetLeft - node.offsetWidth - 12, x.get() + direction[0])));
    y.set(Math.max(36 - node.offsetTop, Math.min(parent.clientHeight - node.offsetTop - node.offsetHeight - 42, y.get() + direction[1])));
  }

  return <motion.div
    ref={element}
    className={className}
    role="button"
    tabIndex={0}
    aria-label={`Move ${name}`}
    aria-describedby="playground-help"
    onKeyDown={move}
    style={{ x, y }}
    drag={!still}
    dragConstraints={bounds}
    dragElastic={0.08}
    dragMomentum={false}
    whileDrag={{ scale: 1.04, cursor: "grabbing", zIndex: 6 }}
  >{children}</motion.div>;
}
