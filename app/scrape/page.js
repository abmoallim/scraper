"use client";

import { useState, useRef, useEffect } from "react";
import ScrapeTabs from "../components/ScrapeTabs";
import { scrapeWebsite } from "../utilities/scrape";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

export default function Scrape() {
  const [url, setUrl] = useState("");
  const [scrapedData, setScrapedData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isValidUrl, setIsValidUrl] = useState(true);
  const loadingRef = useRef(null);
 
  const { user } = useUser();
  
  const handleScrape = async (link) => {
    if (!isValidUrl) {
      setError("Invalid URL. Please enter a valid URL.");
      return;
    }

    setError(null);
    setLoading(true);
    try {
      const result = await scrapeWebsite(link || url, user?.id);
      setScrapedData((prevData) => [...prevData, result.data]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const validateUrl = (inputUrl) => {
    try {
      new URL(inputUrl);
      setIsValidUrl(true);
    } catch (_) {
      setIsValidUrl(false);
    }
  };

  useEffect(() => {
    if (loading && loadingRef.current) {
      loadingRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [loading]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#f2f2f2]">
      <SignedIn>
        <h1 className="text-4xl font-bold mb-4 text-gray-800 m-28">
          Scrape a Website
        </h1>
        <input
          type="text"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value);
            validateUrl(e.target.value);
          }}
          onKeyDown = {(e)=> {
          if (e.key === 'Enter' && isValidUrl) {
              handleScrape();
            }
          }}
          placeholder="Enter a URL"
          className={`border rounded p-2 w-full max-w-md mb-4 text-gray-800 ${
            !isValidUrl ? "border-red-500" : "border-gray-300"
          }`}
        />
        <button
          onClick={() => handleScrape()}
          className="bg-[#ff8730] text-white p-2 rounded"
          disabled={!isValidUrl}
        >
          Scrape
        </button>
        {error && (
          <div className="mt-4 text-red-500">
            <p>Error: {error}</p>
          </div>
        )}
        <div className="mt-8 w-full max-w-4xl h-[60vh] overflow-y-auto">
          {/* {loading && (
            <div className="mt-4 pl-96 text-[#ff8730] text-3xl" ref={loadingRef}>
              <p>Scraping...</p>
            </div>
          )} */}
          {scrapedData &&
            scrapedData.map((data, index) => (
              <ScrapeTabs
                key={index}
                textData={data.text.replace(/\\n/g, "\n")}
                jsonData={data}
                onScrapeMore={handleScrape}
              />
            ))}
          {loading && (
            <div className="mt-4 pl-96 text-[#ff8730] text-3xl" ref={loadingRef}>
              <p>Scraping...</p>
            </div>
          )}
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </div>
  );
}
