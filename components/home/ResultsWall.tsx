"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useTransform, type MotionStyle, type MotionValue } from "motion/react";
import { IoClose } from "react-icons/io5";
import { Reveal } from "../Reveal";
import mascotGoSticker from "@/public/images/stickers/mascot-go.webp";
import passExamSticker from "@/public/images/stickers/badge-pass-exam.webp";
import thumbsUpSticker from "@/public/images/stickers/thumbs-up.webp";

/* ---------- shared: ใช้ร่วมกันทั้งเวอร์ชัน desktop และ mobile ---------- */

const tileVariants = [
  { bg: "bg-tint-pink", text: "text-brand-deep", shadow: "shadow-[0_14px_28px_rgba(255,0,126,0.12)]" },
  { bg: "bg-tint-purple", text: "text-purple-deep", shadow: "shadow-[0_14px_28px_rgba(161,69,255,0.14)]" },
  { bg: "bg-tint-yellow", text: "text-gold-ink", shadow: "shadow-[0_14px_28px_rgba(255,173,2,0.16)]" },
];

type TileVariant = (typeof tileVariants)[number];

function tileClassName(variant: TileVariant) {
  return `grid place-items-center rounded-photo p-2 text-center text-base leading-normal font-medium ${variant.bg} ${variant.text} ${variant.shadow}`;
}

const scatterSpots = [
  { top: "-2%", left: "4%", rotate: -6, ratio: "3/4", variant: 0 },
  { top: "38%", left: "84%", rotate: 5, ratio: "1/1", variant: 2 },
  { top: "8%", left: "40%", rotate: -3, ratio: "1/1", variant: 1 },
  { top: "32%", left: "12%", rotate: -4, ratio: "4/5", variant: 2 },
  { top: "2%", left: "80%", rotate: 5, ratio: "3/4", variant: 0 },
  { top: "32%", left: "40%", rotate: 6, ratio: "3/4", variant: 1 },
  { top: "70%", left: "4%", rotate: 8, ratio: "1/1", variant: 2 },
  { top: "56%", left: "74%", rotate: -3, ratio: "4/5", variant: 0 },
  { top: "70%", left: "36%", rotate: -6, ratio: "3/4", variant: 1 },
  { top: "85%", left: "82%", rotate: 5, ratio: "1/1", variant: 2 },
];

// `top`/`left` only matter to the desktop scatter layout — the mobile grid ignores them and lets CSS place the cards.
const reviews = scatterSpots.map((spot, i) => ({
  ...spot,
  badge: String(i + 1).padStart(2, "0"),
  variant: tileVariants[spot.variant],
}));

type Review = (typeof reviews)[number];

const REVIEW_START = 0.05;
const REVIEW_END = 0.95;
const REVIEW_DURATION = ((REVIEW_END - REVIEW_START) / reviews.length) * 2.2;
const REVIEW_STAGGER = (REVIEW_END - REVIEW_START - REVIEW_DURATION) / (reviews.length - 1);
const REVIEW_RISE = 160;

const REVIEW_IMAGE = "/images/comment.jpg";
const REVIEW_IMAGE_CLASS = "size-full rounded-photo object-cover";

function reviewLayoutId(badge: string) {
  return `review-photo-${badge}`;
}

/**
 * The photo tile both walls render. `index`/`progress` drive the desktop scroll-rise via
 * useTransform — the mobile grid passes a MotionValue that's pinned past REVIEW_END, so the
 * same transform just resolves to its settled value (y: 0) with no extra branching needed.
 * `onSelect` is what turns a card interactive (button + shared layoutId into the lightbox);
 * the mobile grid omits it and renders a plain, non-clickable photo.
 */
