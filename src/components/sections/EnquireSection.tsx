import React from "react";
import { EnquiryForm } from "@/components/forms/EnquiryForm";
import { SITE_FACTS } from "@/content/content";

export function EnquireSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#0F0E0D] text-[#F1ECE2] border-b border-[#2B2723]">
      <div className="max-w-container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-baseline justify-between border-b border-[#2B2723] pb-3 mb-16">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#F2555F] font-semibold">
            &sect; 09 / Enquire
          </span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#A39B8F]">
            Direct Booking
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Contact info & Desk details */}
          <div className="lg:col-span-5 space-y-6 text-left">
            <h2 className="font-serif text-4xl sm:text-6xl font-normal leading-tight text-[#F1ECE2]">
              Request a <em className="italic text-[#F2555F]">booking.</em>
            </h2>
            <p className="text-xs sm:text-sm text-[#A39B8F] leading-relaxed font-mono">
              Share your event dates and preferred hall. Our booking management desk will review hall schedules and get in touch with you directly.
            </p>

            <div className="border border-[#2B2723] p-6 bg-[#171513] space-y-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#F2555F] font-semibold">
                Direct Contact Lines
              </p>
              <div className="space-y-1 font-mono text-xs text-[#DDD6C9]">
                <p>
                  PABX:{" "}
                  <a href={`tel:${SITE_FACTS.bookingPhones[0]}`} className="text-[#F1ECE2] hover:text-[#F2555F]">
                    {SITE_FACTS.bookingPhones[0]}
                  </a>
                </p>
                <p>
                  Hotline:{" "}
                  <a href={`tel:${SITE_FACTS.bookingPhones[1]}`} className="text-[#F1ECE2] hover:text-[#F2555F]">
                    {SITE_FACTS.bookingPhones[1]}
                  </a>
                </p>
                <p>
                  Email:{" "}
                  <a href={`mailto:${SITE_FACTS.bookingEmail}`} className="text-[#F1ECE2] hover:text-[#F2555F]">
                    {SITE_FACTS.bookingEmail}
                  </a>
                </p>
              </div>
              <p className="font-mono text-[10px] text-[#A39B8F] border-t border-[#2B2723] pt-3">
                Location: {SITE_FACTS.address}
              </p>
            </div>
          </div>

          {/* Right Column: Single Enquiry Form */}
          <div className="lg:col-span-7 bg-[#171513] p-6 sm:p-8 border border-[#2B2723]">
            <EnquiryForm />
          </div>
        </div>
      </div>
    </section>
  );
}

