"use client";

import { useState, useEffect } from "react";

// import { doc, onSnapshot } from 'firebase/firestore';
// import { firestore } from '../utils/firebaseClient';

const mockupData = [
  ...Array(10)
    .keys()
    .map((value) => "/images/student.webp"),
];

function MarqueeRow({ ariaHidden = false, data = [] }: { ariaHidden?: boolean; data: string[] }) {
  return (
    <div className="flex w-max shrink-0 gap-3" aria-hidden={ariaHidden || undefined}>
      {data.map((img, i) => {
        return (
          <figure key={i} className={`admit-item lg:w-64 w-48 aspect-[0.8] overflow-hidden transition-opacity rounded-ui`}>
            <img src={img} alt="" className="w-full h-full object-contain" />
          </figure>
        );
      })}
    </div>
  );
}

export function StudentSuccess() {
  const [studentImage, setStudentImages] = useState<string[] | null>(null);

  // useEffect(() => {
  //   const d = doc(firestore, "settings", "home");
  //   const unsub = onSnapshot(
  //     d,
  //     (snap) => {
  //       const data = snap.data() as { chatImages?: string[] } | undefined;
  //       const arr = data?.chatImages || [];
  //       setStudentImages(arr.length > 0 ? arr : null);
  //     },
  //     () => setStudentImages(null),
  //   );
  //   return () => unsub();
  // }, []);

  const students = studentImage ?? mockupData;

  if (students.length === 0) return null;

  return (
    <section aria-label="รายชื่อน้องสอบติด" className="relative pt-9 bg-linear-to-b from-blush to-tint-pink py-4">
      {/* container's own left gutter/centering, reproduced by hand so this row can start where .container would but still bleed its right edge to the true viewport edge. */}
      <div className="flex flex-col gap-y-8 ">
        <h2 className="font-display spark-after lg:text-center font-bold gap-2.5 md:text-5xl text-3xl container text-stroke-lg max-lg:px-5 tracking-tight text-balance">
          ตัวอย่างความสำเร็จของลูกศิษย์ <span className="text-brand">The Progress</span>
        </h2>

        <div className="lg:mask-[linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)] min-w-0 flex-1 overflow-hidden py-1.5">
          <div className="animate-marquee flex w-max gap-3 [@media(hover:hover)]:[&:has(.admit-item:hover)_.admit-item:not(:hover)]:opacity-35">
            <MarqueeRow data={students} />
            <MarqueeRow data={students} ariaHidden />
          </div>
        </div>
      </div>
    </section>
  );
}
