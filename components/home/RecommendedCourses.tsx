import { Button } from "@/components/Button";
import { Reveal } from "../Reveal";
import { IconSpark } from "./SvgProps";

interface Course {
  id: string;
  tag: string;
  title: string;
  description: string;
  cover: string;
}

const courses: Course[] = [
  {
    id: "tgat",
    tag: "TGAT",
    title: "คอร์ส TGAT ครบทุกพาร์ท",
    description: "ปูพื้นฐาน เทคนิคทำโจทย์ พร้อม Mock Test วิเคราะห์รายบุคคล",
    cover: "linear-gradient(135deg, #ff5aa9, #ff007e)",
  },
  {
    id: "a-level-math",
    tag: "A-LEVEL คณิต",
    title: "คอร์ส A-Level คณิต 1/2",
    description: "เนื้อหาครบหลักสูตร พร้อมคลาสเสริมก่อนสอบจริง",
    cover: "linear-gradient(135deg, #a145ff, #ff007e)",
  },
  {
    id: "a-level-eng",
    tag: "A-LEVEL ENG",
    title: "คอร์ส A-Level ภาษาอังกฤษ",
    description: "คลังศัพท์ ไวยากรณ์ โจทย์แนวข้อสอบจริงจากพี่เกด",
    cover: "linear-gradient(135deg, #ffad02, #ff007e 95%)",
  },
];

export function RecommendedCourses() {
  return (
    <section id="courses" aria-labelledby="courses-title" className="deco-sparkles relative overflow-hidden bg-linear-to-b from-tint-pink to-blush py-section">
      <div className="container relative z-1">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-5">
          <Reveal as="h2" id="courses-title" className="text-stroke-lg spark-after font-display text-section font-extrabold">
            คอร์สที่<em className="text-brand not-italic">แนะนำ</em>
          </Reveal>
          <Reveal>
            <Button variant="line" size="sm" href="/courses">
              ดูคอร์สทั้งหมด →
            </Button>
          </Reveal>
        </div>

        <ul className="grid max-w-290 grid-cols-[repeat(auto-fit,minmax(min(100%,270px),1fr))] gap-6">
          {courses.map((course) => (
            <Reveal as="li" key={course.id}>
              <article className="flex h-full flex-col overflow-hidden rounded-photo bg-white shadow-[0_22px_44px_rgba(255,0,126,0.16)] transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_28px_52px_rgba(255,0,126,0.24)]">
                <figure style={{ background: course.cover }} className="relative flex aspect-video items-end overflow-hidden px-6.5 pb-4">
                  <div className="grain-overlay absolute" />
                  <IconSpark className="absolute top-[14%] right-[9%] w-11 text-white/90" />
                  <IconSpark className="absolute top-[54%] right-[26%] w-4.5 text-white/60" />
                  <span className="text-stroke z-1 relative border border-brand/50 rounded-ui bg-white px-3.5 py-1 font-display text-base font-bold text-brand-deep shadow-[0_8px_16px_rgba(120,0,60,0.2)]">
                    {course.tag}
                  </span>

                  <img src="/images/course.jpg" className="size-full absolute top-0 left-0 object-cover" alt="" />
                </figure>
                <div className="flex flex-1 flex-col items-start gap-2.5 px-6.5 pt-5.5 pb-8">
                  <h3 className="font-display text-xl font-bold text-ink">{course.title}</h3>
                  <p className="text-base leading-relaxed text-ink-soft">{course.description}</p>
                  <Button variant="line" href="/courses" className="mt-auto px-5.5 py-2.25 text-base">
                    ดูรายละเอียด →
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
