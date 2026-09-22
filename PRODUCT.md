# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

ม.6 (Thai final-year high school) students preparing for TGAT and A-Level (Math, English) — the university-admission exams — plus their parents, who want visibility into their child's progress and someone accountable for outcomes, not just class hours.

## Product Purpose

The Progress is a tutoring service for TGAT and A-Level test prep. It exists to get students admitted ("สอบติด") by pairing systematic content coverage with close, individualized mentorship all the way to exam day, rather than one-off cram classes.

## Positioning

Everything is taught and personally handled by the two named founders, not a rotating roster of hired tutors: พี่วิน (Economics, Chulalongkorn; TGAT top 0.47% nationally; author of TGAT prep books) covers TGAT/Math, and พี่เกด (M.A. English Teaching, Thammasat; author of a best-selling vocab book) covers English. A neighboring cram school can claim results; it cannot claim the founders personally track every student, call parents weekly, and answer students directly.

## Operating Context

- Courses are browsed/purchased via `/courses`; the homepage recommends a subset.
- Primary contact channel is the LINE official account (`@453qifrr`) — surfaced as a persistent floating button site-wide and repeated in CTAs.
- Social presence: Facebook, Instagram, LINE, YouTube, TikTok, X (see `components/Footer.tsx` for current handles).

## Capabilities and Constraints

- Course catalog on the homepage (`components/home/RecommendedCourses.tsx`) is currently mock data; a Firestore-backed fetch exists commented out, not yet wired live.
- Student result/chat-screenshot proof (`components/home/ResultsWall.tsx`) and admission-success cards are placeholder content today (Unsplash stand-ins / "ชื่อน้อง" labels) pending real assets from the client — confirmed to stay as placeholders in the current redesign pass rather than being fabricated.
- Built on Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + Motion (animation) + Swiper (carousels); this is an existing, already-functioning codebase, not greenfield.

## Brand Commitments

- Name: "The Progress". Existing logo at `public/images/logo.webp`.
- Real tutor photography: `public/images/t-win.webp`, `public/images/t-ked.webp` — used as-is, not replaced.
- LINE OA `@453qifrr` is the binding primary contact CTA across the site.

## Evidence on Hand

- Real, confirmed instructor credentials/bios and stats (see `components/home/Instructors.tsx`) — TGAT score 82.08, 9+ years teaching, etc. These are factual and must be preserved, not rewritten as marketing fluff.
- Real course names: TGAT (all parts), A-Level Math 1/2, A-Level English.
- Student testimonials, admission-success cards, and chat-screenshot proof are **not real yet** — explicitly placeholder pending client-supplied assets. Do not invent student names, schools, or scores to fill these.

## Product Principles

- Closeness over institutional distance: every section should reinforce that the founders personally teach and personally care, not "a school."
- Proof through founder credentials plus (honestly labeled) placeholder student outcomes — never fabricate evidence.
- "Walk with you to exam day" narrative (พี่ร่วมทาง) over hard-sell urgency.
- Thai-language, exam-prep register: direct, encouraging, peer-like (older-sibling voice), not corporate.
