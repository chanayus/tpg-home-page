"use client";

import { useEffect, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { useAnimate, useInView, useReducedMotion } from "motion/react";

type SquiggleRevealProps = {
  children: ReactNode;
  /** How much of the block must be visible before it triggers (0-1, or "some"/"all"). */
  amount?: number | "some" | "all";
} & Omit<ComponentPropsWithoutRef<"div">, "children">;

/** Draws nested `<path pathLength={1}>` strokes in on scroll — same technique as the Hero squiggle, but scroll-triggered instead of on mount. */
export function SquiggleReveal({ children, amount = 0.5, ...rest }: SquiggleRevealProps) {
  const [scope, animate] = useAnimate<HTMLDivElement>();
  const isInView = useInView(scope, { once: true, amount });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;

    const animation = shouldReduceMotion ? animate("path", { strokeDashoffset: 0 }, { duration: 0 }) : animate("path", { strokeDashoffset: [1, 0] }, { duration: 1.1, ease: "easeInOut" });

    animation.then(() => {
      if (scope.current) scope.current.dataset.squiggleReveal = "done";
    });
  }, [animate, scope, isInView, shouldReduceMotion]);

  return (
    <div {...rest} ref={scope} data-squiggle-reveal="pending">
      {children}
    </div>
  );
}
