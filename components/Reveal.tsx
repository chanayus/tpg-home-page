"use client";

import { useEffect, type ComponentPropsWithoutRef, type ElementType, type ReactNode } from "react";
import { useAnimate, useInView, useReducedMotion, stagger, type AnimationOptions, type DOMKeyframesDefinition } from "motion/react";

const DEFAULT_KEYFRAMES: DOMKeyframesDefinition = { opacity: [0, 1], y: [24, 0] };
const DEFAULT_TRANSITION: AnimationOptions = { duration: 0.5, ease: "easeOut" };

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

export function Reveal<T extends ElementType = "div">({ as, children, stagger: staggerBy, delay = 0, amount = 0.3, repeat = false, keyframes, transition, ...rest }: RevealProps<T>) {
  const [scope, animate] = useAnimate<HTMLElement>();
  const isInView = useInView(scope, { once: !repeat, amount });
  const shouldReduceMotion = useReducedMotion();

  const mode = staggerBy === undefined ? "block" : "children";

  useEffect(() => {
    if (!isInView) return;

    const targets = mode === "children" ? Array.from(scope.current.children) : scope.current;

    // The pre-hide CSS keys off opacity, so custom keyframes that leave it out
    // would strand the content at opacity 0 — put it back in that case.
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
