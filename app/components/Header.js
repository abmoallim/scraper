"use client";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isSignedIn } = useUser();

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md fixed top-4 left-1/2 transform -translate-x-1/2 w-full md:w-3/4 z-50 rounded-full border px-8">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" legacyBehavior>
            <a className="text-3xl font-bold text-[#ff8730] ml-2 hidden md:block">
              Scraper
            </a>
          </Link>
        </div>
        <div className="hidden md:flex-1 md:flex md:justify-center">
          <nav className="space-x-6 text-lg flex items-center">
            <Link href="/" legacyBehavior>
              <a className="text-gray-800 hover:text-[#ff8730]">Home</a>
            </Link>
            <Link href="/scrape" legacyBehavior>
              <a className="text-gray-800 hover:text-[#ff8730]">Scrape</a>
            </Link>
            <Link href="/pricing" legacyBehavior>
              <a className="text-gray-800 hover:text-[#ff8730]">Pricing</a>
            </Link>
          </nav>
        </div>
        <div className="hidden md:flex items-center">
          {isSignedIn ? (
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  userButtonTrigger:
                    "text-[#ff8730] border border-[#ff8730] rounded-full px-4 py-1 hover:bg-[#ff8730] hover:text-white",
                },
              }}
            />
          ) : (
            <Link href="https://knowing-troll-86.accounts.dev/sign-in" legacyBehavior>
              <a className="text-[#ff8730] border border-[#ff8730] rounded-full px-4 py-1 hover:bg-[#ff8730] hover:text-white">
                Login
              </a>
            </Link>
          )}
        </div>
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FontAwesomeIcon icon={faBars} className="text-[#ff8730]" />
        </button>
      </div>
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md">
          <div className="container mx-auto px-6 py-4">
            <nav className="space-y-4 text-lg">
              <Link href="/" legacyBehavior>
                <a
                  className="block text-gray-800 hover:text-[#ff8730]"
                  onClick={handleLinkClick}
                >
                  Home
                </a>
              </Link>
              <Link href="/scrape" legacyBehavior>
                <a
                  className="block text-gray-800 hover:text-[#ff8730]"
                  onClick={handleLinkClick}
                >
                  Scrape
                </a>
              </Link>
              <Link href="/pricing" legacyBehavior>
                <a
                  className="block text-gray-800 hover:text-[#ff8730]"
                  onClick={handleLinkClick}
                >
                  Pricing
                </a>
              </Link>
              {isSignedIn ? (
                <UserButton
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      userButtonTrigger:
                        "block text-[#ff8730] border border-[#ff8730] rounded-full px-4 py-1 hover:bg-[#ff8730] hover:text-white",
                    },
                  }}
                />
              ) : (
                <Link href="/sign-in" legacyBehavior>
                  <a
                    className="block text-[#ff8730] border border-[#ff8730] rounded-full px-4 py-1 hover:bg-[#ff8730] hover:text-white"
                    onClick={handleLinkClick}
                  >
                    Login
                  </a>
                </Link>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
