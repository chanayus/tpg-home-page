import { StudentSuccess } from "../components/home/StudentSuccess";
import { RecommendedCourses } from "../components/home/RecommendedCourses";
import { CtaBanner } from "../components/home/CtaBanner";
import { Gallery } from "../components/home/Gallery";
import { Hero } from "../components/home/Hero";
import { Instructors } from "../components/home/Instructors";
import { StudentComments } from "../components/home/StudentComments";
import { WhyUs } from "../components/home/WhyUs";

export default function Home() {
  return (
    <main className="flex-1 grid-tint-bg" id="home-page">
      <Hero />
      <StudentSuccess />
      <StudentComments />
      <Instructors />
      <Gallery />
      <WhyUs />
      <RecommendedCourses />
      <CtaBanner />
    </main>
  );
}
