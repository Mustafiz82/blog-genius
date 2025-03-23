import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-purple-300 py-16 text-center">
      <div className="container mx-auto">
        <div className="flex flex-col items-center">
          {/* <Image
            src="/logo.png" // Replace with actual logo path
            alt="Zarrin Logo"
            width={50}
            height={50}
          /> */}
          <h2 className="text-xl font-semibold mt-2 uppercase ">blog genius ai</h2>
        </div>
        
        <nav className="my-4">
          <ul className="flex space-x-6 justify-center">
            <li><Link href="/">Home</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
          </ul>
        </nav>

        <div className="flex space-x-4 justify-center mb-4">
          <a href="#" className="bg-purple-500 text-white w-10 h-10 flex items-center justify-center rounded-full">FB</a>
          <a href="#" className="bg-purple-500 text-white w-10 h-10 flex items-center justify-center rounded-full">IG</a>
          <a href="#" className="bg-purple-500 text-white w-10 h-10 flex items-center justify-center rounded-full">LN</a>
          <a href="#" className="bg-purple-500 text-white w-10 h-10 flex items-center justify-center rounded-full">YT</a>
        </div>

        <hr className="border-purple-300" />
        <p className="text-sm text-gray-600 mt-4">Copyright Ideapeel Inc © 2023, All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
