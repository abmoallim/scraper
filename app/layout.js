import { Inter } from "next/font/google";
import Header from "./components/Header";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Scraper - The All-In-One Web Scraping Tool",
  description: "Effortlessly extract data from any website with our powerful and intuitive web scraping platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <Header />
        <main>{children}</main>
      </body>
    </html>
  );
}
