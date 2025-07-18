"use client";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function About() {
  const boardMembers = [
    {
      name: "Karrar Husain",
      title: "President",
      image: "/placeholder-avatar.jpg"
    },
    {
      name: "Ouj Zaman",
      title: "Director of Treasury",
      image: "/placeholder-avatar.jpg"
    },
    {
      name: "Sadaf Abbas",
      title: "Director of Education",
      image: "/placeholder-avatar.jpg"
    }
  ];

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
                About IABAT
              </h1>
              <p className="text-xl md:text-2xl">
                Serving the Triangle Muslim community since 1999
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main About Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-emerald-800 mb-8 text-center">
              Welcome to IABAT
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                <p>
                  The Islamic Ahlul Bayt Association of the Triangle (IABAT) is a nonprofit organization located and serving Muslims in the Triangle area of North Carolina. The organization has been in existence since 1999. IABAT is committed to the religious beliefs and practices of the Ja`fari Ithna `Ashari Shiah sect of Islam, and all of its activities and education are based on the teachings of this sect.
                </p>
                
                <p>
                  The intention of IABAT is to serve as an educational and social center for the purpose of conducting classes and events for Islamic teachings of its sect for its members and their children. IABAT conducts religious and social ceremonies such as marriages and funerals and is engaged in charitable works for needy families of the Ithna `Asahari Shi`ah Muslim community in and outside the United States of America and also for those who are needy in the local community at large.
                </p>
              </div>
              
              <div className="rounded-lg overflow-hidden h-80">
                <Image
                  src="/miamiblvd.jpg"
                  alt="IABAT Community Center"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="prose prose-lg max-w-none text-gray-700 space-y-6 mt-12">
              <p>
                IABAT at all times endeavors to establish positive and mutually beneficial relationships with local Islamic communities of other Islamic sects as well as with Christian, Jewish and other religious organizations in order to promote understanding. It can also participate in other relationships including memberships in national and international religious bodies representing the interests of IABAT.
              </p>
              
              <p>
                All classes, instruction and services are in English with Arabic used as appropriate for recitation of the Holy Quran and other religious texts. Separate gatherings with services in other languages such as Urdu or Farsi can be approved by the board as long as they do not supersede or conflict with the main English programs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Organization Structure */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-emerald-800 mb-8">
              Organization Structure
            </h2>
            <p className="text-lg text-gray-700 mb-12">
              IABAT consists of a general body of members governed by a Board of Directors and a Board of Trustees. Sub-committees are appointed to serve various functions as needed. Religious matters are overseen by a Ja`fari Ithna `Ashari Shi`ah religious scholar residing in the United States. Voting members are expected to pay annual dues.
            </p>
          </div>
        </div>
      </section>

      {/* Board of Directors */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-emerald-800 mb-12 text-center">
              Our Board of Directors
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {boardMembers.map((member, index) => (
                <div key={index} className="text-center bg-white rounded-lg shadow-md p-8">
                  <div className="w-32 h-32 bg-emerald-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <svg className="w-16 h-16 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-emerald-800 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-gray-600">{member.title}</p>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-6">
                And more dedicated board members serving our community
              </p>
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Meet More Board Members
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Resident Alim */}
      <section className="py-16 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-emerald-800 mb-12 text-center">
              Meet Our Resident Alim
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center">
                <div className="w-48 h-48 rounded-full mx-auto mb-6 overflow-hidden">
                  <Image
                    src="/mehdihazari.png"
                    alt="Sheikh Dr. Mehdi Hazari"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-emerald-800 mb-2">
                  Sheikh Dr. Mehdi Hazari
                </h3>
                <p className="text-gray-600">Resident Alim</p>
              </div>
              
              <div>
                <p className="text-lg text-gray-700 mb-6">
                  Shaykh Hazari was born in Toronto, Canada, but he spent most of his youth in the Sultanate of Oman where he received his primary education; his family moved to the United States in the 1980's.
                </p>
                
                <div className="space-y-4 text-gray-700">
                  <div className="flex items-start">
                    <span className="text-emerald-600 mr-3 mt-1">•</span>
                    <span>Completed high school and undergraduate studies at University of Florida/Florida Atlantic University</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-emerald-600 mr-3 mt-1">•</span>
                    <span>Received Master's degree from University of Toronto</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-emerald-600 mr-3 mt-1">•</span>
                    <span>Received doctorate from Johns Hopkins University</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-emerald-600 mr-3 mt-1">•</span>
                    <span>Physiologist/environmental scientist specializing in neuro- and cardiovascular physiology</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-emerald-600 mr-3 mt-1">•</span>
                    <span>Studies the effects of air pollution on human health</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-emerald-800 mb-8">
              Our Mission & Values
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-emerald-800 mb-4">Education</h3>
                <p className="text-gray-600">
                  Conducting classes and events for Islamic teachings for members and their children
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-emerald-800 mb-4">Charity</h3>
                <p className="text-gray-600">
                  Engaged in charitable works for needy families locally and internationally
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-md p-8">
                <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-emerald-800 mb-4">Unity</h3>
                <p className="text-gray-600">
                  Building positive relationships with other religious communities to promote understanding
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

