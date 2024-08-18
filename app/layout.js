import { ClerkProvider } from '@clerk/nextjs';
import { Inter } from 'next/font/google';
import Header from './components/Header'; // Make sure the path to Header.js is correct
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Scraper',
  description: 'Scrape websites easily.',
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
