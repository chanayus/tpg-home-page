import Image from "next/image";
import tKedPhoto from "@/public/images/t-ked.webp";
import tWinPhoto from "@/public/images/t-win.webp";
import { Reveal } from "../Reveal";

const instructors = [
  {
    name: "พี่วิน",
    photo: tWinPhoto,
    role: "ผู้ก่อตั้ง · ติวเตอร์ TGAT",
    school: "เศรษฐศาสตร์ จุฬาลงกรณ์มหาวิทยาลัย",
    points: ["TGAT Top 0.47% ของประเทศ", "ผู้เขียนหนังสือ TGAT1+TGAT2 และ TGAT2+TGAT3 (Think Beyond)", "วิทยากรรับเชิญแนะแนวที่ ร.ร. เตรียมอุดมศึกษา"],
    stat: { value: "82.08", label: "คะแนน TGAT 1-3 เต็ม 100" },
  },
  {
    name: "พี่เกด",
    photo: tKedPhoto,
    role: "ผู้ก่อตั้ง · ติวเตอร์ภาษาอังกฤษ",
    school: "ป.โท การสอนภาษาอังกฤษ ธรรมศาสตร์",
    points: ["B.A. in English เกียรตินิยมอันดับ 1", "ผู้เขียนหนังสือ Best Seller “900 คลังศัพท์คัดพิเศษ”", "ผู้เชี่ยวชาญวิชาภาษาอังกฤษระดับอุดมศึกษา"],
    stat: { value: "8+", label: "ปีสอนภาษาอังกฤษโดยตรง" },
  },
];

export function Instructors() {
  return (
    <Reveal as="section" aria-labelledby="instructors-title" className=" py-section">
      <div className="container">
        <h2 id="instructors-title" className="mb-10 font-display text-section font-black text-ink">
          คนสอนคือ<span className="text-brand-deep">ใคร</span>
        </h2>

        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(420px,100%),1fr))] gap-6">
          {instructors.map((inst) => (
            <li key={inst.name} className="flex flex-col gap-5 border border-brand/12 bg-white p-8 shadow-[0_10px_30px_rgba(197,48,125,0.08)]">
              <div className="flex gap-5">
                <Image src={inst.photo} alt="" className="w-27 shrink-0 border border-brand/30 object-cover" sizes="108px" />
                <div>
                  <h3 className="mb-1 font-display text-[26px] font-extrabold text-ink">{inst.name}</h3>
                  <p className="mb-1 text-sm font-bold text-brand-deep">{inst.role}</p>
                  <p className="text-xs text-ink/50">{inst.school}</p>
                </div>
              </div>

              <ul className="flex flex-col gap-2.5">
                {inst.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5 border-t border-brand/10 pt-2.5">
                    <span aria-hidden="true" className="shrink-0 text-sm font-extrabold text-brand">
                      ＋
                    </span>
                    <span className="text-sm leading-[1.6] text-ink/75">{point}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-auto flex items-baseline gap-2.5">
                <span className="font-display text-[34px] font-black text-brand">{inst.stat.value}</span>
                <span className="text-xs text-ink/55">{inst.stat.label}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
