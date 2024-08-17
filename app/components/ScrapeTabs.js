import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function ScrapeTabs({ textData, jsonData, onScrapeMore }) {
  const [activeTab, setActiveTab] = useState('text');
  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-4xl mt-4 mb-8">
      <div className="flex justify-center border-b border-gray-300">
        <button
          className={`py-2 px-4 font-semibold focus:outline-none ${activeTab === 'text' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700'}`}
          onClick={() => setActiveTab('text')}
        >
          Text
        </button>
        <button
          className={`py-2 px-4 font-semibold focus:outline-none ${activeTab === 'json' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-700'}`}
          onClick={() => setActiveTab('json')}
        >
          JSON
        </button>
      </div>
      <div className="relative p-4 bg-white rounded-lg shadow mt-4">
        {activeTab === 'text' && (
          <div className="whitespace-pre-wrap text-gray-800">
            {textData || 'No text data available'}
          </div>
        )}
        {activeTab === 'json' && (
          <div>
            <CopyToClipboard text={JSON.stringify(jsonData, null, 2)} onCopy={() => setCopied(true)}>
              <button className="absolute right-2 top-2 bg-gray-700 text-white py-1 px-2 rounded text-sm">
                {copied ? 'Copied!' : 'Copy JSON'}
              </button>
            </CopyToClipboard>
            <pre className="whitespace-pre-wrap text-gray-800 mt-6">
              <code>{JSON.stringify(jsonData, null, 2)}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Suggestions Section */}
      <div className="mt-8">
        <h3 className="text-2xl font-semibold text-gray-800">Do you want to scrape more?</h3>
        <div className="flex overflow-x-auto mt-4 space-x-4">
          {jsonData.links.map((link, index) => (
            <div
              key={index}
              className="flex-none p-4 bg-white shadow rounded-lg cursor-pointer hover:bg-gray-100"
              style={{ minWidth: 'max-content' }} // Adjust width to fit content
              onClick={() => onScrapeMore(link)}
            >
              <p className="text-blue-600">{link}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
