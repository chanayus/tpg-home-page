"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAnimate, useReducedMotion, stagger, type AnimationPlaybackControls, type AnimationSequence } from "motion/react";

import tKedPhoto from "@/public/images/t-ked.webp";
import tWinPhoto from "@/public/images/t-win.webp";

const heroStats = [
  { value: "82.08", label: "คะแนน TGAT พี่วิน" },
  { value: "9+", label: "ปีที่สอนมา" },
  { value: "99.53", label: "เปอร์เซ็นไทล์ประเทศ" },
];

/** มุมเอียงปลายทางของ entrance — ท่าลอยต้องแกว่งรอบค่านี้ ไม่ใช่รอบ 0 จึงถือไว้ที่เดียว */
const tilt = { win: -6, ked: 5, badge: -8 };

/** ลอยค้างหลัง entrance จบ คาบตั้งไม่ให้หารกันลงตัว สามชิ้นจะได้เลื่อนเฟสออกจากกันแทนที่จะขึ้นลงพร้อมกัน */
const floats = [
  { selector: ".hero-photo-win", y: [0, -6], rotate: [tilt.win, tilt.win + 1.2], duration: 3.5 },
  { selector: ".hero-photo-ked", y: [0, -10], rotate: [tilt.ked, tilt.ked - 1], duration: 4.25 },
  { selector: ".hero-badge-pop", y: [0, -5], rotate: [tilt.badge, tilt.badge + 0.6], duration: 3.25 },
];

export function Hero() {
  const [scope, animate] = useAnimate();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    const sequence: AnimationSequence = [
      [".hero-text > *", { opacity: [0, 1], y: [24, 0] }, { duration: 0.6, ease: "easeOut", delay: stagger(0.09, { startDelay: 0.05 }) }],
      [".hero-photo-win", { opacity: [0, 1], y: [-24, 0], rotate: [0, tilt.win], scale: [0.92, 1] }, { at: 0.3, type: "spring", stiffness: 120, damping: 14 }],
      [".hero-photo-ked", { opacity: [0, 1], y: [24, 0], rotate: [0, tilt.ked], scale: [0.92, 1] }, { at: "<+0.12", type: "spring", stiffness: 120, damping: 14 }],
      [".hero-badge-pop", { opacity: [0, 1], scale: [0.4, 1], rotate: [0, tilt.badge] }, { at: "<+0.42", type: "spring", stiffness: 200, damping: 12 }],
    ];

    let stopped = false;
    const entrance = animate(sequence);
    const running: AnimationPlaybackControls[] = [entrance];

    // images floating animation
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
    <section ref={scope} className="pt-[clamp(40px,6vw,64px)] pb-[clamp(60px,8vw,100px)]">
      <div className="container grid grid-cols-1 items-center gap-18 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="hero-text">
          <p className={`mb-6 inline-flex items-center gap-2 border border-brand px-4 py-1.5 sm:text-xs text-2xs font-bold tracking-wider text-brand-deep ${shouldReduceMotion ? "" : "opacity-0"}`}>
            ● TGAT · A-LEVEL · ม.6 ยันสอบติด
          </p>
          <h1 className={`font-display text-6xl leading-none font-black tracking-tight text-ink md:text-7xl lg:text-8xl ${shouldReduceMotion ? "" : "opacity-0"}`}>
            สอบติด
            <br />
            <span className="text-brand">ไม่ใช่โชค</span>
          </h1>
          <p className={`mt-6.5 mb-8 max-w-130 text-base leading-relaxed text-ink/65 md:text-lg ${shouldReduceMotion ? "" : "opacity-0"}`}>
            The Progress ดูแลน้อง ๆ แบบใกล้ชิด ไม่ใช่แค่สอนตามตำรา แต่วางแผนเป็นรายคนจนถึงวันโค้งสุดท้าย พี่วิน พี่เกด สอนเอง ดูแลเอง ทุกคน
          </p>
          <div className={`mb-10 flex flex-wrap gap-3.5 ${shouldReduceMotion ? "" : "opacity-0"}`}>
            <Link href="/courses" className="btn btn-primary btn-lg">
              ดูคอร์สทั้งหมด
            </Link>
            <Link href="/courses" className="btn btn-outline btn-lg">
              ทดลองเรียนฟรี
            </Link>
          </div>
          <dl className={`flex flex-wrap border-t border-brand/15 pt-6 gap-8 lg:gap-11 ${shouldReduceMotion ? "" : "opacity-0"}`}>
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <dd className="font-display text-2xl font-black text-ink lg:text-3xl">{stat.value}</dd>
                <dt className="mt-0.5 text-xs text-ink/55">{stat.label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto aspect-square w-full max-lg:max-w-lg">
          <div
            style={{ background: "linear-gradient(160deg, #fdeef5, #f5c3dc)" }}
            className={`hero-photo-win absolute top-0 right-[10%] w-1/2 aspect-670/940 overflow-hidden border-2 border-brand shadow-[0_20px_50px_rgba(197,48,125,0.18)] ${shouldReduceMotion ? "-rotate-6" : "opacity-0"}`}
          >
            <Image src={tWinPhoto} alt="พี่วิน ติวเตอร์ TGAT ของ The Progress" className="block size-full object-cover" sizes="(max-width: 1024px) 50vw, 360px" priority />
          </div>
          <div
            style={{ background: "linear-gradient(160deg, #fdeef5, #f5c3dc)" }}
            className={`hero-photo-ked absolute bottom-0 left-[2%] z-2 w-2/5 aspect-500/779 overflow-hidden border-2 border-brand-deep shadow-[0_20px_50px_rgba(197,48,125,0.18)] ${shouldReduceMotion ? "rotate-5" : "opacity-0"}`}
          >
            <Image src={tKedPhoto} alt="พี่เกด ติวเตอร์ภาษาอังกฤษของ The Progress" className="block size-full object-cover" sizes="(max-width: 1024px) 40vw, 280px" />
          </div>
          <p
            className={`hero-badge-pop absolute top-[15%] left-0 z-3 bg-gold px-4.5 py-3.5 font-display font-black text-gold-ink shadow-[0_12px_30px_rgba(197,48,125,0.25)] ${shouldReduceMotion ? "-rotate-8" : "opacity-0"}`}
          >
            <span className="block md:text-2xl text-xl leading-none">TOP 0.47%</span>
            <span className="mt-0.5 block text-2xs font-bold">TGAT ระดับประเทศ</span>
          </p>
        </div>
      </div>
    </section>
  );
}
