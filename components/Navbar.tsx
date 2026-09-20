"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/logo.webp";
import { useId, useState } from "react";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { HiArrowNarrowRight } from "react-icons/hi";

const navLinks = [
  { name: "คอร์สเรียน", href: "/courses" },
  { name: "คลังข้อสอบ", href: "#" },
  { name: "ผลลัพธ์", href: "#results" },
  { name: "ติดต่อเรา", href: "#contact" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-brand/12 bg-cream/90 backdrop-blur">
      <div className="container flex items-center justify-between gap-5 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="" className="size-9.5 shrink-0 rounded-full object-cover" priority />
          <span className="font-display md:text-lg font-extrabold tracking-tight text-brand-hover">The Progress</span>
        </Link>

        <nav aria-label="เมนูหลัก" className="hidden md:block">
          <ul className="flex flex-wrap items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-sm font-semibold whitespace-nowrap text-ink/70 hover:text-brand">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a href={"https://line.me/R/ti/p/@453qifrr"} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm hidden shrink-0 md:inline-flex">
            แอดไลน์ <HiArrowNarrowRight />
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}

function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "ปิดเมนู" : "เปิดเมนู"}
        className="flex size-9.5 shrink-0 items-center justify-center text-ink"
      >
        {open ? <HiXMark size={24} /> : <HiBars3 size={24} />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.nav
            id={panelId}
            aria-label="เมนูหลัก"
            initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: "easeOut" }}
            className="absolute inset-x-0 top-full border-b border-brand/12 bg-cream  py-6 shadow-[0_16px_30px_rgba(197,48,125,0.12)] px-5"
          >
            <ul className="flex flex-col">
              {navLinks.map((link) => (
                <li key={link.name} className="border-b border-brand/10 last:border-b-0">
                  <Link href={link.href} onClick={() => setOpen(false)} className="block py-3 text-base font-semibold text-ink/80 hover:text-brand">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <a href={"https://line.me/R/ti/p/@453qifrr"} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm mt-5 w-full">
              แอดไลน์ <HiArrowNarrowRight />
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
