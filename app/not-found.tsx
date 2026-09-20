import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center">
      <Reveal as="section" stagger={0.1} amount={0.5} className="container py-[clamp(60px,8vw,100px)] text-center">
        <p className="font-display text-7xl leading-none font-black tracking-tight text-brand md:text-8xl lg:text-9xl">404</p>
        <h1 className="mt-6 font-display text-2xl leading-tight font-black tracking-tight text-ink md:text-3xl">ไม่พบหน้าที่คุณค้นหา</h1>
        <p className="mx-auto mt-4 max-w-md text-base text-balance text-ink/65">หน้านี้อาจถูกย้ายหรือไม่มีอยู่แล้ว ลองกลับไปหน้าแรกหรือดูคอร์สเรียนของเราแทนได้เลย</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3.5">
          <Link href="/" className="btn btn-primary btn-lg">
            กลับหน้าแรก
          </Link>
          <Link href="/courses" className="btn btn-outline btn-lg">
            ดูคอร์สทั้งหมด
          </Link>
        </div>
      </Reveal>
    </main>
  );
}
