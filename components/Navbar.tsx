"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import logo from "@/public/images/logo-white.webp";
import { useEffect, useId, useState } from "react";
import { HiBars3, HiXMark } from "react-icons/hi2";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const navLinks = [
  { name: "รู้จักเรา", href: "#" },
  { name: "สมัครคอร์สเรียน", href: "#" },
  { name: "คลังข้อสอบฟรี", href: "#" },
  { name: "บทความน่าอ่าน", href: "#" },
  { name: "ความสำเร็จลูกศิษย์", href: "#" },
  { name: "TPG Community", href: "#" },
  { name: "TPG TCAS DUO!", href: "#" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 z-40 text-white shadow-[0_8px_24px_rgba(255,0,126,0.28)] transition-colors duration-300 ${scrolled ? "bg-brand" : "bg-transparent "}`}
    >
      <div className="container flex items-center justify-between gap-4 py-1.5">
        <Link href="/" className="block shrink-0 leading-none" aria-label="The Progress หน้าแรก">
          <Image src={logo} alt="" className="size-14 shrink-0 object-contain" priority />
        </Link>

        <nav aria-label="เมนูหลัก" className="hidden xl:block">
          <ul className="flex flex-wrap items-center gap-0.5">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-stroke block rounded-ui px-3 py-2 text-base font-semibold whitespace-nowrap text-white transition-colors hover:bg-white/20">
                  {link.name}
                </Link>
              </li>
            ))}
            <li>
              <Button variant="nav" href="/courses" className="ml-2 px-5.5 py-2.25 text-base whitespace-nowrap">
                คอร์สของฉัน
              </Button>
            </li>
          </ul>
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}

function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="xl:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "ปิดเมนู" : "เปิดเมนู"}
        className="flex size-12 shrink-0 items-center justify-center rounded-ui bg-brand-deep text-white"
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
            className="absolute inset-x-0 top-full border-t border-white/25 bg-brand px-5 py-4 pb-6"
          >
            <ul className="mx-auto grid max-w-2xl gap-1">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} onClick={() => setOpen(false)} className="block rounded-ui px-4.5 py-3 text-base font-semibold text-white hover:bg-white/16">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <Button variant="white" size="sm" href="/courses" onClick={() => setOpen(false)} className="mt-3 w-full mx-auto max-w-2xl">
              คอร์สของฉัน
            </Button>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
