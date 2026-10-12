import Image from "next/image";
import Link from "next/link";
import PrayerTimesHero from "@/components/PrayerTimesHero";
import ProgramCards from "@/components/ProgramCards";
import BudgetFigures from "@/components/BudgetFigures";
import { getLatestLectures } from "@/lib/youtube";
import { YOUTUBE_URL } from "@/lib/site";

export const revalidate = 3600;

export default async function Home() {
  const lectures = await getLatestLectures(3);

  return (
    <>
      <PrayerTimesHero />

      <section className="wrap py-14">
        <div className="mb-6">
          <h2 className="section-title">Weekly programs</h2>
        </div>
        <ProgramCards />
      </section>

      <section className="bg-forest text-parchment">
        <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] items-center gap-10 py-14">
          <div>
            <p className="eyebrow text-gold">Building Project</p>
            <h2 className="mb-4 font-serif text-[clamp(30px,4vw,38px)] leading-[1.15] font-semibold">
              The first Shia Ithna Ashari Muslim center in North Carolina
            </h2>
            <p className="mb-7 text-base leading-relaxed text-sand">
              Help us build a permanent home for our community. Every contribution brings us closer.
            </p>
            <div className="mb-8">
              <BudgetFigures />
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/donate?fund=Building%20Fund" className="btn btn-gold">
                Donate to the project
              </Link>
              <Link href="/building-project" className="btn btn-ghost-light">
                Learn more
              </Link>
            </div>
          </div>
          <div className="relative h-80 overflow-hidden rounded-[14px]">
            <Image src="/iabatback.jpeg" alt="IABAT building project site" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="wrap py-14">
        <div className="mb-6 flex flex-wrap items-baseline justify-between gap-4">
          <h2 className="section-title">Latest lectures</h2>
          <a href={YOUTUBE_URL} className="text-link text-[15px]">
            Watch on YouTube →
          </a>
        </div>
        {lectures.length > 0 ? (
          <div data-stagger className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-4">
            {lectures.map((lec) => (
              <a
                key={lec.id}
                href={lec.url}
                className="lift group block overflow-hidden rounded-xl border border-line bg-white text-ink hover:border-brand"
              >
                <div className="relative aspect-video bg-line">
                  <Image src={lec.thumbnail} alt="" fill sizes="(min-width: 1140px) 360px, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]" />
                </div>
                <div className="px-[18px] py-4">
                  <p className="mb-1 line-clamp-2 text-base font-semibold">{lec.title}</p>
                  <p className="m-0 text-[13px] text-muted">
                    {new Date(lec.published).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      timeZone: "America/New_York",
                    })}
                  </p>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <p className="text-muted">
            Lectures and majalis are posted on the{" "}
            <a href={YOUTUBE_URL} className="text-link">
              IABAT YouTube channel
            </a>
            .
          </p>
        )}
      </section>

      <section className="border-t border-line bg-white">
        <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] items-center gap-10 py-14">
          <div className="relative h-[300px] overflow-hidden rounded-[14px]">
            <Image src="/miamiblvd.jpg" alt="IABAT Center on S Miami Blvd" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
          <div>
            <h2 className="section-title mb-4">Serving the Triangle since 1999</h2>
            <p className="mb-5 text-base leading-[1.65] text-muted">
              IABAT is a nonprofit organization serving Muslims in the Triangle area of North Carolina, committed to
              the religious beliefs and practices of the Ja`fari Ithna `Ashari Shiah sect of Islam.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/about" className="btn btn-primary">
                About us
              </Link>
              <Link href="/contact" className="btn btn-outline">
                Plan a visit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
