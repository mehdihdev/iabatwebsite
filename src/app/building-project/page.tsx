import Image from "next/image";
import Link from "next/link";
import BudgetFigures from "@/components/BudgetFigures";
import { GOFUNDME_URL, MAILING_ADDRESS, TAX_ID } from "@/lib/site";

const ACCOMPLISHMENTS = [
  {
    title: "Land purchase & approval",
    body: "After 18 months of preliminary planning, applications, and regulatory procedures, we received approval from the City of Durham to start construction. We have spent $400,000 to purchase 3.2 acres of land, which has been fully paid.",
  },
  {
    title: "Professional architecture",
    body: "A formal contract has been signed with a professional and licensed architectural firm which is donating 33% of its income from this project towards IABAT's building fund.",
  },
  {
    title: "First Shia Muslim cemetery in NC",
    body: "We have received approval from the City of Durham for a 300-grave cemetery on the property, which sets us apart from many other religious centers across North America. This would be the first Shia Muslim cemetery in the state of North Carolina.",
  },
  {
    title: "Religious authority & tax status",
    body: "We have permission from Imam Mahdi Association of Marjaeya (I.M.A.M.), which is the liaison office of Grand Ayatullah Sistani, to accept Khums. We also have 501(c)(3) designation, making all donations tax deductible.",
  },
];

const COMMUNITY = [
  "One of the most diverse mix of followers in the USA, with multiple countries and languages of origin",
  "Resident Aalim (Sheikh Dr. Mehdi Hazari)",
  "Regular prominent national and international speakers",
  "Active participation in local charity work",
  "Weekend school with full-fledged curriculum (90 students)",
  "English as primary language to cultivate Muslim American identity",
];

export default function BuildingProject() {
  return (
    <>
      <section className="bg-forest text-parchment">
        <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] items-center gap-10 py-[clamp(40px,6vw,64px)]">
          <div>
            <p className="eyebrow text-gold">Building Project</p>
            <h1 className="mb-4 font-serif text-[clamp(36px,5.5vw,50px)] leading-[1.08] font-semibold">
              Building the first Shia Ithna Ashari Muslim center in North Carolina
            </h1>
            <p className="m-0 text-[17px] leading-[1.6] text-sand">
              By the Grace of Allah (SWT) and with the support of our ever-growing community, we have purchased 3.2
              acres of land in the city of Durham.
            </p>
          </div>
          <div className="rounded-[14px] border border-white/15 bg-white/[0.06] p-5 sm:p-7">
            <div className="mb-7">
              <BudgetFigures size="lg" />
            </div>
            <Link
              href="/donate?fund=Building%20Fund"
              className="btn btn-gold block py-3.5 text-center text-base"
            >
              Donate to the project
            </Link>
          </div>
        </div>
      </section>

      <section className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] items-center gap-10 py-14">
        <div className="relative h-[340px] overflow-hidden rounded-[14px]">
          <Image src="/iabatback.jpeg" alt="Building project site" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
        </div>
        <div>
          <p className="eyebrow">As-Salaam Alaikum Dear Followers of the Ahlul Bayt</p>
          <h2 className="section-title mb-4">Why it matters</h2>
          <p className="mb-4 text-base leading-[1.7] text-muted">
            With great pleasure, IABAT would like to share a remarkable milestone on the path to building the first Shia
            Ithna Ashari Muslim center in North Carolina.
          </p>
          <p className="m-0 text-base leading-[1.7] text-muted">
            The size of our community and the lack of appropriate rental spaces necessitates our own space to
            accommodate our growing populous. During the recent first 10 days of Muharram, we reached a peak crowd of
            350+. Our weekend school had almost 90 students in attendance last year.
          </p>
        </div>
      </section>

      <section className="border-y border-line bg-white">
        <div className="wrap py-14">
          <h2 className="section-title mb-6">Project vision</h2>
          <div className="overflow-hidden rounded-[14px] border border-line">
            <iframe
              className="block aspect-video w-full border-0"
              src="https://www.youtube.com/embed/2I471Ossr8k"
              title="IABAT Building Project"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="lazy"
            />
          </div>
          <p className="mt-3.5 text-[13px] text-muted">
            Watch our vision for the first Shia Ithna Ashari Muslim center in North Carolina.
          </p>
        </div>
      </section>

      <section className="wrap py-14">
        <h2 className="section-title mb-6">Major accomplishments</h2>
        <div data-stagger className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-4">
          {ACCOMPLISHMENTS.map((a) => (
            <div key={a.title} className="lift flex flex-col gap-2 rounded-xl border border-line bg-white p-5 sm:p-6">
              <h3 className="m-0 font-serif text-2xl font-semibold">{a.title}</h3>
              <p className="m-0 text-[15px] leading-[1.6] text-muted">{a.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-white">
        <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] items-center gap-10 py-14">
          <div>
            <h2 className="section-title mb-5">Our diverse community since 1999</h2>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {COMMUNITY.map((c) => (
                <li key={c} className="flex gap-3 text-base leading-[1.55] text-muted">
                  <span className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-[340px] overflow-hidden rounded-[14px]">
            <Image src="/miamiblvd.jpg" alt="IABAT Community" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-forest text-parchment">
        <div className="wrap py-14 text-center">
          <blockquote className="mx-auto mb-4 max-w-[760px] font-serif text-[clamp(24px,3.5vw,32px)] leading-[1.3] font-medium italic">
            &ldquo;You will never attain piety till you spend from that which you love. And whatever you spend, truly
            God knows it.&rdquo;
          </blockquote>
          <p className="m-0 text-sm tracking-[0.1em] text-gold uppercase">Al-Qur&apos;an, 3:92</p>
        </div>
      </section>

      <section className="wrap py-14">
        <h2 className="section-title mb-6">Ways to give</h2>
        <div data-stagger className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-4">
          <div className="lift flex flex-col gap-2.5 rounded-xl border border-line bg-white p-5 sm:p-6">
            <h3 className="m-0 font-serif text-2xl font-semibold">Online donation</h3>
            <p className="m-0 flex-1 text-[15px] leading-[1.55] text-muted">Donate securely through PayPal.</p>
            <Link href="/donate?fund=Building%20Fund" className="text-link text-[15px]">
              Donate online →
            </Link>
          </div>
          <div className="lift flex flex-col gap-2.5 rounded-xl border border-line bg-white p-5 sm:p-6">
            <h3 className="m-0 font-serif text-2xl font-semibold">Mail a check</h3>
            <p className="m-0 flex-1 text-[15px] leading-[1.55] text-muted">
              Send checks made out to IABAT:
              <br />
              {MAILING_ADDRESS.line1}
              <br />
              {MAILING_ADDRESS.line2}
            </p>
            <p className="m-0 text-[15px] font-semibold">Tax ID: {TAX_ID}</p>
          </div>
          <div className="lift flex flex-col gap-2.5 rounded-xl border border-line bg-white p-5 sm:p-6">
            <h3 className="m-0 font-serif text-2xl font-semibold">GoFundMe</h3>
            <p className="m-0 flex-1 text-[15px] leading-[1.55] text-muted">
              Support us through our GoFundMe campaign.
            </p>
            <a href={GOFUNDME_URL} className="text-link text-[15px]">
              Visit GoFundMe →
            </a>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="mb-2 text-base text-muted">
            All donations are tax deductible. Upon receipt of your donations, IABAT will issue a tax receipt for your
            records.
          </p>
          <p className="m-0 font-semibold text-brand">
            May Allah SWT guide us to follow the path of the Ahlul Bayt and reward you for your donations. JazakAllah
            Khair.
          </p>
        </div>
      </section>
    </>
  );
}
