import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { cn } from "../lib/cn";

// selectorClass ต้องตรงกับ navigation={{ prevEl, nextEl }} ของ Swiper ที่ใช้ปุ่มนี้
// swiper-button-lock: Swiper ใส่ให้ตอนสไลด์ไม่ได้ แต่เราไม่ได้ import swiper/css/navigation เลยต้องซ่อนเอง
export function SliderArrow({ direction, selectorClass, label }: { direction: "prev" | "next"; selectorClass: string; label: string }) {
  const isPrev = direction === "prev";
  const Icon = isPrev ? HiChevronLeft : HiChevronRight;
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        "absolute top-1/2 z-1 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-deep shadow-[0_8px_16px_rgba(120,0,60,0.2)] transition hover:bg-tint-pink disabled:pointer-events-none disabled:opacity-40 sm:flex [&.swiper-button-lock]:hidden",
        isPrev ? "-left-2 sm:-left-5" : "-right-2 sm:-right-5",
        selectorClass,
      )}
    >
      <Icon className="size-6" />
    </button>
  );
}
