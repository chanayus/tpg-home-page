"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { HiCheckBadge } from "react-icons/hi2";
import studentBoyArt from "@/public/images/student-boy-art.png";
import studentGirlArt from "@/public/images/student-girl-art.png";
import tKedPhoto from "@/public/images/t-ked.webp";
import tWinPhoto from "@/public/images/t-win.webp";
import { Reveal } from "../Reveal";

const floatingStudents = [
  { photo: studentGirlArt, position: { top: "4%", right: "3%" }, width: "10rem", rotate: 8, y: [0, -8, 0], duration: 3.6 },
  { photo: studentBoyArt, position: { bottom: "4%", left: "2%" }, width: "13.125rem", rotate: -6, y: [0, -10, 0], duration: 4.2 },
];

const chipVariants = [
  { bg: "bg-tint-pink", text: "text-brand-deep" },
  { bg: "bg-tint-purple", text: "text-purple-deep" },
  { bg: "bg-gold/20", text: "text-gold-ink" },
];

const instructors = [
  {
    name: "พี่วิน",
    photo: tWinPhoto,
    role: "ผู้ก่อตั้ง · ติวเตอร์ TGAT",
    school: "เศรษฐศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
    points: ["TGAT Top 0.47% ของประเทศ", "ผู้เขียนหนังสือ TGAT1+TGAT2 และ TGAT2+TGAT3 (Think Beyond)", "วิทยากรรับเชิญแนะแนวที่ ร.ร. เตรียมอุดมศึกษา"],
    stat: { value: "82.08", label: "คะแนน TGAT 1-3 เต็ม 100" },
    cardRotate: -1,
    photoRotate: -2,
    badge: "bg-grad-pink text-white",
    echo: "text-purple-deep/70",
  },
  {
    name: "พี่เกด",
    photo: tKedPhoto,
    role: "ผู้ก่อตั้ง · ติวเตอร์ภาษาอังกฤษ",
    school: "ป.โท การสอนภาษาอังกฤษ ธรรมศาสตร์",
    points: ["B.A. in English เกียรตินิยมอันดับ 1", "ผู้เขียนหนังสือ Best Seller “900 คลังศัพท์คัดพิเศษ”", "ผู้เชี่ยวชาญวิชาภาษาอังกฤษระดับอุดมศึกษา"],
    stat: { value: "8+", label: "ปีสอนภาษาอังกฤษโดยตรง" },
    cardRotate: 1,
    photoRotate: 2,
    badge: "bg-purple-sticker text-white",
    echo: "text-brand/70",
  },
];

export function Instructors() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="team" aria-labelledby="instructors-title" className="relative z-0  overflow-hidden py-section">
      {floatingStudents.map((student, i) => (
        <motion.div
          key={i}
          aria-hidden
          className="pointer-events-none absolute -z-10"
          style={{ ...student.position, width: student.width, rotate: student.rotate }}
          animate={shouldReduceMotion ? undefined : { y: student.y }}
          transition={{ duration: student.duration, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image src={student.photo} alt="" className="block h-auto w-full" />
        </motion.div>
      ))}

      <hgroup className="container relative z-1">
        <Reveal as="h2" id="instructors-title" className="text-stroke-lg spark-after font-display text-section font-extrabold">
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
            className="flex w-full items-center justify-center"
          >
            <article className="mx-auto flex w-full max-w-4xl border border-brand-deep/20 flex-col items-start xl:gap-8 gap-6 gap-y-8 rounded-panel bg-white lg:p-10 p-6 lg:pr-4 shadow-[0_22px_44px_rgba(255,0,126,0.14)] lg:flex-row">
              <figure className="relative xl:w-40 w-32 max-lg:hidden shrink-0 ">
                <div
                  style={{ background: "linear-gradient(165deg, #fff0f8, #ffb5d9)", rotate: `${inst.photoRotate}deg` }}
                  className="overflow-hidden rounded-photo border-[6px] border-white shadow-[0_18px_34px_rgba(120,0,60,0.22)]"
                >
                  <Image src={inst.photo} alt="" className="block size-full object-cover object-top" sizes="(max-width: 640px) 200px, 280px" />
                </div>
              </figure>

              <div className="flex-1 space-y-6 text-left w-full">
                <header className="gap-x-6 flex">
                  <figure className="relative lg:hidden shrink-0 sm:w-32 w-27">
                    <div
                      style={{ background: "linear-gradient(165deg, #fff0f8, #ffb5d9)", rotate: `${inst.photoRotate}deg` }}
                      className="overflow-hidden rounded-photo border-[6px] border-white shadow-[0_18px_34px_rgba(120,0,60,0.22)]"
                    >
                      <Image src={inst.photo} alt="" className="block size-full object-cover object-top" sizes="(max-width: 640px) 200px, 280px" />
                    </div>
                  </figure>
                  <div className="space-y-4">
                    <h3 className="relative font-display sm:text-5xl text-4xl font-extrabold whitespace-nowrap text-ink">{inst.name}</h3>
                    <p className="inline-block rounded-ui bg-brand-deep text-white px-3 py-0.5 sm:text-base text-sm font-bold">{inst.role}</p>
                    <p className="text-sm text-ink-soft">{inst.school}</p>
                  </div>
                </header>

                <ul className="flex flex-col gap-2 ">
                  {inst.points.map((point, i) => {
                    const variant = chipVariants[i % chipVariants.length];
                    return (
                      <li key={point} className={`flex items-center gap-1.5 rounded-ui px-3 py-1.5 text-sm leading-snug font-medium ${variant.bg} ${variant.text}`}>
                        <HiCheckBadge className="size-4 shrink-0" />
                        {point}
                      </li>
                    );
                  })}
                </ul>

                <div className="text-sm text-ink-soft flex items-baseline">
                  <p className="text-5xl text-brand mr-2 tracking-tight">{inst.stat.value}</p>
                  {inst.stat.label}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
