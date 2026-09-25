"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useTransform, type MotionStyle, type MotionValue } from "motion/react";
import { IoClose } from "react-icons/io5";
import { cn } from "../../lib/cn";
import { Reveal } from "../Reveal";
import readingAreaSticker from "../../public/images/stickers/reading-area.webp";
import passExamSticker from "../../public/images/stickers/badge-pass-exam.webp";
import thumbsUpSticker from "../../public/images/stickers/thumbs-up.webp";
// import { doc, onSnapshot } from 'firebase/firestore';
// import { firestore } from '../utils/firebaseClient';

/* ---------- shared: ใช้ร่วมกันทั้งเวอร์ชัน desktop และ mobile ---------- */

const reviewBgCard = ["bg-tint-pink", "bg-tint-purple", "bg-tint-yellow"];

// ตำแหน่งการวางและหมุนของ review card แต่่ละอัน
const scatterSpots = [
  { top: "-2%", left: "4%", rotate: -4, ratio: "3/4", variant: 0 },
  { top: "38%", left: "84%", rotate: 5, ratio: "1/1", variant: 2 },
  { top: "8%", left: "40%", rotate: -3, ratio: "1/1", variant: 1 },
  { top: "32%", left: "12%", rotate: -4, ratio: "4/5", variant: 2 },
  { top: "2%", left: "80%", rotate: 5, ratio: "3/4", variant: 0 },
  { top: "32%", left: "40%", rotate: 6, ratio: "3/4", variant: 1 },
  { top: "70%", left: "4%", rotate: 6, ratio: "1/1", variant: 2 },
  { top: "56%", left: "74%", rotate: -3, ratio: "4/5", variant: 0 },
  { top: "70%", left: "36%", rotate: -5, ratio: "3/4", variant: 1 },
  { top: "85%", left: "82%", rotate: 5, ratio: "1/1", variant: 2 },
];

type Review = (typeof scatterSpots)[number] & { badge: string; bg: string; image: string };

// ข้อมูลรูปภาพ (mockup)
const mockupData = [
  ...Array(10)
    .keys()
    .map((i) => "/images/comment.jpg"),
];

// มีผลจริงเฉพาะ desktop pinned — ฝั่ง static ส่ง progress คงที่ 1 ทำให้ y = 0 เสมอ
const REVIEW_START = 0.05;
const REVIEW_END = 0.95;
const REVIEW_DURATION = ((REVIEW_END - REVIEW_START) / scatterSpots.length) * 2.2;
const REVIEW_STAGGER = (REVIEW_END - REVIEW_START - REVIEW_DURATION) / (scatterSpots.length - 1);
const REVIEW_RISE = 160;

function getReviewLayoutId(badge: string) {
  return `review-photo-${badge}`;
}

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
    <motion.figure
      style={{ ...style, aspectRatio: review.ratio, rotate: review.rotate, y }}
      className={cn("grid place-items-center rounded-xl p-2", review.bg, className)}
    >
      {onSelect ? (
        <button
          type="button"
          onClick={() => onSelect(review)}
          aria-label={`ดูรีวิว ${review.badge} แบบเต็ม`}
          className="block size-full cursor-zoom-in rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          <motion.img layoutId={getReviewLayoutId(review.badge)} style={{ opacity: isActive ? 0 : 1 }} className={"size-full rounded-xl object-cover"} src={review.image} alt="" />
        </button>
      ) : (
        <img className={"size-full rounded-xl object-cover"} src={review.image} alt="" />
      )}
    </motion.figure>
  );
}

/* ---------- desktop: scroll-pinned wall (lg only, off under prefers-reduced-motion) ---------- */

const STICKER_DURATION = 0.18;

const stickers = [
  { src: readingAreaSticker, alt: "สติกเกอร์การ์ตูน GO ลุยข้อสอบ", top: "12%", side: "left" as const, width: 168, rotate: 10, start: 0.1 },
  { src: passExamSticker, alt: "สติกเกอร์คนนี้สอบติด", top: "42%", side: "right" as const, width: 160, rotate: -16, start: 0.42 },
  { src: thumbsUpSticker, alt: "สติกเกอร์นิ้วโป้งให้กำลังใจ", top: "70%", side: "left" as const, width: 150, rotate: 12, start: 0.72 },
];

