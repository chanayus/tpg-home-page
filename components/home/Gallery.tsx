"use client";

import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { cn } from "../../lib/cn";
import { Reveal } from "../Reveal";

interface SlideImage {
  image: string;
  desc?: string;
}

const slides: SlideImage[] = [
  { image: "/images/teaching1.jpg", desc: "บรรยากาศห้องเรียนสด" },
  { image: "/images/teaching2.jpg", desc: "ติวเข้มก่อนสอบจริง" },
  { image: "/images/course.jpg" },
  { image: "/images/comment.jpg", desc: "กิจกรรมเสริมนอกห้องเรียน" },
  { image: "/images/course.jpg" },
];

// gallery-prev / gallery-next คือ selector ที่ Swiper ใช้ผูกปุ่ม (navigation prop ด้านล่าง)
function NavArrow({ direction }: { direction: "prev" | "next" }) {
  const isPrev = direction === "prev";
  const Icon = isPrev ? HiChevronLeft : HiChevronRight;
  return (
    <button
      type="button"
      aria-label={isPrev ? "ภาพก่อนหน้า" : "ภาพถัดไป"}
      className={cn(
        "absolute top-1/2 z-1 hidden size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-brand-deep shadow-[0_8px_16px_rgba(120,0,60,0.2)] transition hover:bg-tint-pink sm:flex",
        isPrev ? "gallery-prev -left-2 sm:-left-5" : "gallery-next -right-2 sm:-right-5",
      )}
    >
      <Icon className="size-6" />
    </button>
  );
}

export function Gallery() {
  return (
    <section id="gallery" aria-labelledby="gallery-title" className="relative overflow-hidden py-section">
      <div className="container relative z-1">
        <Reveal as="h2" id="gallery-title" className="section-title mb-8">
          บรรยากาศ <span className="text-brand">"พี่มาติว"</span> The Progress ติวฟรีโรงเรียนทั่วประเทศ
        </Reveal>
      </div>

      <Reveal className="container" delay={0.35} amount="some">
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={16}
            slidesPerView={1.15}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.2 },
            }}
            navigation={{ prevEl: ".gallery-prev", nextEl: ".gallery-next" }}
            pagination={{ clickable: true, el: ".gallery-pagination" }}
            className="overflow-visible!"
          >
            {slides.map((slide, i) => (
              <SwiperSlide key={i}>
                <figure className="relative aspect-video overflow-hidden rounded-2xl shadow-[0_22px_44px_rgba(255,0,126,0.16)]">
                  <img src={slide.image} alt={slide.desc ?? ""} className="size-full object-cover" />
                  {slide.desc && (
                    <figcaption className="absolute inset-x-4 bottom-4 rounded-ui bg-black/55 px-4 py-2 text-center text-sm font-medium text-white backdrop-blur-sm">{slide.desc}</figcaption>
                  )}
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>

          <NavArrow direction="prev" />
          <NavArrow direction="next" />
        </div>

        <div
          className="gallery-pagination mt-6 flex items-center justify-center"
          style={
            {
              "--swiper-pagination-color": "var(--color-brand)",
              "--swiper-pagination-bullet-inactive-color": "var(--color-brand-deep)",
              "--swiper-pagination-bullet-inactive-opacity": "0.3",
            } as React.CSSProperties
          }
        />
      </Reveal>
    </section>
  );
}
