"use client";
import { useState } from "react";
import { Reveal } from "../Reveal";
import Image from "next/image";
// import { firestore } from '../utils/firebaseClient';


const resultTiles = [
  { rotate: -4, ratio: "3/4" },
  { rotate: 3, ratio: "1/1" },
  { rotate: -2, ratio: "4/5" },
  { rotate: 5, ratio: "3/4" },
  { rotate: -6, ratio: "1/1" },
  { rotate: 2, ratio: "4/5" },
  { rotate: 4, ratio: "3/4" },
  { rotate: -3, ratio: "1/1" },
  { rotate: 6, ratio: "4/5" },
  { rotate: -5, ratio: "3/4" },
  { rotate: -2, ratio: "4/5" },
  { rotate: 4, ratio: "3/4" },
].map((tile, i) => ({
  ...tile,
  label: `แชท/คอมเมนต์ #${i + 1}`,
  accent: i % 2 === 0 ? "var(--brand)" : "var(--brand-deep)",
}));

export function ResultsWall() {
  const [remoteChatImages, setRemoteChatImages] = useState<string[] | null>(null);

  // useEffect(() => {
  //   const d = doc(firestore, "settings", "home");
  //   const unsub = onSnapshot(
  //     d,
  //     (snap) => {
  //       const data = snap.data() as { chatImages?: string[] } | undefined;
  //       const arr = data?.chatImages || [];
  //       setRemoteChatImages(arr.length > 0 ? arr : null);
  //     },
  //     () => setRemoteChatImages(null),
  //   );
  //   return () => unsub();
  // }, []);

  const chatImages = remoteChatImages ?? [...Array(10).keys()];

  if (chatImages.length === 0) return null;

  return (
    <Reveal as="section" id="results" aria-labelledby="results-title" amount="some" className="border-brand/10 bg-blush py-12 md:py-16 border-y lg:py-20">
      <div className="container">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-5">
          <h2 id="results-title" className="font-display text-3xl font-black text-ink md:text-4xl lg:text-5xl">
            ผลลัพธ์<span className="text-brand">.</span>จริง
            <span className="text-brand-deep">.</span>ไม่ปรุงแต่ง
          </h2>
          <p className="text-sm text-ink/50">แคปแชทจากลูกศิษย์ตัวจริง →</p>
        </div>

        <Reveal
          as="ul"
          keyframes={{ scale: [0.75, 1], opacity: [0, 1] }}
          transition={{ type: "spring" }}
          stagger={0.05}
          amount="some"
          className="grid grid-cols-[repeat(auto-fill,minmax(190px,1fr))] gap-4.5"
        >
          {chatImages.map((image, index) => (
            <li
              key={resultTiles[index].label}
              className="flex items-center justify-center border border-brand/12 p-2 text-center"
              style={{
                aspectRatio: resultTiles[index].ratio,
                rotate: `${resultTiles[index].rotate}deg`,
                backgroundImage: "repeating-linear-gradient(135deg, #fdeef5 0 10px, #fce3ee 10px 20px)",
              }}
            >
              <Image
                unoptimized
                width={192}
                height={320}
                className="w-full h-full object-cover"
                src="https://images.unsplash.com/photo-1788927783390-326c75c0265e?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt={resultTiles[index].label}
              />
            </li>
          ))}
        </Reveal>
      </div>
    </Reveal>
  );
}