type Sticker = (typeof stickers)[number];

function StickerCharm({ sticker, progress }: { sticker: Sticker; progress: MotionValue<number> }) {
  const end = sticker.start + STICKER_DURATION;

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

function PinnedStudentComments({ data, selectedBadge, onSelect }: { data: Review[]; selectedBadge: string | null; onSelect: (review: Review) => void }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: rawProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });

  const scrollYProgress = useTransform(rawProgress, (v) => Math.min(1, Math.max(0, v)));
  const containerY = useTransform(scrollYProgress, [0, 1], ["100%", "-25%"]);

  return (
    <div ref={trackRef} className="relative h-[300vh]">
      <section id="results" aria-labelledby="results-title" className="grid-tint-bg sticky top-0 h-screen overflow-hidden bg-white py-section">
        <div className="container relative z-1 flex h-full flex-col items-center justify-center">
          <h2 id="results-title" className="text-stroke-lg spark-after text-center text-6xl text-balance">
            เสียงตอบรับจริงจากลูกศิษย์ <em className="text-brand not-italic">The Progress</em>
          </h2>
        </div>

        <motion.ul style={{ y: containerY }} className="absolute h-screen inset-y-0 left-1/2 z-2 w-full max-w-5xl -translate-x-1/2">
          {data.map((review, i) => (
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

// หน้าต่าง popup แสดงภาพ review แบบเต็มเมื่อกดคลิก

function ImageModal({ review, onClose }: { review: Review; onClose: () => void }) {
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
        layoutId={getReviewLayoutId(review.badge)}
        src={review.image}
        alt=""
        onClick={(event) => event.stopPropagation()}
        transition={shouldReduceMotion ? { duration: 0 } : { type: "spring", stiffness: 300, damping: 30 }}
        style={{ aspectRatio: 0.8 }}
        className="max-h-[88vh] max-w-[92vw] w-[min(92vw,640px)] rounded-xl object-cover shadow-[0_30px_60px_rgba(0,0,0,0.45)]"
      />
      <button
        type="button"
        onClick={onClose}
        aria-label="ปิดภาพ"
        className="absolute top-5 right-5 grid size-10 place-items-center rounded-full bg-white text-xl text-ink shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        <IoClose />
      </button>
    </motion.div>
  );
}

/* ---------- mobile: static grid wall (also the fallback under prefers-reduced-motion) ---------- */

function StaticStudentComments({ data }: { data: Review[] }) {
  const settledProgress = useMotionValue(1);

  return (
    <Reveal as="section" id="results" aria-labelledby="results-title" amount="some" className="deco-sparkles grid-tint-bg relative overflow-hidden bg-white py-section">
      <div className="container relative z-1">
        <h2 id="results-title" className="section-title">
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
          {data.map((review, i) => (
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

export function StudentComments() {
  const isDesktop = useSyncExternalStore(subscribeIsDesktop, getIsDesktopSnapshot, getIsDesktopServerSnapshot);
  const shouldReduceMotion = useReducedMotion();
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);

  const [commentImages, setCommentImages] = useState<string[] | null>(null);

  // useEffect(() => {
  //   const d = doc(firestore, "settings", "home");
  //   const unsub = onSnapshot(
  //     d,
  //     (snap) => {
  //       const data = snap.data() as { commentImages?: string[] } | undefined;
  //       const arr = data?.commentImages || [];
  //       setCommentImages(arr.length > 0 ? arr : null);
  //     },
  //     () => setCommentImages(null),
  //   );
  //   return () => unsub();
  // }, []);

  const images = commentImages ?? mockupData;

  if (images.length === 0) return null;

  const data = scatterSpots.map((spot, i) => ({
    ...spot,
    badge: String(i + 1).padStart(2, "0"),
    bg: reviewBgCard[spot.variant],
    image: mockupData[i],
  }));

  return (
    <>
      {isDesktop && !shouldReduceMotion ? <PinnedStudentComments selectedBadge={selectedReview?.badge ?? null} onSelect={setSelectedReview} data={data} /> : <StaticStudentComments data={data} />}
      <AnimatePresence>{selectedReview && <ImageModal review={selectedReview} onClose={() => setSelectedReview(null)} />}</AnimatePresence>
    </>
  );
}
