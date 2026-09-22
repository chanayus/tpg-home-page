import type { SVGProps } from "react";

export function IconSpark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...props}>
      <path fill="currentColor" d="M12 0c.9 7.4 4.6 11.1 12 12-7.4.9-11.1 4.6-12 12-.9-7.4-4.6-11.1-12-12C7.4 11.1 11.1 7.4 12 0z" />
    </svg>
  );
}

export function IconSquiggle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 520 760" aria-hidden="true" {...props}>
      <path
        d="M330 -40C180 40 150 150 300 215S470 380 330 445 180 610 330 680c70 32 100 65 90 120"
        fill="none"
        stroke="currentColor"
        strokeWidth="86"
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={1}
      />
    </svg>
  );
}
