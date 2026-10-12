import Image from "next/image";
import Link from "next/link";
import ProgramCards from "@/components/ProgramCards";
import { ADDRESS, DIRECTIONS_URL, MAP_EMBED_URL } from "@/lib/site";

const BOARD_MEMBERS = [
  { name: "Karrar Husain", title: "President" },
  { name: "Ouj Zaman", title: "Director of Treasury" },
  { name: "Sadaf Abbas", title: "Director of Education" },
];

const ALIM_BACKGROUND = [
  "Completed high school and undergraduate studies at University of Florida/Florida Atlantic University",
  "Received Master's degree from University of Toronto",
  "Received doctorate from Johns Hopkins University",
  "Physiologist/environmental scientist specializing in neuro- and cardiovascular physiology",
  "Studies the effects of air pollution on human health",
];

export default function About() {
  return (
    <>
      <section className="bg-hatch border-b border-line">
        <div className="wrap py-[clamp(40px,6vw,64px)]">
          <p className="eyebrow">About IABAT</p>
          <h1 className="mb-4 max-w-[760px] font-serif text-[clamp(36px,5.5vw,52px)] leading-[1.08] font-semibold">
            A community rooted in the teachings of the Ahlulbayt
          </h1>
          <p className="m-0 max-w-[640px] text-[17px] leading-[1.6] text-muted">
            Serving Muslims in the Triangle area of North Carolina since 1999.
          </p>
        </div>
      </section>

      <section className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] items-center gap-10 py-14">
        <div>
          <h2 className="section-title mb-4">Who we are</h2>
          <p className="mb-4 text-base leading-[1.7] text-muted">
            The Islamic Ahlul Bayt Association of the Triangle (IABAT) is a nonprofit organization located and serving
            Muslims in the Triangle area of North Carolina. The organization has been in existence since 1999. IABAT is
            committed to the religious beliefs and practices of the Ja`fari Ithna `Ashari Shiah sect of Islam, and all
            of its activities and education are based on the teachings of this sect.
          </p>
          <p className="m-0 text-base leading-[1.7] text-muted">
            The intention of IABAT is to serve as an educational and social center for the purpose of conducting classes
            and events for Islamic teachings of its sect for its members and their children. IABAT conducts religious
            and social ceremonies such as marriages and funerals and is engaged in charitable works for needy families
            of the Ithna `Asahari Shi`ah Muslim community in and outside the United States of America and also for
            those who are needy in the local community at large.
          </p>
        </div>
        <div className="relative h-[340px] overflow-hidden rounded-[14px]">
          <Image src="/miamiblvd.jpg" alt="IABAT Center" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
      </section>

      <section className="wrap pb-14">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-10">
          <p className="m-0 text-base leading-[1.7] text-muted">
            IABAT at all times endeavors to establish positive and mutually beneficial relationships with local Islamic
            communities of other Islamic sects as well as with Christian, Jewish and other religious organizations in
            order to promote understanding. It can also participate in other relationships including memberships in
            national and international religious bodies representing the interests of IABAT.
          </p>
          <p className="m-0 text-base leading-[1.7] text-muted">
            All classes, instruction and services are in English with Arabic used as appropriate for recitation of the
            Holy Quran and other religious texts. Separate gatherings with services in other languages such as Urdu or
            Farsi can be approved by the board as long as they do not supersede or conflict with the main English
            programs.
          </p>
        </div>
      </section>

      <section className="border-y border-line bg-white">
        <div className="wrap py-14">
          <h2 className="section-title mb-6">What we offer</h2>
          <ProgramCards tone="cream" />
        </div>
      </section>

      <section className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] items-center gap-10 py-14">
        <div className="text-center">
          <div className="relative mx-auto mb-5 h-48 w-48 overflow-hidden rounded-full border border-line">
            <Image src="/mehdihazari.png" alt="Sheikh Dr. Mehdi Hazari" fill sizes="192px" className="object-cover" />
          </div>
          <p className="eyebrow mb-1">Resident Alim</p>
          <h2 className="section-title">Sheikh Dr. Mehdi Hazari</h2>
        </div>
        <div>
          <p className="mb-5 text-base leading-[1.7] text-muted">
            Shaykh Hazari was born in Toronto, Canada, but he spent most of his youth in the Sultanate of Oman where he
            received his primary education; his family moved to the United States in the 1980&apos;s.
          </p>
          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            {ALIM_BACKGROUND.map((item) => (
              <li key={item} className="flex gap-3 text-base leading-[1.55] text-muted">
                <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-y border-line bg-white">
        <div className="wrap py-14">
          <div className="mb-8 max-w-[760px]">
            <h2 className="section-title mb-4">Organization structure</h2>
            <p className="m-0 text-base leading-[1.7] text-muted">
              IABAT consists of a general body of members governed by a Board of Directors and a Board of Trustees.
              Sub-committees are appointed to serve various functions as needed. Religious matters are overseen by a
              Ja`fari Ithna `Ashari Shi`ah religious scholar residing in the United States. Voting members are expected
              to pay annual dues.
            </p>
          </div>
          <h3 className="mb-4 font-serif text-2xl font-semibold">Board of Directors</h3>
          <div data-stagger className="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-4">
            {BOARD_MEMBERS.map((m) => (
              <div key={m.name} className="lift rounded-xl border border-line bg-cream p-5 sm:p-6">
                <p className="mb-1 text-[13px] font-semibold tracking-[0.1em] text-brand uppercase">{m.title}</p>
                <p className="m-0 font-serif text-2xl font-semibold">{m.name}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[15px] text-muted">And more dedicated board members serving our community.</p>
        </div>
      </section>

      <section className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] items-center gap-10 py-14">
        <div>
          <h2 className="section-title mb-3">Visit the center</h2>
          <p className="mb-5 text-base leading-[1.65] text-muted">
            {ADDRESS.street}, {ADDRESS.cityLine}. Everyone is welcome to join our prayers and programs.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={DIRECTIONS_URL} className="btn btn-primary">
              Get directions
            </a>
            <Link href="/#prayer-times" className="btn btn-outline">
              Prayer times
            </Link>
          </div>
        </div>
        <div className="overflow-hidden rounded-[14px] border border-line">
          <iframe src={MAP_EMBED_URL} width="100%" height="280" className="block border-0" loading="lazy" title="IABAT Location" />
        </div>
      </section>
    </>
  );
}
