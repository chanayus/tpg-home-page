import { Reveal } from "../Reveal";

const features = [
  {
    num: "01",
    title: "Mock Test วิเคราะห์รายบุคคล",
    desc: "ทดสอบเสมือนจริง พร้อมผลวิเคราะห์จุดแข็ง/จุดอ่อน",
  },
  {
    num: "02",
    title: "Quiz วัดความเข้าใจ",
    desc: "ทดสอบก่อนขึ้นบทใหม่ทุกครั้ง ไม่ปล่อยให้ตามไม่ทัน",
  },
  {
    num: "03",
    title: "Progress Care",
    desc: "ติดตามน้องคะแนนน่าเป็นห่วง จัดคลาสพิเศษให้ทันที",
  },
  {
    num: "04",
    title: "Boost Up Class",
    desc: "ติวเสริมสดฟรีทุกเดือน เจาะจุดที่ยังไม่เข้าใจ",
  },
  {
    num: "05",
    title: "Brush Up Class",
    desc: "ทบทวนเนื้อหาสำคัญโค้งสุดท้ายก่อนสอบจริง",
  },
  {
    num: "06",
    title: "Openchat ส่วนตัว",
    desc: "ถามได้ทุกเรื่อง พี่วินพี่เกดตอบเอง ดูแลเอง",
  },
];

export function Features() {
  return (
    <Reveal as="section" aria-labelledby="features-title" className="py-section">
      <div className="container">
        <h2 id="features-title" className="mb-11 font-display text-section font-black text-ink">
          ทำไมต้อง <span className="text-brand-deep">The Progress</span>
        </h2>
        <ul className="grid xl:grid-cols-3 md:grid-cols-2 md:border-t border-brand/12">
          {features.map((feat, index) => (
            <li key={feat.num} className={`flex gap-5 ${index === features.length - 1 ? "md:border-b border-b-none " : "border-b"} border-brand/10 px-3 py-6.5`}>
              {/* A counter, not a heading — it would be noise in the outline. */}
              <p aria-hidden="true" className="w-14 shrink-0 font-display text-4xl font-black text-brand/18">
                {feat.num}
              </p>
              <div>
                <h3 className="mb-1.5 font-display text-base font-bold text-ink">{feat.title}</h3>
                <p className="text-sm leading-relaxed text-ink/60">{feat.desc}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
