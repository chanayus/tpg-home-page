"use client";

import Image, { type StaticImageData } from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { HiCheckBadge } from "react-icons/hi2";
import studentBoyArt from "../../public/images/student-boy-art.png";
import studentGirlArt from "../../public/images/student-girl-art.png";
import tKedPhoto from "../../public/images/t-ked.webp";
import tWinPhoto from "../../public/images/t-win.webp";
import { cn } from "../../lib/cn";
import { Reveal } from "../Reveal";

const instructors = [
  {
    name: "พี่วิน",
    photo: tWinPhoto,
    role: "ผู้ก่อตั้ง · ผู้ดูแลวิชา TGAT2-3 และคณิตศาสตร์",
    school: "เศรษฐศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
    quote: `"เรื่องที่ยาก จะง่ายขึ้นเสมอ เพราะพี่เข้าใจน้อง"`,
    points: [
      `ประสบการณ์การสอนในแวดวงวิชาการมากกว่า 9 ปี`,
      `ผู้เขียนหนังสือ TGAT1+TGAT2 และ TGAT2+TGAT3 สำนักพิมพ์ Think Beyond`,
      `วิทยากรรับเชิญโรงเรียนชั้นนำระดับประเทศมากมาย`,
      `เจ้าของโครงการติวฟรีเพื่อเด็กไทย "พี่มาติว"`,
    ],
    photoRotate: -2,
  },
  {
    name: "พี่เกด",
    photo: tKedPhoto,
    role: "ผู้ก่อตั้ง · ผู้ดูแลวิชา TGAT 1 และภาษาอังกฤษ",
    school: "ป.โท การสอนภาษาอังกฤษ ธรรมศาสตร์",
    quote: `"ภาษาอังกฤษไม่ได้วัดว่าเรารู้กี่คำ แต่วัดว่าเราใช้สิ่งที่รู้ได้แค่ไหน"`,
    points: [`ประสบการณ์การสอนในแวดวงวิชาการมากกว่า 9 ปี`, `ผู้เขียนหนังสือ Best Seller “900 คลังศัพท์คัดพิเศษ”`, `วิทยากรรับเชิญโรงเรียนชั้นนำระดับประเทศมากมาย`, `เจ้าของมหกรรมการศึกษา TCAS SPACE`],
    photoRotate: 2,
  },
];

function InstructorPhoto({ photo, rotate, className }: { photo: StaticImageData; rotate: number; className?: string }) {
  return (
    <figure style={{ rotate: `${rotate}deg` }} className={cn("shadow-[0_18px_34px_rgba(120,0,60,0.22)] relative bg-white overflow-hidden rounded-md shrink-0 p-1.5", className)}>
      <div className="bg-grad-photo rounded">
        <Image src={photo} alt="" className="block size-full object-cover object-top" sizes="(max-width: 640px) 200px, 280px" />
      </div>
    </figure>
  );
}

export function Instructors() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="team" aria-labelledby="instructors-title" className="relative z-0 py-section">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -z-10"
        style={{ top: "4%", right: "3%", width: "10rem", rotate: 8 }}
        animate={shouldReduceMotion ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image src={studentGirlArt} alt="" className="block h-auto w-full" />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute z-1 bottom-[-14%] max-xl:hidden"
        style={{ left: "2%", width: "11rem", rotate: -6 }}
        animate={shouldReduceMotion ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image src={studentBoyArt} alt="" className="block h-auto w-full" />
      </motion.div>

      <hgroup className="container relative z-1">
        <Reveal as="h2" id="instructors-title" className="section-title">
          ทีมผู้สอนสุดจะ<em className="text-brand not-italic">เริ่ด</em>
        </Reveal>
      </hgroup>

      <div className="relative z-1 flex max-lg:flex-col container gap-4 mt-8">
        {instructors.map((inst, index) => (
          <Reveal
            key={inst.name}
            keyframes={{ opacity: [0, 1], y: [40, 0], scale: [0.96, 1] }}
            delay={0.25 + index * 0.2}
            transition={{ type: "spring", stiffness: 90, damping: 16 }}
            amount="some"
            className="flex w-full items-center justify-center lg:items-stretch"
          >
            <article className="mx-auto flex w-full max-w-4xl border border-brand-deep/20 flex-col items-start xl:gap-8 gap-6 gap-y-8 rounded-panel bg-white lg:p-10 p-6 lg:pr-4 shadow-[0_22px_44px_rgba(255,0,126,0.14)] lg:flex-row transition-transform duration-300 ease-out hover:-translate-y-2">
              {/* inst for image desktop */}
              <InstructorPhoto photo={inst.photo} rotate={inst.photoRotate} className="xl:w-40 w-32 max-xl:hidden" />

              <div className="flex-1 space-y-6 text-left w-full">
                <header className="gap-x-6 flex items-center">
                  {/* inst for image mobile */}
                  <InstructorPhoto photo={inst.photo} rotate={inst.photoRotate} className="h-fit sm:w-32 w-27 xl:hidden" />
                  <div className="lg:space-y-4 space-y-3">
                    <h3 className="relative sm:text-5xl text-4xl whitespace-nowrap text-ink">{inst.name}</h3>
                    <p className="inline-block rounded-ui bg-brand-deep text-white px-3 py-0.5 sm:text-base text-sm">{inst.role}</p>
                    <p className="text-sm text-ink-soft">{inst.school}</p>
                  </div>
                </header>

                <p className="xl:text-2xl text-xl max-xl:text-center">{inst.quote}</p>
                <ul className="flex flex-col gap-2 ">
                  {inst.points.map((point, i) => (
                    <li key={point} className={`flex gap-1.5 rounded-ui px-3 py-1.5 text-sm leading-snug bg-tint-pink text-brand-deep`}>
                      <HiCheckBadge className="size-4 shrink-0 mt-0.5" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
