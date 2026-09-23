"use client";
import { useEffect, useState } from "react";
import { Button } from "../Button";
import { Reveal } from "../Reveal";
import { IconSpark } from "./SvgProps";
// import { collection, getDocs, query, orderBy } from 'firebase/firestore';
// import { firestore } from '../utils/firebaseClient';

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

// gradientType เป็น category สำหรับข้อมูลจริง (Firestore) ส่วนสีจริงที่ใช้ขึ้นกับ GRADIENT_BY_TYPE ด้านล่าง
const GRADIENT_BY_TYPE: Record<Course["gradientType"], string> = {
  purple: "linear-gradient(135deg, #a145ff, #ff007e)",
  blue: "linear-gradient(135deg, #ff5aa9, #ff007e)",
  green: "linear-gradient(135deg, #06c755, #00a884)",
  orange: "linear-gradient(135deg, #ffad02, #ff007e 95%)",
};

const mockupData: Course[] = [
  {
    id: "tgat",
    title: "คอร์ส TGAT ครบทุกพาร์ท",
    subtitle: "TGAT",
    description: "ปูพื้นฐาน เทคนิคทำโจทย์ พร้อม Mock Test วิเคราะห์รายบุคคล",
    price: 3900,
    imageUrl: "/images/course.jpg",
    gradientType: "blue",
  },
  {
    id: "a-level-math",
    title: "คอร์ส A-Level คณิต 1/2",
    subtitle: "A-LEVEL คณิต",
    description: "เนื้อหาครบหลักสูตร พร้อมคลาสเสริมก่อนสอบจริง",
    price: 4500,
    imageUrl: "/images/course.jpg",
    gradientType: "purple",
  },
  {
    id: "a-level-eng",
    title: "คอร์ส A-Level ภาษาอังกฤษ",
    subtitle: "A-LEVEL ENG",
    description: "คลังศัพท์ ไวยากรณ์ โจทย์แนวข้อสอบจริงจากพี่เกด",
    price: 3500,
    imageUrl: "/images/course.jpg",
    gradientType: "orange",
  },
];

export function RecommendedCourses() {
  const [courses, setCourses] = useState<Course[]>(mockupData);
  const [loading, setLoading] = useState(false);

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
    <section id="courses" aria-labelledby="courses-title" className="deco-sparkles relative overflow-hidden bg-linear-to-b from-tint-pink to-blush py-section">
      <div className="container relative z-1">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-5">
          <Reveal as="h2" id="courses-title" className="section-title">
            คอร์สที่<em className="text-brand not-italic">แนะนำ</em>
          </Reveal>
          <Reveal>
            <Button variant="line" size="sm" href="/courses">
              ดูคอร์สทั้งหมด →
            </Button>
          </Reveal>
        </div>

        <ul className="grid max-w-290 grid-cols-[repeat(auto-fit,minmax(min(100%,270px),1fr))] gap-6">
          {courses.map((course) => (
            <Reveal as="li" key={course.id}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_22px_44px_rgba(255,0,126,0.16)] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_28px_52px_rgba(255,0,126,0.24)]">
                <figure style={{ background: GRADIENT_BY_TYPE[course.gradientType] }} className="relative flex aspect-video items-end overflow-hidden px-6.5 pb-4">
                  <div className="grain-overlay absolute" />
                  <IconSpark className="absolute top-[14%] right-[9%] w-11 text-white/90" />
                  <IconSpark className="absolute top-[54%] right-[26%] w-4.5 text-white/60" />
                  <span className="text-stroke z-1 relative border border-brand/50 rounded-ui bg-white px-3.5 py-1 font-display text-base font-bold text-brand-deep shadow-[0_8px_16px_rgba(120,0,60,0.2)]">
                    {course.subtitle}
                  </span>

                  <img src={course.imageUrl ?? "/images/course.jpg"} className="size-full absolute top-0 left-0 object-cover" alt="" />
                </figure>
                <div className="flex flex-1 flex-col items-start gap-2.5 px-6.5 pt-5.5 pb-8">
                  <h3 className="font-display text-xl font-bold text-ink">{course.title}</h3>
                  <p className="text-base leading-relaxed text-ink-soft">{course.description}</p>
                  <Button variant="line" href="/courses" className="mt-auto px-5.5 py-2.25 text-base">
                    ดูรายละเอียด →
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
