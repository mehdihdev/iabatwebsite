import Image from "next/image";
import Link from "next/link";
import { ADDRESS, EMAIL, MAP_EMBED_URL, ORG_NAME, PHONE_DISPLAY, PHONE_HREF, SOCIALS } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-forest text-sand">
      <div className="wrap py-12">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-9">
          <div>
            <Image src="/iabat_white.png" alt="IABAT" width={412} height={768} className="mb-3.5 h-[34px] w-auto" />
            <p className="mb-1 text-sm leading-relaxed">
              {ADDRESS.street}
              <br />
              {ADDRESS.cityLine}
            </p>
            <p className="mt-2.5 text-sm">
              <a href={PHONE_HREF} className="hover:text-white">
                {PHONE_DISPLAY}
              </a>
              <br />
              <a href={`mailto:${EMAIL}`} className="text-gold hover:text-gold-light">
                {EMAIL}
              </a>
            </p>
          </div>

          <div>
            <h3 className="mb-3.5 text-[13px] font-semibold tracking-[0.12em] text-white uppercase">Quick links</h3>
            <div className="flex flex-col gap-2 text-sm">
              <Link href="/#prayer-times" className="hover:text-white">Prayer times</Link>
              <Link href="/about" className="hover:text-white">About</Link>
              <Link href="/building-project" className="hover:text-white">Building project</Link>
              <Link href="/donate" className="hover:text-white">Donate</Link>
            </div>
          </div>

          <div>
            <h3 className="mb-3.5 text-[13px] font-semibold tracking-[0.12em] text-white uppercase">Follow us</h3>
            <div className="flex flex-col gap-2 text-sm">
              {SOCIALS.map((s) => (
                <a key={s.name} href={s.url} className="hover:text-white">
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-3.5 text-[13px] font-semibold tracking-[0.12em] text-white uppercase">Visit us</h3>
            <div className="overflow-hidden rounded-[10px]">
              <iframe src={MAP_EMBED_URL} width="100%" height="150" className="block border-0" loading="lazy" title="IABAT Location" />
            </div>
          </div>
        </div>

        {/* Bottom padding keeps the copyright clear of the floating Quran player on phones */}
        <div className="mt-9 border-t border-white/15 pt-6 pb-16 text-center text-[13px] sm:pb-0">
          <p>
            © {new Date().getFullYear()} {ORG_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
