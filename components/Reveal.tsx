"use client";

import { useEffect, type ComponentPropsWithoutRef, type ElementType, type ReactNode } from "react";
import { useAnimate, useInView, useReducedMotion, stagger, type AnimationOptions, type DOMKeyframesDefinition } from "motion/react";

// shorter travel + a hint of scale so the spring's bounce actually reads, matching the
// snappy, playful springs used for the Hero stickers/sparks instead of a flat linear ease
const DEFAULT_KEYFRAMES: DOMKeyframesDefinition = { opacity: [0, 1], y: [18, 0], scale: [0.96, 1] };
const DEFAULT_TRANSITION: AnimationOptions = { type: "spring", stiffness: 260, damping: 20, mass: 0.9 };

function endStateOf(keyframes: DOMKeyframesDefinition): DOMKeyframesDefinition {
  return Object.fromEntries(Object.entries(keyframes).map(([key, value]) => [key, Array.isArray(value) ? value[value.length - 1] : value])) as DOMKeyframesDefinition;
}

type RevealOwnProps = {
  children: ReactNode;
  /**
   * Seconds between each direct child. Omit and the whole block reveals as
   * one unit — pass a number to have its children come in one after another.
   */
  stagger?: number;
  /** Seconds to wait after the block scrolls into view. */
  delay?: number;
  /** How much of the block must be visible before it triggers (0-1, or "some"/"all"). */
  amount?: number | "some" | "all";
  /** Replay every time it re-enters the viewport instead of only the first. */
  repeat?: boolean;

  keyframes?: DOMKeyframesDefinition;

  transition?: AnimationOptions;
};

type RevealProps<T extends ElementType> = RevealOwnProps & {
  as?: T;
} & Omit<ComponentPropsWithoutRef<T>, keyof RevealOwnProps | "as">;

export function Reveal<T extends ElementType = "div">({ as, children, stagger: staggerBy, delay = 0.2, amount = 0.5, repeat = false, keyframes, transition, ...rest }: RevealProps<T>) {
  const [scope, animate] = useAnimate<HTMLElement>();
  const isInView = useInView(scope, { once: !repeat, amount });
  const shouldReduceMotion = useReducedMotion();

  const mode = staggerBy === undefined ? "block" : "children";

  useEffect(() => {
    if (!isInView) return;

    const targets = mode === "children" ? Array.from(scope.current.children) : scope.current;

    const custom = keyframes ?? DEFAULT_KEYFRAMES;
    const resolved: DOMKeyframesDefinition = "opacity" in custom ? custom : { ...custom, opacity: [0, 1] };

    const animation = shouldReduceMotion
      ? animate(targets, endStateOf(resolved), { duration: 0 })
      : animate(targets, resolved, {
          ...(transition ?? DEFAULT_TRANSITION),
          delay: staggerBy === undefined ? delay : stagger(staggerBy, { startDelay: delay }),
        });

    animation.then(() => {
      if (scope.current) scope.current.dataset.reveal = "done";
    });
  }, [animate, scope, isInView, mode, staggerBy, delay, shouldReduceMotion, keyframes, transition]);

  const Tag = (as ?? "div") as ElementType;

  return (
    <Tag {...rest} ref={scope} data-reveal={mode}>
      {children}
    </Tag>
  );
}
