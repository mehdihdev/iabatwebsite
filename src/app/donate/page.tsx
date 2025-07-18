"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Donate() {
  const [selectedReason, setSelectedReason] = useState("General Expenses");

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        <div className="relative h-full bg-gradient-to-r from-emerald-900/80 to-emerald-700/60">
          <div className="absolute inset-0 bg-emerald-900/40"></div>
          <div className="relative z-10 container mx-auto px-4 h-full flex items-center justify-center">
            <div className="text-white text-center max-w-4xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                Support Our Community
              </h1>
              <p className="text-xl md:text-2xl mb-8">
                Your generous donations help us serve the Muslim community in the Triangle area
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-emerald-800 mb-12">
            Support Our Community
          </h2>
          <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* One-time Donations */}
            <div className="text-center bg-white border border-emerald-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-emerald-800 mb-4">One-Time Donation</h3>
              <p className="text-gray-600 mb-6">
                Make a one-time donation to support our mosque operations, community programs, and Islamic education initiatives.
              </p>
              
              {/* PayPal Form */}
              <form action="https://www.paypal.com/cgi-bin/webscr" method="post" className="space-y-4">
                <input name="business" type="hidden" value="info@iabat.org" />
                <input name="cmd" type="hidden" value="_donations" />
                <input name="currency_code" type="hidden" value="USD" />
                
                <div className="text-left">
                  <label htmlFor="donation-reason" className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Donation
                  </label>
                  <select 
                    name="item_name" 
                    id="donation-reason"
                    value={selectedReason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-gray-900"
                  >
                    <option>Building Fund</option>
                    <option>Monthly Dues</option>
                    <option>Weekend School Payments</option>
                    <option>General Expenses</option>
                    <option>Funds for speaker</option>
                    <option>Sadqa</option>
                    <option>Zakat (regular)</option>
                    <option>Zakat Fitra Syed</option>
                    <option>Zakat Fitra Non-Syed</option>
                    <option>Khums sahm al-Imam</option>
                    <option>Khums sahm as-Sadat</option>
                    <option>Khums sahm al-Imam and as-Sadat</option>
                    <option>Ghadeer Carnival</option>
                  </select>
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-.635 4.055c-.118.75-.528 1.05-1.169 1.05z"/>
                    <path d="M23.576 7.936a5.909 5.909 0 0 1-.212.835c-1.183 6.04-5.05 8.1-9.946 8.1h-2.518c-.61 0-1.127.44-1.22 1.04l-.817 5.18a.75.75 0 0 1-.741.63H5.982a.472.472 0 0 1-.466-.545l.263-1.674c.13-.828.611-1.507 1.228-1.721h1.221c.524 0 .968-.382 1.05-.9l.635-4.055c.118-.75.528-1.05 1.169-1.05h2.19c4.298 0 7.664-1.747 8.647-6.797.03-.149.054-.294.077-.437.275-1.77-.002-3.04-1.012-4.287z"/>
                  </svg>
                  Donate with PayPal
                </button>
                
                <img src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" alt="" width="1" height="1" className="hidden" />
              </form>
            </div>

            {/* Monthly Donations */}
            <div className="text-center bg-white border border-emerald-200 rounded-lg p-8 hover:shadow-lg transition-shadow">
              <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-emerald-800 mb-4">Monthly Giving</h3>
              <p className="text-gray-600 mb-6">
                Join our monthly giving program to provide sustained support for our community. Download and fill out our monthly donation form.
              </p>
              <button
                onClick={() => window.open('/monthlydonation.pdf', '_blank')}
                className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors text-lg"
              >
                Download Monthly Form
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Donation Impact Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-emerald-800 mb-12">
            Your Impact
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-emerald-800 mb-4">Mosque Operations</h3>
              <p className="text-gray-600">Keep our mosque doors open for daily prayers and community gatherings</p>
            </div>

            <div className="text-center">
              <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-emerald-800 mb-4">Education Programs</h3>
              <p className="text-gray-600">Fund Islamic education for children and adults in our community</p>
            </div>

            <div className="text-center">
              <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-emerald-800 mb-4">Community Events</h3>
              <p className="text-gray-600">Support cultural celebrations and interfaith community building</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact for Questions */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-emerald-800 mb-6">
            Questions About Giving?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Our team is here to help you find the best way to support our community. 
            Contact us for more information about donation options.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:info@iabat.org" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Email Us
            </a>
            <a 
              href="tel:+19192952182" 
              className="border border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Call Us
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
 