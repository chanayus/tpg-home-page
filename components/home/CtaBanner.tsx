import { Button } from "../Button";
import { Reveal } from "../Reveal";
import { SquiggleReveal } from "../SquiggleReveal";
import { IconSpark, IconSquiggle } from "./SvgProps";

export function CtaBanner() {
  return (
    <section className="py-[clamp(40px,6vw,72px)]">
      <div className="container">
        <div className="bg-grad-cta relative overflow-hidden rounded-panel px-[clamp(20px,5vw,60px)] py-[clamp(48px,8vw,100px)] text-center text-white">
          <div className="grain-overlay absolute" />
          <SquiggleReveal amount={0.5}>
            <IconSquiggle className="pointer-events-none absolute top-[-30%] left-[-4%] h-170 w-auto text-white/14" />
            <IconSquiggle preserveAspectRatio="none" className="pointer-events-none absolute top-[-46%] right-[-6%] h-192 w-auto rotate-180 -scale-x-100 text-white/12" />
          </SquiggleReveal>
          <Reveal stagger={0.12} amount={0.5}>
            <IconSpark className="pointer-events-none absolute top-[16%] lg:right-[12%] right-8 sm:w-13.5 w-8 text-white" />
            <IconSpark className="pointer-events-none absolute lg:bottom-[21%] lg:left-[15%] bottom-8 left-4 w-6 text-gold" />
          </Reveal>

          <Reveal className="relative z-2 mx-auto max-w-3xl" stagger={0.1} amount={0.5}>
            <h2 className="text-stroke-lg text-[clamp(36px,6.5vw,67.2px)] leading-none text-balance text-shadow-[0_6px_0_rgba(120,0,60,0.16)]">
              พร้อมสอบติด
              <br />
              ไปด้วยกันหรือยัง?
            </h2>
            <p className="mx-auto mt-4 mb-7 max-w-130 text-lg ">ทักไลน์วันนี้ พี่วินพี่เกดตอบเอง ปรึกษาเส้นทางการเรียนได้ฟรี</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button className="min-w-48" variant="white" size="lg" href="https://line.me/R/ti/p/@453qifrr">
                แอดไลน์ปรึกษาฟรี
              </Button>
              <Button className="min-w-48" variant="glass" size="lg" href="https://line.me/R/ti/p/@453qifrr">
                ทดลองเรียนฟรี
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
