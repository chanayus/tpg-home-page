"use client";

import { useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { HiHeart, HiPlus, HiUserGroup, HiUserPlus } from "react-icons/hi2";
import type { IconType } from "react-icons";
import badgeStartSticker from "@/public/images/stickers/badge-start.webp";
import cardDreamUniversitySticker from "@/public/images/stickers/card-dream-university.webp";
import { Reveal } from "../Reveal";

const whyTabs = ["care", "near", "together"] as const;
type WhyTabId = (typeof whyTabs)[number];

type AccordionItem = { title: string; desc: string; body: string };

const pillars: Record<WhyTabId, { label: string; sub: string; icon: IconType; items: AccordionItem[] }> = {
  care: {
    label: "ใส่ใจ",
    sub: "ติดตามรายคน โทรหาน้องและผู้ปกครอง",
    icon: HiHeart,
    items: [
      {
        title: "Progress Care",
        desc: "ติดตามน้องที่คะแนนน่าเป็นห่วง จัดคลาสพิเศษให้ทันที",
        body: "ทีมพี่ ๆ ดูผลการเรียนของน้องเป็นรายคน หากน้องคนไหนน่าเป็นห่วง เราจะโทรหาน้องและผู้ปกครอง เพื่อชวนเข้า Boost Up Class ก่อนที่จะตามไม่ทัน",
      },
      {
        title: "โทรฟีตแบคผู้ปกครองรายสัปดาห์",
        desc: "สุ่มโทรหาผู้ปกครองทุกสัปดาห์ เพื่อฟีตแบคการเรียนของน้อง",
        body: "เราสุ่มโทรหาผู้ปกครองทุกสัปดาห์ เพื่อสอบถามและฟีตแบคเรื่องการเรียน ให้บ้านและสถาบันเห็นภาพเดียวกันว่าน้องเดินมาถึงไหนแล้ว",
      },
      { title: "Quiz วัดความเข้าใจ", desc: "ทดสอบก่อนขึ้นบทใหม่ทุกครั้ง ไม่ปล่อยให้ตามไม่ทัน", body: "Quiz ทุกบทช่วยให้น้องและพี่ ๆ เห็นตรงกันว่าจุดไหนยังไม่แน่น ก่อนที่จะไปบทต่อไป" },
    ],
  },
  near: {
    label: "ใกล้ชิด",
    sub: "ครูผู้สอนดูแลเอง ตอบเอง",
    icon: HiUserPlus,
    items: [
      { title: "Openchat ส่วนตัว", desc: "ถามได้ทุกเรื่อง พี่วินพี่เกดตอบเอง ดูแลเอง", body: "โอเพนแชทที่ครูผู้สอนดูแลเองทั้งหมด ถามเรื่องเรียนหรือเรื่องสอบเข้าได้ตลอด ไม่ต้องรอถึงคาบเรียน" },
      {
        title: "Boost Up Class",
        desc: "ติวเสริมสดตามตารางรายเดือน เจาะจุดที่ยังไม่เข้าใจ",
        body: "แจ้งตารางทั้งใน LINE OpenChat และหน้าแดชบอร์ดคอร์สบนเว็บ กดจองที่หน้าเว็บได้เลย เป็นคลาสสดรายเดือนที่ไม่มีย้อนหลัง",
      },
      { title: "LINE Q&A และข่าวสอบเข้า", desc: "อัปเดตข่าวสอบเข้า ตอบข้อสงสัย พร้อมคลิป exclusive", body: "สื่อสารข่าวสารภาพรวม ข่าวสอบเข้า และตอบคำถามที่น้องสงสัยผ่าน The Progress LINE Q&A" },
    ],
  },
  together: {
    label: "สอบติดไปด้วยกัน",
    sub: "เคียงข้างจนถึงวันสอบจริง",
    icon: HiUserGroup,
    items: [
      { title: "Brush Up Class", desc: "ทบทวนและตะลุยโจทย์โค้งสุดท้ายก่อนสอบจริง", body: "คลาสสดรายเดือนที่พาตะลุยโจทย์ และแก้จุดอ่อนรายบุคคลก่อนวันสอบ" },
      { title: "Get Ready Zoom Class", desc: "ก่อนสอบต้องเตรียมตัวด้านไหน มีคำถามอะไรบ้าง", body: "ซูมสดก่อนสอบ ให้น้องถามทุกข้อสงสัย และเช็กความพร้อมกับพี่ ๆ ก่อนถึงวันจริง" },
      { title: "Mock Test ออนไลน์สดฟรี", desc: "สอบเสมือนจริง พร้อมผลวิเคราะห์รายบุคคล", body: "ลองสนามสอบเสมือนจริงแบบออนไลน์สด ฟรี แล้วดูจุดแข็งจุดอ่อนของตัวเองก่อนวันสอบจริง" },
    ],
  },
};

function TabPanel({ id }: { id: WhyTabId }) {
  const [openIndex, setOpenIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const pillar = pillars[id];

  return (
    <motion.div
      role="tabpanel"
      id={`panel-${id}`}
      aria-labelledby={`tab-${id}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.22, ease: "easeOut" }}
      className="grid gap-3.5"
    >
      {pillar.items.map((item, index) => {
        const open = index === openIndex;
        return (
          <div
            key={item.title}
            className={`overflow-hidden rounded-ui shadow-[0_12px_26px_rgba(255,0,126,0.1),inset_0_0_0_1px_var(--hair)] transition-colors ${open ? "bg-blush border border-brand shadow-[0_18px_36px_rgba(255,0,126,0.18)]" : "bg-white"}`}
          >
            <button type="button" aria-expanded={open} onClick={() => setOpenIndex(open ? -1 : index)} className="flex w-full items-center justify-between gap-4 px-6.5 py-5 text-left">
              <span>
                <b className="font-display block text-xl font-bold">{item.title}</b>
                <span className="mt-0.5 block text-sm text-ink-soft">{item.desc}</span>
              </span>
              <span className={`grid size-10 shrink-0 place-items-center rounded-ui transition-colors ${open ? "bg-grad-pink text-white" : "bg-tint-pink text-brand-deep"}`}>
                <HiPlus className={`size-5 transition-transform duration-200 ${open ? "rotate-45" : ""}`} />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  key="body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5 text-lg text-ink">
                    <div className="rounded-ui bg-white/75 px-4 py-2 border border-brand/50">{item.body}</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </motion.div>
  );
}

export function WhyUs() {
  const [tab, setTab] = useState<WhyTabId>("care");
  const shouldReduceMotion = useReducedMotion();

  function onTabKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    const dir = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = whyTabs[(index + dir + whyTabs.length) % whyTabs.length];
    setTab(next);
    document.getElementById(`tab-${next}`)?.focus();
  }

  return (
    <section id="why" aria-labelledby="why-title" className="grid-tint-bg relative overflow-hidden bg-white py-section">
      <motion.div
        className="pointer-events-none absolute top-8.5 right-[5%] z-0 w-[clamp(64px,9vw,120px)]"
        animate={shouldReduceMotion ? undefined : { y: [0, -8, 0], rotate: [-3, 3, -3] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image src={cardDreamUniversitySticker} alt="" className="h-auto w-full" />
      </motion.div>
      <motion.div
        className="pointer-events-none absolute bottom-18 left-[4%] z-0 w-40"
        animate={shouldReduceMotion ? undefined : { y: [0, -6, 0], rotate: [3, -3, 3] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      >
        <Image src={badgeStartSticker} alt="" className="h-auto w-full" />
      </motion.div>
      <Reveal as="div" stagger={0.2} className="container relative z-1">
        <h2 id="why-title" className="text-stroke-lg spark-after font-display text-section font-extrabold">
          ทำไมต้อง <em className="text-brand not-italic">The Progress</em>
        </h2>
        <p className="mt-2.5 max-w-140 sm:text-lg text-ink-soft">ใส่ใจ ใกล้ชิด สอบติดไปด้วยกัน คือคติพจน์ของเรา เลือกหัวข้อแล้วกดเปิดดูรายละเอียดได้เลย</p>

        <div className="mt-8 grid items-start gap-8 ">
          <div role="tablist" aria-label="คติพจน์ The Progress" className="grid md:grid-cols-3 gap-3">
            {whyTabs.map((id, index) => {
              const pillar = pillars[id];
              const Icon = pillar.icon;
              const active = tab === id;
              return (
                <button
                  key={id}
                  role="tab"
                  id={`tab-${id}`}
                  aria-controls={`panel-${id}`}
                  aria-selected={active}
                  tabIndex={active ? 0 : -1}
                  onClick={() => setTab(id)}
                  onKeyDown={(e) => onTabKeyDown(e, index)}
                  className={`text-stroke flex items-center gap-3.5 rounded-ui py-3.5 pr-5.5 pl-3.5 text-left shadow-[0_12px_26px_rgba(255,0,126,0.12),inset_0_0_0_1px_var(--hair)] transition-all hover:scale-97 hover:bg-blush ${
                    active ? "bg-grad-pink text-white shadow-[0_16px_32px_rgba(255,0,126,0.34)] hover:scale-97" : "bg-white text-brand"
                  }`}
                >
                  <Icon className="lg:size-10 size-8 shrink-0" />
                  <span>
                    <b className={`font-display block text-2xl font-extrabold ${active ? "text-white" : "text-brand-deep"}`}>{pillar.label}</b>
                    <span className={`block text-sm ${active ? "text-white" : "text-ink-soft"}`}>{pillar.sub}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div>
            <AnimatePresence mode="wait">
              <TabPanel key={tab} id={tab} />
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
