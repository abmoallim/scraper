import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function ScrapeTabs({ textData, jsonData }) {
  const [activeTab, setActiveTab] = useState('text');
  const [copied, setCopied] = useState(false);

  return (
    <div className="w-full max-w-4xl mt-4">
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
    </div>
  );
}
