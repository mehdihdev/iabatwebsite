"use client";
import { useState } from "react";

// PayPal donation reasons, in the exact order and spelling used on the original
// site. These are sent to PayPal as `item_name` and used by the treasury to
// categorize donations — do not rename them.
export const DONATION_REASONS = [
  "Building Fund",
  "Monthly Dues",
  "Weekend School Payments",
  "General Expenses",
  "Funds for speaker",
  "Sadqa",
  "Zakat (regular)",
  "Zakat Fitra Syed",
  "Zakat Fitra Non-Syed",
  "Khums sahm al-Imam",
  "Khums sahm as-Sadat",
  "Khums sahm al-Imam and as-Sadat",
  "Ghadeer Carnival",
] as const;

const DEFAULT_REASON = "General Expenses";
const FREQUENCIES = ["One-time", "Monthly"] as const;
type Frequency = (typeof FREQUENCIES)[number];

export default function DonateForm({
  initialReason,
  initialFrequency,
}: {
  initialReason?: string;
  initialFrequency?: string;
}) {
  const [selectedReason, setSelectedReason] = useState<string>(
    DONATION_REASONS.includes(initialReason as (typeof DONATION_REASONS)[number]) ? initialReason! : DEFAULT_REASON
  );
  const [frequency, setFrequency] = useState<Frequency>(initialFrequency === "monthly" ? "Monthly" : "One-time");

  return (
    <div className="flex flex-col gap-6 rounded-[14px] border border-line bg-white p-5 sm:p-7">
      <div>
        <p className="mb-2.5 text-sm font-semibold">Frequency</p>
        <div className="grid grid-cols-2 gap-1 rounded-lg bg-[#f2f0eb] p-1" role="tablist">
          {FREQUENCIES.map((f) => {
            const active = frequency === f;
            return (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFrequency(f)}
                className={`cursor-pointer rounded-md border-0 p-3 text-[15px] font-semibold text-ink ${
                  active ? "bg-white shadow-[0_1px_3px_rgba(0,0,0,0.12)]" : "bg-transparent"
                }`}
              >
                {f}
              </button>
            );
          })}
        </div>
      </div>

      {frequency === "One-time" ? (
        // PayPal donation form — carried over unchanged from the original site.
        <form action="https://www.paypal.com/cgi-bin/webscr" method="post" className="flex flex-col gap-6">
          <input name="business" type="hidden" value="info@iabat.org" />
          <input name="cmd" type="hidden" value="_donations" />
          <input name="currency_code" type="hidden" value="USD" />

          <label htmlFor="donation-reason" className="flex flex-col gap-2.5 text-sm font-semibold">
            Reason for Donation
            <select
              name="item_name"
              id="donation-reason"
              value={selectedReason}
              onChange={(e) => setSelectedReason(e.target.value)}
              className="field w-full font-normal"
            >
              {DONATION_REASONS.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </label>

          <div className="flex flex-col gap-3">
            <button
              type="submit"
              className="cursor-pointer rounded-lg border-0 bg-brand px-6 py-4 text-[17px] font-semibold text-white hover:bg-brand-dark"
            >
              Donate with PayPal
            </button>
            <p className="m-0 text-center text-[13px] text-muted">
              You&apos;ll enter your amount securely on PayPal · All donations are tax deductible
            </p>
          </div>

          {/* eslint-disable-next-line @next/next/no-img-element -- PayPal tracking pixel from the original form */}
          <img src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" alt="" width="1" height="1" className="hidden" />
        </form>
      ) : (
        <div className="flex flex-col gap-6">
          <p className="m-0 text-[15px] leading-[1.6] text-muted">
            Join our monthly giving program to provide sustained support for our community. Download and fill out our
            monthly donation form.
          </p>
          <a
            href="/monthlydonation.pdf"
            target="_blank"
            rel="noopener"
            className="rounded-lg bg-brand px-6 py-4 text-center text-[17px] font-semibold text-white hover:bg-brand-dark"
          >
            Download Monthly Form
          </a>
        </div>
      )}
    </div>
  );
}
