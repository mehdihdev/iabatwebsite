"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[300px] overflow-hidden">
        <div className="relative h-full bg-gradient-to-r from-emerald-900/80 to-emerald-700/60">
          <div className="absolute inset-0 bg-emerald-900/40"></div>
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center">
            <div className="text-white text-center max-w-4xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Contact Us
              </h1>
              <p className="text-xl md:text-2xl">
                Get in touch with our community
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Google Maps */}
            <div>
              <h2 className="text-3xl font-bold text-emerald-800 mb-6">
                Visit Our Location
              </h2>
              <div className="rounded-lg overflow-hidden shadow-lg h-96">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3234.123456789!2d-78.9072!3d35.9132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89ace7a6b7d8d5ab%3A0x123456789abcdef!2s2200%20S%20Miami%20Blvd%2C%20Durham%2C%20NC%2027703!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="IABAT Location"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-emerald-800 mb-6">
                Get In Touch
              </h2>
              <div className="space-y-8">
                {/* Address */}
                <div className="flex items-start space-x-4">
                  <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-emerald-800 mb-2">Address</h3>
                    <p className="text-gray-700">
                      2200 S Miami Blvd<br />
                      Durham, NC 27703
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-4">
                  <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-emerald-800 mb-2">Phone</h3>
                    <a 
                      href="tel:+19192952182" 
                      className="text-gray-700 hover:text-emerald-600 transition-colors"
                    >
                      +1 (919) 295-2182
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="bg-emerald-100 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-emerald-800 mb-2">Email</h3>
                    <a 
                      href="mailto:info@iabat.org" 
                      className="text-gray-700 hover:text-emerald-600 transition-colors"
                    >
                      info@iabat.org
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
