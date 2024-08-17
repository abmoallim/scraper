"use client";
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col pt-40 items-center justify-center min-h-screen p-4 bg-gradient-to-b from-white to-[#ffefdc]">
      <h1 className="text-5xl font-bold mb-6 text-gray-800 text-center">
        The All-In-One <span className="text-[#ff8730]">Web Scraping</span> Tool.
      </h1>
      <p className="text-xl text-gray-600 text-center max-w-2xl">
        Effortlessly extract data from any website with our powerful and intuitive web scraping platform.
      </p>
      <button
        onClick={() => router.push('/scrape')}
        className="mt-8 bg-[#ff8730] text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:bg-[#e56f29] transition duration-200"
      >
        Try for free
      </button>

      {/* Inserted Image */}
      <div className="mt-16 w-full max-w-6xl px-4">
        <img src="/scraper.png" alt="Scraping tool demo" className="rounded-lg shadow-lg w-full" />
      </div>
    </div>
  );
}
