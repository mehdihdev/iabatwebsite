"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prayerTimes, setPrayerTimes] = useState([
    { name: "Fajr", time: "Loading..." },
    { name: "Sunrise", time: "Loading..." },
    { name: "Dhuhr", time: "Loading..." },
    { name: "Asr", time: "Loading..." },
    { name: "Maghrib", time: "Loading..." },
    { name: "Isha", time: "Loading..." }
  ]);

  const heroSlides = [
    {
      image: "/miamiblvd.jpg",
      title: "Welcome to IABAT",
      subtitle: "Islamic Ahlulbayt Association of the Triangle",
    },
    {
      image: "/duakumayl.jpg",
      title: "Dua Kumayl",
      subtitle: "Every Thursday night @ IABAT Center",
    },
    {
      image: "/iabatback.jpeg",
      title: "IABAT Building Project",
      subtitle: "Help us build the first Shia Ithna Ashari Muslim center in North Carolina",
    },
  ];

  // Fetch prayer times using Jafari method
  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        // Durham, NC coordinates
        const latitude = 35.9940;
        const longitude = -78.8986;
        
        // Using aladhan.com API with Jafari method (method 0)
        const response = await fetch(
          `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=0&tune=0,0,0,0,0,0,0,0,0`
        );
        
        if (response.ok) {
          const data = await response.json();
          const timings = data.data.timings;
          
          // Convert 24-hour format to 12-hour format
          const convertTo12Hour = (time24: string) => {
            const [hours, minutes] = time24.split(':');
            const hour = parseInt(hours);
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const hour12 = hour % 12 || 12;
            return `${hour12}:${minutes} ${ampm}`;
          };
          
          setPrayerTimes([
            { name: "Fajr", time: convertTo12Hour(timings.Fajr) },
            { name: "Sunrise", time: convertTo12Hour(timings.Sunrise) },
            { name: "Dhuhr", time: convertTo12Hour(timings.Dhuhr) },
            { name: "Asr", time: convertTo12Hour(timings.Asr) },
            { name: "Maghrib", time: convertTo12Hour(timings.Maghrib) },
            { name: "Isha", time: convertTo12Hour(timings.Isha) }
          ]);
        }
      } catch (error) {
        console.error('Error fetching prayer times:', error);
        // Keep loading state if API fails
      }
    };

    fetchPrayerTimes();
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Carousel */}
      <section className="relative h-[600px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="relative h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/80 to-emerald-700/60"></div>
              <div className="absolute inset-0 bg-emerald-900/40"></div>
              <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
                <div className="text-white max-w-2xl">
                  <h1 className="text-5xl md:text-6xl font-bold mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8">
                    {slide.subtitle}
                  </p>
                  <div className="flex space-x-4">
                    <button className="bg-emerald-600 hover:bg-emerald-700 px-8 py-3 rounded-lg font-semibold transition-colors">
                      Visit Us
                    </button>
                    <button className="border border-white hover:bg-white hover:text-emerald-800 px-8 py-3 rounded-lg font-semibold transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Prayer Times Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-emerald-800 mb-12">
            Today's Prayer Times
          </h2>
          <div className="max-w-6xl mx-auto">
            {/* Prayer times grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {prayerTimes.map((prayer) => (
                <div
                  key={prayer.name}
                  className="bg-white text-gray-800 rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-all"
                >
                  <h3 className="text-lg font-semibold mb-2 text-emerald-800">
                    {prayer.name}
                  </h3>
                  <p className="text-xl font-bold text-gray-700">
                    {prayer.time}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-center text-gray-600 mt-6 text-sm">
              Prayer times are calculated for Durham using Jafari - Ithna Ashari method
            </p>
            
            {/* Additional prayer info cards */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
              <div className="bg-white rounded-lg shadow-sm p-4 text-center border border-emerald-100">
                <h4 className="font-semibold text-emerald-800 mb-1">City</h4>
                <p className="text-gray-600 text-sm">Durham, NC</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4 text-center border border-emerald-100">
                <h4 className="font-semibold text-emerald-800 mb-1">Qibla</h4>
                <p className="text-gray-600 text-sm">18.4° North of East</p>
              </div>
              <div className="bg-white rounded-lg shadow-sm p-4 text-center border border-emerald-100 col-span-2 md:col-span-1">
                <h4 className="font-semibold text-emerald-800 mb-1">Method</h4>
                <p className="text-gray-600 text-sm">Jafari - Ithna Ashari</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-emerald-800 mb-6">
                About IABAT
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                The Islamic Ahlul Bayt Association of the Triangle (IABAT) 
                is a nonprofit organization located and serving Muslims in the 
                Triangle area of North Carolina. The organization has been in existence 
                since 1999. IABAT is committed to the religious beliefs and practices of the 
                Ja`fari Ithna `Ashari Shiah sect of Islam, and all of its activities and education 
                are based on the teachings of this sect.
              </p>
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
                Learn More About Us
              </button>
            </div>
            <div className="rounded-lg overflow-hidden h-96">
              <Image
                src="/miamiblvd.jpg"
                alt="IABAT Mosque"
                width={600}
                height={400}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-emerald-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-emerald-800 mb-12">
            Our Services
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-emerald-800 mb-4">
                Dua Kumayl
              </h3>
              <p className="text-gray-600">
                Join us for the weekly Dua Kumayl prayer every Thursday night.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-emerald-800 mb-4">
                Islamic Education
              </h3>
              <p className="text-gray-600">
                Comprehensive programs for all ages including Quran studies and
                Islamic history.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-emerald-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-emerald-800 mb-4">
                Community Events
              </h3>
              <p className="text-gray-600">
                Regular social gatherings, interfaith dialogues, and community
                service projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}