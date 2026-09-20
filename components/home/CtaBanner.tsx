import Link from "next/link";
import { Reveal } from "../Reveal";

export function CtaBanner() {
  return (
    <section aria-labelledby="cta-title" style={{ background: "linear-gradient(120deg, #5c0033, #a3175f 55%, #c5307d)" }} className="py-16 text-center md:py-18 lg:py-24">
      <Reveal className="mx-auto max-w-3xl" stagger={0.1} amount={0.5}>
        <h2 id="cta-title" className="mb-5 font-display text-3xl leading-tight font-black tracking-tight text-white md:text-4xl lg:text-5xl">
          พร้อมสอบติด
          <br />
          ไปด้วยกันหรือยัง?
        </h2>
        <p className="mb-9 text-base text-white/80 text-balance">ทักไลน์วันนี้ พี่วินพี่เกดตอบเอง ปรึกษาเส้นทางการเรียนได้ฟรี</p>
        <div className="flex flex-wrap justify-center gap-3.5">
          <a href={"https://line.me/R/ti/p/@453qifrr"} target="_blank" rel="noreferrer" className="btn btn-white btn-lg">
            แอดไลน์ปรึกษาฟรี
          </a>
          <Link href="/courses" className="btn btn-outline-white btn-lg">
            ทดลองเรียนฟรี
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
