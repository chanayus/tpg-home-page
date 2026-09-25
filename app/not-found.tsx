import { Button } from "../components/Button";
import { Reveal } from "../components/Reveal";

export default function NotFound() {
  return (
    <main className="flex flex-1 items-center">
      <Reveal as="section" stagger={0.1} amount={0.5} className="container py-32 text-center">
        <p className="text-7xl leading-none font-black tracking-tight text-brand md:text-8xl lg:text-9xl">404</p>
        <h1 className="mt-6 text-2xl leading-tight font-black tracking-tight text-ink md:text-3xl">ไม่พบหน้าที่คุณค้นหา</h1>
        <p className="mx-auto mt-4 max-w-md text-base text-balance text-ink/65">หน้านี้อาจถูกย้ายหรือไม่มีอยู่แล้ว ลองกลับไปหน้าแรกหรือดูคอร์สเรียนของเราแทนได้เลย</p>
        <div className="mt-9 flex flex-wrap justify-center gap-3.5">
          <Button variant="solid" size="lg" href="/">
            กลับหน้าแรก
          </Button>
          <Button variant="line" size="lg" href="/courses">
            ดูคอร์สทั้งหมด
          </Button>
        </div>
      </Reveal>
    </main>
  );
}
