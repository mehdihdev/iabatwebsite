import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-emerald-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Visit Us</h3>
            <div className="rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3234.123456789!2d-78.9072!3d35.9132!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89ace7a6b7d8d5ab%3A0x123456789abcdef!2s2200%20S%20Miami%20Blvd%2C%20Durham%2C%20NC%2027703!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                width="100%"
                height="150"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="IABAT Location"
              />
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="mb-2">2200 S Miami Blvd</p>
            <p className="mb-2">Durham, NC 27703</p>
            <p className="mb-2">Phone: +1 (919) 295-2182</p>
            <p>Email: info@iabat.org</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/" className="block hover:text-emerald-200 transition-colors">
                Home
              </Link>
              <a href="#" className="block hover:text-emerald-200 transition-colors">
                Prayer Times
              </a>
              <a href="#" className="block hover:text-emerald-200 transition-colors">
                Events Calendar
              </a>
              <Link href="/donate" className="block hover:text-emerald-200 transition-colors">
                Donation
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex flex-col space-y-2">
            <a href="https://www.youtube.com/c/IABAT" className="hover:text-emerald-200 transition-colors">
                YouTube
              </a>
              <a href="https://www.facebook.com/iabat.org/" className="hover:text-emerald-200 transition-colors">
                Facebook
              </a>
              <a href="https://x.com/iabat_org" className="hover:text-emerald-200 transition-colors">
                Twitter
              </a>
              <a href="https://www.instagram.com/iabatweekendschool/" className="hover:text-emerald-200 transition-colors">
                Instagram
              </a>
              <a href="https://chat.whatsapp.com/A4aZZbWakqf68U4xTB1lDW" className="hover:text-emerald-200 transition-colors">
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-emerald-700 mt-8 pt-8 text-center">
          <p>
            &copy; 2025 Islamic Ahlulhbayt Association of the Triangle. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
