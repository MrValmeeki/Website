"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type MagneticLinkProps = HTMLMotionProps<"a"> & {
  children: ReactNode;
};

export function MagneticLink({
  children,
  className,
  onPointerMove,
  onPointerLeave,
  ...props
}: MagneticLinkProps) {
  const reduceMotion = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 320, damping: 18, mass: 0.3 });
  const y = useSpring(rawY, { stiffness: 320, damping: 18, mass: 0.3 });

  return (
    <motion.a
      {...props}
      className={className}
      style={reduceMotion ? undefined : { x, y }}
      onPointerMove={(event) => {
        if (!reduceMotion && event.pointerType === "mouse") {
          const rect = event.currentTarget.getBoundingClientRect();
          rawX.set(((event.clientX - rect.left) / rect.width - 0.5) * 9);
          rawY.set(((event.clientY - rect.top) / rect.height - 0.5) * 9);
        }
        onPointerMove?.(event);
      }}
      onPointerLeave={(event) => {
        rawX.set(0);
        rawY.set(0);
        onPointerLeave?.(event);
      }}
    >
      {children}
    </motion.a>
  );
}
