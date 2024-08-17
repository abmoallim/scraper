"use client"
import { useState } from 'react';
import ScrapeTabs from './components/ScrapeTabs';
import { scrapeWebsite } from './utilities/scrape';

export default function Home() {
  const [url, setUrl] = useState('');
  const [scrapedData, setScrapedData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // New loading state

  const handleScrape = async () => {
    setError(null);
    setScrapedData(null);
    setLoading(true);  // Start loading
    try {
      const result = await scrapeWebsite(url);
      setScrapedData(result.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);  // Stop loading
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#f2f2f2]">
      <h1 className="text-4xl font-bold mb-4 text-gray-800">Scrape a Website</h1>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter a URL"
        className="border rounded p-2 w-full max-w-md mb-4 text-gray-800"
      />
      <button
        onClick={handleScrape}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Scrape
      </button>
      {loading && (
        <div className="mt-4 text-blue-600">
          <p>Scraping...</p>
        </div>
      )}
      {error && (
        <div className="mt-4 text-red-500">
          <p>Error: {error}</p>
        </div>
      )}
      {scrapedData && !loading && (
        <ScrapeTabs
          textData={scrapedData.text.replace(/\\n/g, '\n')}
          jsonData={scrapedData}
        />
      )}
    </div>
  );
}
