import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/Layout/Nav";
import Footer from "@/Layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Blog Genius",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      > <Nav/>
         <div className="bg-[#F5F5F5]">
         {children}
         </div>
        <Footer/>
      </body>
    </html>
  );
}
