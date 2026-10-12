import ContactForm from "@/components/ContactForm";
import { ADDRESS, EMAIL, MAP_EMBED_URL, PHONE_DISPLAY, PHONE_HREF, SOCIALS } from "@/lib/site";

export default function Contact() {
  return (
    <>
      <section className="bg-hatch border-b border-line">
        <div className="wrap py-[clamp(40px,6vw,64px)]">
          <p className="eyebrow">Contact</p>
          <h1 className="m-0 font-serif text-[clamp(36px,5.5vw,52px)] leading-[1.08] font-semibold">
            We&apos;d love to hear from you
          </h1>
        </div>
      </section>

      <section className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(340px,100%),1fr))] items-start gap-10 py-14">
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(200px,100%),1fr))] gap-3">
            <div className="rounded-xl border border-line bg-white p-5">
              <p className="mb-1.5 text-[13px] font-semibold tracking-[0.1em] text-muted uppercase">Address</p>
              <p className="m-0 text-base leading-normal">
                {ADDRESS.street}
                <br />
                {ADDRESS.cityLine}
              </p>
            </div>
            <div className="rounded-xl border border-line bg-white p-5">
              <p className="mb-1.5 text-[13px] font-semibold tracking-[0.1em] text-muted uppercase">Phone &amp; email</p>
              <p className="m-0 text-base leading-normal">
                <a href={PHONE_HREF} className="text-brand hover:text-brand-dark">
                  {PHONE_DISPLAY}
                </a>
                <br />
                <a href={`mailto:${EMAIL}`} className="text-brand hover:text-brand-dark">
                  {EMAIL}
                </a>
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-[14px] border border-line">
            <iframe src={MAP_EMBED_URL} width="100%" height="300" className="block border-0" loading="lazy" title="IABAT Location" />
          </div>
          <div className="flex flex-wrap gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.url}
                className="rounded-full border border-line-strong px-4 py-2.5 text-sm font-semibold text-ink hover:border-brand hover:text-brand"
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>

        <div className="rounded-[14px] border border-line bg-white p-5 sm:p-7">
          <ContactForm />
        </div>
      </section>
    </>
  );
}
