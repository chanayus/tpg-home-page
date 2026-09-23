import Link, { type LinkProps } from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "../lib/cn";

type Variant = "solid" | "white" | "glass" | "line" | "line-solid" | "nav";
type Size = "sm" | "md" | "lg";

const BASE = [
  "btn flex items-center justify-center gap-2 rounded-ui font-bold whitespace-nowrap text-stroke",
  "transition-all duration-200 ease-out",
  "[--btn-shadow:color-mix(in_oklab,var(--brand)_45%,transparent)]",
  "active:translate-y-0 active:shadow-[0_4px_10px_-2px_var(--btn-shadow)]",
];

const VARIANT_CLASS: Record<Variant, string> = {
  solid: "text-white bg-brand hover:bg-brand-hover",
  white: "bg-white text-brand-deep hover:bg-white/80 ",
  glass: "bg-white/20 text-white border border-white/20 backdrop-blur hover:bg-white/35",
  line: "bg-tint-pink text-brand-deep border border-brand-deep/20 hover:bg-brand-deep/15",
  "line-solid": "bg-line-green text-white hover:bg-green-600",
  nav: "bg-white text-brand-deep hover:bg-blush hover:translate-y-0! active:translate-y-0!",
};

const SIZE_CLASS: Record<Size, string> = {
  lg: "px-6 py-2 text-lg sm:px-8 sm:py-3",
  md: "px-5 py-2",
  sm: "px-4 py-2 text-sm",
};

type CommonProps = {
  variant: Variant;
  /** Omit to control padding/font-size entirely via `className`. */
  size?: Size;
  className?: string;
};

type ButtonAsButtonProps = CommonProps & Omit<ComponentPropsWithoutRef<"button">, keyof CommonProps> & { href?: undefined };
type ButtonAsLinkProps = CommonProps & Omit<LinkProps, keyof CommonProps> & Omit<ComponentPropsWithoutRef<"a">, keyof CommonProps | keyof LinkProps> & { href: LinkProps["href"] };

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export function Button({ variant, size, className, ...props }: ButtonProps) {
  const classes = cn(BASE, VARIANT_CLASS[variant], size && SIZE_CLASS[size], className);

  if (props.href !== undefined) {
    const { href, ...rest } = props;
    return <Link href={href} className={classes} {...rest} />;
  }

  const { type = "button", ...rest } = props;
  return <button type={type} className={classes} {...rest} />;
}
