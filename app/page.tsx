import { AdmitMarquee } from "@/components/home/AdmitMarquee";
import { RecommendedCourses } from "@/components/home/RecommendedCourses";
import { CtaBanner } from "@/components/home/CtaBanner";
import { Gallery } from "@/components/home/Gallery";
import { Hero } from "@/components/home/Hero";
import { Instructors } from "@/components/home/Instructors";
import { ResultsWall } from "@/components/home/ResultsWall";
import { WhyUs } from "@/components/home/WhyUs";

export default function Home() {
  return (
    <main className="flex-1 grid-tint-bg ">
      <Hero />
      <AdmitMarquee />
      <ResultsWall />
      <Instructors />
      <Gallery />
      <WhyUs />
      <RecommendedCourses />
      <CtaBanner />
    </main>
  );
}
