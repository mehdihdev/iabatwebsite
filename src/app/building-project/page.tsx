"use client";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function BuildingProject() {
  return (
    <div className="min-h-screen bg-white">

      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        <div className="relative h-full bg-gradient-to-r from-emerald-900/80 to-emerald-700/60">
          <div className="absolute inset-0 bg-emerald-900/40"></div>
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center">
            <div className="text-white text-center max-w-4xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Building Our Islamic Center
              </h1>
              <p className="text-xl md:text-2xl">
                The first Shia Ithna Ashari Muslim center in North Carolina
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-emerald-800 mb-6">
              In the Name of Allah (SWT), the Most Beneficent, the Most Merciful
            </h2>
            <p className="text-xl text-emerald-700 mb-8">As-Salaam Alaikum Dear Followers of the Ahlul Bayt</p>
            <div className="text-lg text-gray-700 space-y-6 text-left">
              <p>
                With great pleasure, Islamic Ahlul Bayt Association of the Triangle (IABAT) would like to share a remarkable milestone on the path to building the first Shia Ithna Ashari Muslim center in North Carolina. By the Grace of Allah (SWT) and with the support of our ever-growing community, we have purchased 3.2 acres of land in the city of Durham.
              </p>
              <p>
                This is significant as we have reached a point where the size of our community and the lack of appropriate rental spaces necessitates our own space to accommodate our growing populous. During the recent first 10 days of Muharram, we reached a peak crowd of 350+. Our weekend school had almost 90 students in attendance last year.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Highlights */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-emerald-800 mb-12">
            Our Diverse Community Since 1999
          </h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h3 className="text-2xl font-semibold text-emerald-800 mb-4">Community Achievements</h3>
              <ul className="space-y-4 text-gray-700">
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-3 mt-1">•</span>
                  One of the most diverse mix of followers in the USA, with multiple countries and languages of origin
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-3 mt-1">•</span>
                  Resident Aalim (Sheikh Dr. Mehdi Hazari)
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-3 mt-1">•</span>
                  Regular prominent national and international speakers
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-3 mt-1">•</span>
                  Active participation in local charity work
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-3 mt-1">•</span>
                  Weekend school with full-fledged curriculum (90 students)
                </li>
                <li className="flex items-start">
                  <span className="text-emerald-600 mr-3 mt-1">•</span>
                  English as primary language to cultivate Muslim American identity
                </li>
              </ul>
            </div>
            <div className="rounded-lg overflow-hidden h-96">
              <Image
                src="/miamiblvd.jpg"
                alt="IABAT Community"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Project Video */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-emerald-800 mb-12">
            Project Vision
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video rounded-lg overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/2I471Ossr8k"
                title="IABAT Building Project"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
            <p className="text-center text-gray-600 mt-6">
              Watch our vision for the first Shia Ithna Ashari Muslim center in North Carolina
            </p>
          </div>
        </div>
      </section>

      {/* Major Accomplishments */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-emerald-800 mb-12">
            Major Accomplishments
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white border border-emerald-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-emerald-800 mb-3">Land Purchase & Approval</h3>
              <p className="text-gray-700">
                After 18 months of preliminary planning, applications, and regulatory procedures, we received approval from the City of Durham to start construction. We have spent $400,000 to purchase 3.2 acres of land, which has been fully paid.
              </p>
            </div>
            
            <div className="bg-white border border-emerald-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-emerald-800 mb-3">Professional Architecture</h3>
              <p className="text-gray-700">
                A formal contract has been signed with a professional and licensed architectural firm which is donating 33% of its income from this project towards IABAT's building fund.
              </p>
            </div>
            
            <div className="bg-white border border-emerald-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-emerald-800 mb-3">First Shia Muslim Cemetery in NC</h3>
              <p className="text-gray-700">
                We have received approval from the City of Durham for a 300-grave cemetery on the property, which sets us apart from many other religious centers across North America. This would be the first Shia Muslim cemetery in the state of North Carolina.
              </p>
            </div>
            
            <div className="bg-white border border-emerald-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-emerald-800 mb-3">Religious Authority & Tax Status</h3>
              <p className="text-gray-700">
                We have permission from Imam Mahdi Association of Marjaeya (I.M.A.M.), which is the liaison office of Grand Ayatullah Sistani, to accept Khums. We also have 501(c)(3) designation, making all donations tax deductible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fundraising Progress */}
      <section className="py-16 bg-emerald-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-emerald-800 mb-12">
            Project Budget & Progress
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-2xl font-bold text-emerald-800 mb-4">Total Project Budget</h3>
                <p className="text-4xl font-bold text-gray-800 mb-2">$1.2M</p>
                <p className="text-gray-600">Split into Phase I and Phase II</p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-8">
                <h3 className="text-2xl font-bold text-emerald-800 mb-4">Phase I Budget</h3>
                <p className="text-4xl font-bold text-gray-800 mb-2">$900,000</p>
                <p className="text-gray-600">Current phase requiring funding</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quranic Quote */}
      <section className="py-16 bg-emerald-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <blockquote className="text-2xl md:text-3xl font-serif italic mb-4 max-w-4xl mx-auto">
            "You will never attain piety till you spend from that which you love. And whatever you spend, truly God knows it."
          </blockquote>
          <p className="text-emerald-200">Al-Qur'an, 3:92</p>
        </div>
      </section>

      {/* Donation Methods */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-emerald-800 mb-12">
            How to Donate
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center bg-gray-50 rounded-lg p-8">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-emerald-800 mb-4">Online Donation</h3>
              <p className="text-gray-600 mb-6">Donate securely through our website or PayPal</p>
              <Link 
                href="/donate"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Donate Online
              </Link>
            </div>

            <div className="text-center bg-gray-50 rounded-lg p-8">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-emerald-800 mb-4">Mail Check</h3>
              <p className="text-gray-600 mb-6">Send checks made out to IABAT</p>
              <div className="text-sm text-gray-600">
                <p>PO Box 16206</p>
                <p>Durham, NC 27704</p>
                <p className="mt-2 font-semibold">Tax ID: 311-639875</p>
              </div>
            </div>

            <div className="text-center bg-gray-50 rounded-lg p-8">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-emerald-800 mb-4">GoFundMe</h3>
              <p className="text-gray-600 mb-6">Support us through our GoFundMe campaign</p>
              <a 
                href="https://www.gofundme.com/f/iabat"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Visit GoFundMe
              </a>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-lg text-gray-700 mb-4">
              All donations are tax deductible. Upon receipt of your donations, IABAT will issue a tax receipt for your records.
            </p>
            <p className="text-emerald-800 font-semibold">
              May Allah SWT guide us to follow the path of the Ahlul Bayt and reward you for your donations.
            </p>
            <p className="text-emerald-600 font-semibold mt-2">JazakAllah Khair</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}