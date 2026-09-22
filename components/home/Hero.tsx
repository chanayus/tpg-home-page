"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useAnimate, useReducedMotion, stagger, type AnimationPlaybackControls, type AnimationSequence } from "motion/react";

import { Button } from "@/components/Button";
import tKedPhoto from "@/public/images/t-ked.webp";
import tWinPhoto from "@/public/images/t-win.webp";
import { IconSpark, IconSquiggle } from "./SvgProps";

/** มุมเอียงปลายทางของ entrance — ท่าลอยต้องแกว่งรอบค่านี้ ไม่ใช่รอบ 0 จึงถือไว้ที่เดียว */
const tilt = { win: -5, ked: 4, sticker: -7, sticker2: 6, spark1: 10, spark2: 0, spark3: 12 };

/** ลอยค้างหลัง entrance จบ คาบตั้งไม่ให้หารกันลงตัว สามชิ้นจะได้เลื่อนเฟสออกจากกันแทนที่จะขึ้นลงพร้อมกัน */
const floats = [
  { selector: ".hero-photo-win", y: [0, -6], rotate: [tilt.win, tilt.win + 1.2], duration: 3.5 },
  { selector: ".hero-photo-ked", y: [0, -10], rotate: [tilt.ked, tilt.ked - 1], duration: 4.25 },
  { selector: ".hero-sticker-1", y: [0, -5], rotate: [tilt.sticker, tilt.sticker + 0.6], duration: 3.25 },
  { selector: ".hero-sticker-2", y: [0, -5], rotate: [tilt.sticker2, tilt.sticker2 - 0.8], duration: 3.75 },
];

