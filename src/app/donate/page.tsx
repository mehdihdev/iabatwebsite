import DonateForm from "@/components/DonateForm";
import { EMAIL, GOFUNDME_URL, MAILING_ADDRESS, PHONE_DISPLAY, PHONE_HREF, TAX_ID } from "@/lib/site";

const IMPACT = [
  { name: "Mosque Operations", body: "Keep our mosque doors open for daily prayers and community gatherings." },
  { name: "Education Programs", body: "Fund Islamic education for children and adults in our community." },
  { name: "Community Events", body: "Support cultural celebrations and interfaith community building." },
  {
    name: "Khums",
    body: "IABAT has permission from Imam Mahdi Association of Marjaeya (I.M.A.M.), the liaison office of Grand Ayatullah Sistani, to accept Khums.",
  },
];

export default async function Donate({
  searchParams,
}: {
  searchParams: Promise<{ fund?: string; frequency?: string }>;
}) {
  const { fund, frequency } = await searchParams;

  return (
    <>
      <section className="bg-hatch border-b border-line">
        <div className="wrap py-[clamp(40px,6vw,64px)]">
          <p className="eyebrow">Donate</p>
          <h1 className="mb-3 font-serif text-[clamp(36px,5.5vw,52px)] leading-[1.08] font-semibold">
            Support your community
          </h1>
          <p className="m-0 max-w-[600px] text-[17px] leading-[1.6] text-muted">
            Your generous donations help us serve the Muslim community in the Triangle area.
          </p>
        </div>
      </section>

      <section className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] items-start gap-10 py-14">
        <DonateForm initialReason={fund} initialFrequency={frequency} />

        <div className="flex flex-col gap-4">
          <h2 className="m-0 font-serif text-[30px] font-semibold">Where your gift goes</h2>
          {IMPACT.map((i) => (
            <div key={i.name} className="border-b border-line pb-4">
              <p className="mb-1 text-base font-semibold">{i.name}</p>
              <p className="m-0 text-[15px] leading-[1.55] text-muted">{i.body}</p>
            </div>
          ))}
          <p className="m-0 text-sm leading-[1.6] text-muted">
            IABAT is a 501(c)(3) organization, so all donations are tax deductible. Upon receipt of your donation, IABAT
            will issue a tax receipt for your records.
          </p>
        </div>
      </section>

      <section className="border-t border-line bg-white">
        <div className="wrap py-14">
          <h2 className="section-title mb-6">Other ways to give</h2>
          <div data-stagger className="grid grid-cols-[repeat(auto-fit,minmax(min(260px,100%),1fr))] gap-4">
            <div className="lift flex flex-col gap-2.5 rounded-xl border border-line bg-cream p-5 sm:p-6">
              <h3 className="m-0 font-serif text-2xl font-semibold">Mail a check</h3>
              <p className="m-0 text-[15px] leading-[1.55] text-muted">
                Make checks out to IABAT and send to:
                <br />
                {MAILING_ADDRESS.line1}
                <br />
                {MAILING_ADDRESS.line2}
              </p>
              <p className="m-0 text-[15px] font-semibold">Tax ID: {TAX_ID}</p>
            </div>
            <div className="lift flex flex-col gap-2.5 rounded-xl border border-line bg-cream p-5 sm:p-6">
              <h3 className="m-0 font-serif text-2xl font-semibold">GoFundMe</h3>
              <p className="m-0 flex-1 text-[15px] leading-[1.55] text-muted">
                Support the building project through our GoFundMe campaign.
              </p>
              <a href={GOFUNDME_URL} className="text-link text-[15px]">
                Visit GoFundMe →
              </a>
            </div>
            <div className="lift flex flex-col gap-2.5 rounded-xl border border-line bg-cream p-5 sm:p-6">
              <h3 className="m-0 font-serif text-2xl font-semibold">Questions about giving?</h3>
              <p className="m-0 flex-1 text-[15px] leading-[1.55] text-muted">
                Our team is here to help you find the best way to support our community.
              </p>
              <p className="m-0 text-[15px]">
                <a href={`mailto:${EMAIL}`} className="text-link">
                  {EMAIL}
                </a>
                <br />
                <a href={PHONE_HREF} className="text-link">
                  {PHONE_DISPLAY}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