function ReviewCard({
  review,
  index,
  progress,
  style,
  className,
  isActive,
  onSelect,
}: {
  review: Review;
  index: number;
  progress: MotionValue<number>;
  style?: MotionStyle;
  className?: string;
  isActive?: boolean;
  onSelect?: (review: Review) => void;
}) {
  const start = REVIEW_START + index * REVIEW_STAGGER;
  const end = start + REVIEW_DURATION;
  const y = useTransform(progress, [start, end], [REVIEW_RISE, 0]);

  return (
    <motion.figure style={{ ...style, aspectRatio: review.ratio, rotate: review.rotate, y }} className={`${tileClassName(review.variant)} ${className ?? ""}`}>
      {onSelect ? (
        <button
          type="button"
          onClick={() => onSelect(review)}
          aria-label={`ดูรีวิว ${review.badge} แบบเต็ม`}
          className="block size-full cursor-zoom-in rounded-photo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <motion.img layoutId={reviewLayoutId(review.badge)} style={{ opacity: isActive ? 0 : 1 }} className={REVIEW_IMAGE_CLASS} src={REVIEW_IMAGE} alt="" />
        </button>
      ) : (
        <img className={REVIEW_IMAGE_CLASS} src={REVIEW_IMAGE} alt="" />
      )}
    </motion.figure>
  );
}

/* ---------- desktop: scroll-pinned wall (lg only, off under prefers-reduced-motion) ---------- */

const STICKER_DURATION = 0.18;

const stickers = [
  { src: mascotGoSticker, alt: "สติกเกอร์การ์ตูน GO ลุยข้อสอบ", top: "12%", side: "left" as const, width: 168, rotate: 10, start: 0.1 },
  { src: passExamSticker, alt: "สติกเกอร์คนนี้สอบติด", top: "42%", side: "right" as const, width: 190, rotate: -16, start: 0.42 },
  { src: thumbsUpSticker, alt: "สติกเกอร์นิ้วโป้งให้กำลังใจ", top: "78%", side: "left" as const, width: 150, rotate: 12, start: 0.72 },
];

type Sticker = (typeof stickers)[number];

function StickerCharm({ sticker, progress }: { sticker: Sticker; progress: MotionValue<number> }) {
  const end = sticker.start + STICKER_DURATION;
  // slides in from just past the section's clipped edge, not the viewport edge, so it's fully hidden at rest
  const offscreen = sticker.side === "left" ? -(sticker.width + 200) : sticker.width + 200;

  const x = useTransform(progress, [sticker.start, end], [offscreen, 0]);
  const opacity = useTransform(progress, [sticker.start, end], [0, 1]);
  const scale = useTransform(progress, [sticker.start, end], [0.7, 1]);

  return (
    <motion.div
      style={{ top: sticker.top, [sticker.side]: "2%", width: sticker.width, rotate: sticker.rotate, x, opacity, scale }}
      className="pointer-events-none absolute z-3 drop-shadow-[0_14px_26px_rgba(0,0,0,0.2)]"
    >
      <Image src={sticker.src} alt={sticker.alt} className="h-auto w-full" sizes={`${sticker.width}px`} />
    </motion.div>
  );
}