export function Hero() {
  const [scope, animate] = useAnimate();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    const sequence: AnimationSequence = [
      [".hero-squiggle path", { strokeDashoffset: [1, 0] }, { at: 0, duration: 0.75, ease: "easeInOut" }],
      [".hero-text > *", { opacity: [0, 1], y: [24, 0] }, { at: 0, duration: 0.35, ease: "easeOut", delay: stagger(0.09, { startDelay: 0.05 }) }],
      [".hero-photo-win", { opacity: [0, 1], y: [-24, 0], rotate: [0, tilt.win], scale: [0.92, 1] }, { at: 0.3, type: "spring", stiffness: 120, damping: 14 }],
      [".hero-photo-ked", { opacity: [0, 1], y: [24, 0], rotate: [0, tilt.ked], scale: [0.92, 1] }, { at: "<+0.12", type: "spring", stiffness: 120, damping: 14 }],
      [".hero-sticker-1", { opacity: [0, 1], scale: [0.4, 1], rotate: [0, tilt.sticker] }, { at: "<+0.42", type: "spring", stiffness: 200, damping: 12 }],
      [".hero-sticker-2", { opacity: [0, 1], scale: [0.4, 1], rotate: [0, tilt.sticker2] }, { at: "<+0.08", type: "spring", stiffness: 200, damping: 12 }],
      [".hero-spark-1", { opacity: [0, 1], scale: [0.3, 1], rotate: [0, tilt.spark1] }, { at: "<+0.1", type: "spring", stiffness: 240, damping: 14 }],
      [".hero-spark-2", { opacity: [0, 1], scale: [0.3, 1], rotate: [0, tilt.spark2] }, { at: "<+0.06", type: "spring", stiffness: 240, damping: 14 }],
      [".hero-spark-3", { opacity: [0, 1], scale: [0.3, 1], rotate: [0, tilt.spark3] }, { at: "<+0.06", type: "spring", stiffness: 240, damping: 14 }],
    ];

    let stopped = false;
    const entrance = animate(sequence);
    const running: AnimationPlaybackControls[] = [entrance];

    entrance.then(() => {
      if (stopped) return;
      for (const { selector, duration, ...keyframes } of floats) {
        running.push(animate(selector, keyframes, { duration, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }));
      }
    });

    return () => {
      stopped = true;
      running.forEach((animation) => animation.stop());
    };
  }, [animate, shouldReduceMotion]);

  return (
    <section
      ref={scope}
      className="relative z-2 overflow-hidden min-h-screen 2xl:pt-48 pt-32 pb-32 text-white"
      style={{
        background: "radial-gradient(46% 60% at 100% 0%, #ffd2ea 0%, rgba(255,210,234,0) 70%), linear-gradient(255deg, #ff8cc6 0%, #ff2d97 26%, #e8006f 54%, #d1006a 100%)",
      }}
    >
      <div className="grain-overlay absolute" />
      <IconSquiggle
        className={`hero-squiggle pointer-events-none absolute top-[-8%] right-[-3%] z-0 h-[118%] w-auto text-white/17 max-[860px]:right-[-30%] max-[860px]:opacity-80 ${
          shouldReduceMotion ? "" : "[&>path]:[stroke-dasharray:1] [&>path]:[stroke-dashoffset:1]"
        }`}
      />

      <div className="container relative z-2 grid grid-cols-1 items-center gap-y-20 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="hero-text">
          <p className={`tracking-wide mb-3 text-white w-fit rounded ${shouldReduceMotion ? "" : "opacity-0"}`}>(ติวสอบ TGAT · A-Level คณิต · อังกฤษ)</p>
          <h1
            className={`font-display text-[clamp(72px,8vw,140px)] text-shadow-[0_6px_0_rgba(120,0,60,0.16)]  leading-[0.82] font-medium tracking-tight text-white ${shouldReduceMotion ? "" : "opacity-0"}`}
          >
            <span className="text-stroke-lg block">สอบติด</span>
            <span className="text-stroke-lg relative mt-1.5 block w-max max-w-full">ไปด้วยกัน</span>
          </h1>

          <p className={`mt-7 max-w-100 text-balance text-lg leading-relaxed bg-white text-brand w-fit px-2 rounded ${shouldReduceMotion ? "" : "opacity-0"}`}>"The Progress เป็นมากกว่ากวดวิชา แต่เป็นพี่ร่วมทาง"</p>
          <p className={`mt-3.5 max-w-100 text-balance text-lg leading-relaxed text-white/80 ${shouldReduceMotion ? "" : "opacity-0"}`}>
            ที่ดูแลน้อง ๆ อย่างใกล้ชิดด้วยตัวเอง ผ่านระบบการเรียนแบบใหม่ และเข้าใจในทุกช่วงของการเติบโต เดินเคียงข้างไปด้วยกัน จนถึงวันที่น้องสอบติด^^
          </p>

          <div className={`mt-7 flex flex-wrap gap-3 ${shouldReduceMotion ? "" : "opacity-0"}`}>
            <Button variant="white" size="lg" href="#courses">
              ดูคอร์สทั้งหมด
            </Button>
            <Button variant="glass" size="lg" href="https://line.me/R/ti/p/@453qifrr" target="_blank" rel="noreferrer">
              ทดลองเรียนฟรี
            </Button>
          </div>
          <div className={`mt-8.5 ${shouldReduceMotion ? "" : "opacity-0"}`}>
            <p className="mb-3 text-sm font-semibold tracking-wide text-white/80">คติพจน์ของเรา</p>
            <div className="flex flex-wrap items-center gap-2 text-lg  w-fit">
              <p className="border px-4 rounded border-white/50">ใส่ใจ</p>
              <p className="border px-4 rounded border-white/50">ใกล้ชิด</p>
              <p className="border px-4 rounded border-white/50">สอบติดไปด้วยกัน</p>
            </div>
          </div>
        </div>

        <div className="relative mx-auto aspect-[1/1.04] w-full max-w-135 max-[860px]:max-w-110" aria-label="พี่วินและพี่เกด">
          <div
            style={{ background: "linear-gradient(165deg, #fff0f8, #ffb5d9)" }}
            className={`hero-photo-win absolute top-0 right-[3%] w-[54%] overflow-hidden rounded-xl border-[6px] border-white shadow-[0_30px_54px_rgba(120,0,60,0.34)] ${shouldReduceMotion ? "rotate-[-5deg]" : "opacity-0"}`}
          >
            <Image src={tWinPhoto} alt="พี่วิน ติวเตอร์ TGAT ของ The Progress" className="block aspect-670/940 size-full object-cover object-top" sizes="(max-width: 1024px) 54vw, 380px" priority />
          </div>
          <div
            style={{ background: "linear-gradient(165deg, #fff0f8, #ffb5d9)" }}
            className={`hero-photo-ked absolute bottom-0 left-[1%] z-2 w-[45%] overflow-hidden rounded-xl border-[6px] border-white shadow-[0_30px_54px_rgba(120,0,60,0.34)] ${shouldReduceMotion ? "rotate-[4deg]" : "opacity-0"}`}
          >
            <Image src={tKedPhoto} alt="พี่เกด ติวเตอร์ภาษาอังกฤษของ The Progress" className="block aspect-500/779 size-full object-cover object-top" sizes="(max-width: 1024px) 45vw, 320px" />
          </div>

          <div
            className={`hero-sticker-1 text-stroke absolute top-[14%] left-[-2%] z-3 rounded-ui bg-purple-sticker px-5 py-3 leading-tight text-white shadow-[0_16px_30px_rgba(120,0,60,0.3)] ${shouldReduceMotion ? "rotate-[-7deg]" : "opacity-0"}`}
          >
            <b className="font-display block text-xl font-extrabold">พี่วิน &amp; พี่เกด</b>
            <small className="text-sm font-semibold">สอนเอง ดูแลเอง ทุกคน</small>
          </div>
          <div
            className={`hero-sticker-2 text-stroke absolute right-[-1%] bottom-[9%] z-3 rounded-ui bg-gold px-4.5 py-2.25 font-display text-base font-bold text-ink shadow-[0_16px_30px_rgba(120,0,60,0.3)] ${shouldReduceMotion ? "rotate-[6deg]" : "opacity-0"}`}
          >
            TGAT · A-Level
          </div>

          <IconSpark
            className={`hero-spark-1 absolute max-sm:hidden top-[-8%] left-[40%] z-3 w-[17%] text-gold drop-shadow-[0_8px_10px_rgba(120,0,60,0.25)] ${shouldReduceMotion ? "rotate-10" : "opacity-0"}`}
          />
          <IconSpark className={`hero-spark-2 absolute top-[46%] right-[-2%] z-3 w-[9%] text-purple-sticker ${shouldReduceMotion ? "" : "opacity-0"}`} />
          <IconSpark className={`hero-spark-3 absolute bottom-[3%] left-[36%] z-3 w-[7%] text-brand-deep ${shouldReduceMotion ? "rotate-12" : "opacity-0"}`} />
        </div>
      </div>
    </section>
  );
}
