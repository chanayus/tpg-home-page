import Link from "next/link";
import logo from "@/public/images/logo.webp";
import Image from "next/image";

export const socials = [
  { name: "Facebook", href: "https://www.facebook.com/profile.php?id=61572808792575&rdid=fFwIBJjQZHrGLw6W&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F14qgEgWgv2%2F#" },
  { name: "Instagram", href: "https://www.instagram.com/theprogress_go?igsh=anQzazNuOXd1djhj" },
  { name: "LINE", href: "https://line.me/R/ti/p/@453qifrr" },
  { name: "YouTube", href: "https://www.youtube.com/@TheProgress_GO" },
  { name: "TikTok", href: "https://www.tiktok.com/@theprogress_go" },
  { name: "X", href: "https://x.com/theprogress_go" },
];

export function Footer() {
  return (
    <footer id="contact" className="bg-ink lg:pt-18 pt-10 pb-8">
      <div className="container">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-6 border-b border-white/10 pb-8">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src={logo} alt="" className="size-9.5 shrink-0 rounded-full object-cover" priority />
            <span className="font-display text-lg font-extrabold text-white">The Progress</span>
          </Link>
          <nav aria-label="ช่องทางติดตาม">
            <ul className="flex flex-wrap gap-7">
              {socials.map((social) => (
                <li key={social.name}>
                  <a href={social.href} target="_blank" className="text-sm font-semibold text-[#f5f2ef]/60 hover:text-petal">
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="text-xs text-white/40">© 2569 The Progress. สงวนลิขสิทธิ์.</p>
      </div>
    </footer>
  );
}
