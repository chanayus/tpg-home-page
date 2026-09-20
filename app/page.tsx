import { RecommendedCourses } from "@/components/home/RecommendedCourses";
import { CtaBanner } from "@/components/home/CtaBanner";
import { Features } from "@/components/home/Features";
import { Hero } from "@/components/home/Hero";
import { Instructors } from "@/components/home/Instructors";
import { ResultsWall } from "@/components/home/ResultsWall";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <ResultsWall />
      <Instructors />
      <RecommendedCourses />
      <Features />
      <CtaBanner />
    </main>
  );
}
