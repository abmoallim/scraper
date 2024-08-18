import dotenv from 'dotenv';

dotenv.config();  // Load environment variables from .env.local or .env

export async function scrapeWebsite(url, userId) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;  // Load the API URL from environment variables
  const response = await fetch(`${apiUrl}/scrape`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url, userId }),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch scraped data');
  }

  return await response.json();
}
