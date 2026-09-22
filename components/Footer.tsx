import Link from "next/link";
import logo from "@/public/images/logo-white.webp";
import Image from "next/image";
import { Button } from "./Button";
import { IconSquiggle } from "./home/SvgProps";

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
    <footer id="contact" style={{ background: "linear-gradient(110deg, #e0006f, #c2005f 70%, #a8004f)" }} className="relative overflow-hidden rounded-t-panel  text-white">
      <div className="grain-overlay absolute opacity-25" />
      {/* <IconSquiggle className="pointer-events-none absolute -top-40 -right-00 h-100 w-auto text-white/10" /> */}

      <div className="container flex relative items-center z-1 pt-8 pb-6">
        <div className="flex lg:flex-row justify-between lg:items-center flex-col gap-8 flex-1">
          <Image src={logo} alt="" className="size-24 border-black" priority />

          <nav aria-label="ช่องทางติดตาม" className="flex gap-2 flex-wrap">
            {socials.map((social) => (
              <Button key={social.name} variant="glass" href={social.href} target="_blank" rel="noreferrer" size="sm">
                {social.name}
              </Button>
            ))}
          </nav>
        </div>
        {/* <figure className="flex-1 max-lg:hidden h-72 relative top-6 hidden">
          <img src="/images/t-win.webp" alt="" className="w-1/2 absolute left-[50%] h-full object-contain" />
          <img src="/images/t-ked.webp" alt="" className="w-1/2 absolute left-[25%] h-full object-contain" />
        </figure> */}
      </div>

      <div className="border-t border-white/25">
        <p className="py-6 container text-sm text-white/90">2569 The Progress. สงวนลิขสิทธิ์.</p>
      </div>
    </footer>
  );
}
