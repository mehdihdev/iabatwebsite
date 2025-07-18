"use client";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <>
      {/* Call to Action Banner */}
      <div className="bg-emerald-700 text-white py-2 text-center">
        <p className="text-sm">
          🏗️ Support our Building Project - Help us build the first Shia Ithna Ashari Muslim center in North Carolina{" "}
          <Link href="/building-project" className="underline ml-2 font-semibold">
            Learn More
          </Link>
        </p>
      </div>

      {/* Navigation */}
      <nav className="bg-white text-gray-800 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-4">
              <Image
                src="/iabat_dark.png"
                alt="IABAT Logo"
                width={120}
                height={40}
                className="h-10 w-auto"
              />
              <div className="hidden md:block text-sm">
                Islamic Ahlulhbayt Association of the Triangle
              </div>
            </Link>

            <div className="hidden lg:flex space-x-8">
              <Link href="/" className="hover:text-emerald-600 transition-colors py-2">
                Home
              </Link>
              <Link href="/about" className="hover:text-emerald-600 transition-colors py-2">
                About
              </Link>
              <Link href="/contact" className="hover:text-emerald-600 transition-colors py-2">
                Contact
              </Link>
              <Link href="/building-project" className="hover:text-emerald-600 transition-colors py-2">
                Building Project
              </Link>
              <Link href="/donate" className="hover:text-emerald-600 transition-colors py-2">
                Donate
              </Link>
            </div>

            <button className="lg:hidden">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}