function PinnedResultsWall({ selectedBadge, onSelect }: { selectedBadge: string | null; onSelect: (review: Review) => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: rawProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  // Motion's scroll progress briefly overshoots outside [0,1] right as the sticky
  // section releases, which snapped card opacity to 0 without this clamp.
  const scrollYProgress = useTransform(rawProgress, (v) => Math.min(1, Math.max(0, v)));
  const containerY = useTransform(scrollYProgress, [0, 1], ["100%", "-25%"]);

  return (
    <div ref={trackRef} className="relative h-[300vh]">
      <section id="results" aria-labelledby="results-title" className="grid-tint-bg sticky top-0 h-screen overflow-hidden bg-white py-section">
        <div className="container relative z-1 flex h-full flex-col items-center justify-center">
          <motion.h2 id="results-title" className="text-stroke-lg spark-after text-center font-display text-6xl font-extrabold text-balance">
            เสียงตอบรับจริงจากลูกศิษย์ <em className="text-brand not-italic">The Progress</em>
          </motion.h2>
        </div>

        <motion.ul style={{ y: containerY }} className="absolute h-screen inset-y-0 left-1/2 z-2 w-full max-w-5xl -translate-x-1/2">
          {reviews.map((review, i) => (
            <ReviewCard
              key={review.badge}
              review={review}
              index={i}
              progress={scrollYProgress}
              isActive={selectedBadge === review.badge}
              onSelect={onSelect}
              style={{ top: review.top, left: review.left }}
              className="absolute w-44"
            />
          ))}
        </motion.ul>

        {stickers.map((sticker) => (
          <StickerCharm key={sticker.alt} sticker={sticker} progress={scrollYProgress} />
        ))}
      </section>
    </div>
  );
}

// Only PinnedResultsWall's ReviewCards open this (the mobile grid's cards aren't clickable),
// so it lives with the rest of the desktop flow even though it's rendered from ResultsWall().
function ResultsLightbox({ review, onClose }: { review: Review; onClose: () => void }) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label="ภาพรีวิวขนาดเต็ม"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 grid place-items-center bg-ink/85 p-6"
    >
      <motion.img
        layoutId={reviewLayoutId(review.badge)}
        src={REVIEW_IMAGE}
        alt=""
        onClick={(event) => event.stopPropagation()}
        transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}
        style={{ aspectRatio: 0.8 }}
        className="max-h-[88vh] max-w-[92vw] w-[min(92vw,640px)] rounded-photo object-cover shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
      />
      <button
        type="button"
        onClick={onClose}
        aria-label="ปิดภาพ"
        className="absolute top-5 right-5 grid size-10 place-items-center rounded-full bg-white text-xl font-bold text-ink shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        <IoClose />
      </button>
    </motion.div>
  );
}

/* ---------- mobile: static grid wall (also the fallback under prefers-reduced-motion) ---------- */

function StaticResultsWall() {
  // ReviewCard's scroll-rise transform is fed a value already past REVIEW_END, so it clamps to its settled state (y: 0) — no scroll here, just a static, always-settled card.
  const settledProgress = useMotionValue(1);

  return (
    <Reveal as="section" id="results" aria-labelledby="results-title" amount="some" className="deco-sparkles grid-tint-bg relative overflow-hidden bg-white py-section">
      <div className="container relative z-1">
        <h2 id="results-title" className="text-stroke-lg spark-after text-section font-bold text-balance">
          เสียงตอบรับจริงจากลูกศิษย์ <em className="text-brand not-italic">The Progress</em>
        </h2>

        <Reveal
          as="ul"
          keyframes={{ scale: [0.75, 1], opacity: [0, 1] }}
          transition={{ type: "spring" }}
          stagger={0.05}
          amount="some"
          className="mt-9 grid grid-cols-[repeat(auto-fill,minmax(min(100%,150px),1fr))] gap-4"
        >
          {reviews.map((review, i) => (
            <li key={review.badge}>
              <ReviewCard review={review} index={i} progress={settledProgress} />
            </li>
          ))}
        </Reveal>
      </div>
    </Reveal>
  );
}

/* ---------- orchestration: pick a variant, own the lightbox's open/close state ---------- */

const DESKTOP_QUERY = "(min-width: 1024px)";

function subscribeIsDesktop(callback: () => void) {
  const mq = window.matchMedia(DESKTOP_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getIsDesktopSnapshot() {
  return window.matchMedia(DESKTOP_QUERY).matches;
}

function getIsDesktopServerSnapshot() {
  return false;
}

export function ResultsWall() {
  const isDesktop = useSyncExternalStore(subscribeIsDesktop, getIsDesktopSnapshot, getIsDesktopServerSnapshot);
  const shouldReduceMotion = useReducedMotion();
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  return (
    <>
      {isDesktop && !shouldReduceMotion ? <PinnedResultsWall selectedBadge={selectedReview?.badge ?? null} onSelect={setSelectedReview} /> : <StaticResultsWall />}
      <AnimatePresence>{selectedReview && <ResultsLightbox review={selectedReview} onClose={() => setSelectedReview(null)} />}</AnimatePresence>
    </>
  );
}
