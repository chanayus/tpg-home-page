"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { A11y, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// import { collection, getDocs, query, orderBy } from 'firebase/firestore';
// import { firestore } from '../utils/firebaseClient';

import "swiper/css";
import "swiper/css/a11y";

import { Reveal } from "../Reveal";

interface Course {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  imageUrl?: string;
  isFreeTrial?: boolean;
  gradientType: "purple" | "blue" | "green" | "orange";
}

// ใช้เป็นข้อมูลตั้งต้นระหว่างที่ยังไม่ต่อ Firestore จริง (ดู effect ที่คอมเมนต์ไว้ด้านล่าง)
const mockCourses: Course[] = [
  {
    id: "tgat",
    subtitle: "TGAT",
    title: "คอร์ส TGAT ครบทุกพาร์ท",
    description: "ปูพื้นฐาน เทคนิคทำโจทย์ พร้อม Mock Test วิเคราะห์รายบุคคล",
    price: 0,
    gradientType: "purple",
  },
  {
    id: "a-level-math",
    subtitle: "A-LEVEL คณิต",
    title: "คอร์ส A-Level คณิต 1/2",
    description: "เนื้อหาครบหลักสูตร พร้อมคลาสเสริมก่อนสอบจริง",
    price: 0,
    gradientType: "blue",
  },
  {
    id: "a-level-eng",
    subtitle: "A-LEVEL ENG",
    title: "คอร์ส A-Level ภาษาอังกฤษ",
    description: "คลังศัพท์ ไวยากรณ์ โจทย์แนวข้อสอบจริงจากพี่เกด",
    price: 0,
    gradientType: "green",
  },
  {
    id: "tgat-2",
    subtitle: "TGAT",
    title: "คอร์ส TGAT ครบทุกพาร์ท",
    description: "ปูพื้นฐาน เทคนิคทำโจทย์ พร้อม Mock Test วิเคราะห์รายบุคคล",
    price: 0,
    gradientType: "purple",
  },
  {
    id: "a-level-math-2",
    subtitle: "A-LEVEL คณิต",
    title: "คอร์ส A-Level คณิต 1/2",
    description: "เนื้อหาครบหลักสูตร พร้อมคลาสเสริมก่อนสอบจริง",
    price: 0,
    gradientType: "blue",
  },
  {
    id: "a-level-eng-2",
    subtitle: "A-LEVEL ENG",
    title: "คอร์ส A-Level ภาษาอังกฤษ",
    description: "คลังศัพท์ ไวยากรณ์ โจทย์แนวข้อสอบจริงจากพี่เกด",
    price: 0,
    gradientType: "green",
  },
];

export function RecommendedCourses() {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const prevId = `course-prev-${uid}`;
  const nextId = `course-next-${uid}`;
  const paginationId = `course-pagination-${uid}`;

  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [loading, setLoading] = useState(false);

  const showControls = courses.length > 4;

  // useEffect(() => {
  //   const fetchRecommended = async () => {
  //     try {
  //       const ref = collection(firestore, "courseOrderings");
  //       const q = query(ref, orderBy("createdAt", "desc"));
  //       const snap = await getDocs(q);
  //       const data = snap.docs
  //         .map((doc) => {
  //           const d = doc.data();
  //           return {
  //             id: doc.id,
  //             title: d.title || "",
  //             subtitle: d.subtitle || "",
  //             description: d.description || "",
  //             price: d.price || 0,
  //             imageUrl: d.imageUrl || d.thumbnail || d.coverImage || "",
  //             isFreeTrial: Boolean(d.isFreeTrial),
  //             gradientType: d.gradientType || "purple",
  //             isRecommended: Boolean(d.isRecommended),
  //           } as Course & { isRecommended: boolean };
  //         })
  //         .filter((c) => c.isRecommended);
  //       setCourses(data);
  //     } catch {
  //       setCourses([]);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchRecommended();
  // }, []);

  if (loading || courses.length === 0) return null;

  return (
    <Reveal as="section" aria-labelledby="courses-title" className="border-t border-brand/10 bg-blush py-section">
      <div className="container mb-8 flex flex-wrap items-center justify-between gap-5 ">
        <h2 id="courses-title" className="font-display text-section font-black text-ink">
          คอร์สที่<span className="text-brand">แนะนำ</span>
        </h2>
        <Link href="/courses" className="text-sm font-bold text-brand">
          ดูคอร์สทั้งหมด →
        </Link>
      </div>

      <div className="container max-lg:px-0 overflow-hidden">
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          breakpoints={{
            0: { slidesPerView: 1.2, spaceBetween: 16 },
            640: { slidesPerView: 2.2, spaceBetween: 20 },
            1024: { slidesPerView: 3, spaceBetween: 20 },
            1280: { slidesPerView: 4, spaceBetween: 20 },
          }}
          navigation={showControls && { prevEl: `#${prevId}`, nextEl: `#${nextId}` }}
          pagination={showControls && { el: `#${paginationId}`, clickable: true }}
          a11y={{
            prevSlideMessage: "คอร์สก่อนหน้า",
            nextSlideMessage: "คอร์สถัดไป",
            paginationBulletMessage: "ไปที่คอร์สชุดที่ {{index}}",
          }}
          wrapperTag="ul"
          className="max-lg:px-5!"
        >
          {courses.map((course) => (
            <SwiperSlide tag="li" key={course.id} className="h-auto">
              <article className="relative flex flex-col h-78 border border-brand/35 bg-white">
                <p className="absolute -top-px right-5 z-1 bg-brand px-3 py-1.25 text-xs font-extrabold text-white">{course.subtitle}</p>
                <div className="h-32.5 shrink-0" style={{ backgroundImage: "repeating-linear-gradient(135deg, #fdeef5 0 10px, #fce3ee 10px 20px)" }}>
                  <img
                    src={course.imageUrl || "https://images.unsplash.com/photo-1635424239131-32dc44986b56?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-4">
                  <h3 className="line-clamp-2 font-display text-lg font-bold text-ink">{course.title}</h3>

                  <p className="line-clamp-3 text-sm text-ink/60">{course.description}</p>
                  <Link href="/courses" className="mt-auto text-sm font-bold text-brand">
                    ดูรายละเอียด →
                  </Link>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        {showControls && (
          <div className="mt-6 flex items-center justify-center gap-4">
            <button
              type="button"
              id={prevId}
              aria-label="คอร์สก่อนหน้า"
              className="flex size-10 items-center justify-center border border-brand/35 text-brand transition-colors hover:border-brand hover:bg-brand hover:text-cream"
            >
              <HiChevronLeft size={20} />
            </button>
            <div id={paginationId} className="flex items-center justify-center gap-2" />
            <button
              type="button"
              id={nextId}
              aria-label="คอร์สถัดไป"
              className="flex size-10 items-center justify-center border border-brand/35 text-brand transition-colors hover:border-brand hover:bg-brand hover:text-cream"
            >
              <HiChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </Reveal>
  );
}
