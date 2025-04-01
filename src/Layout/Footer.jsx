"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";

const Footer = () => {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  const subcategories = ["technology", "travel", "lifestyle", "culture", "business"];

  return (
    <footer hidden={isAuthPage} className="bg-white border-t border-purple-300 py-16 text-center">
      <div className="container mx-auto">
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-semibold mt-2 uppercase">Blog Genius AI</h2>
        </div>
        
        <nav className="my-4">
          <ul className="flex flex-wrap gap-x-10 gap-y-2 justify-center">
            <li><Link href="/blogs">Blog</Link></li>
            {subcategories.map((sub, idx) => (
              <li key={idx}>
                <Link href={`/blogs/category/${sub}`} className="capitalize">
                  {sub}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex space-x-4 justify-center mb-4">
          <a href="#" className="bg-primary text-white w-10 h-10 flex items-center justify-center rounded-full">
            <FaFacebookF />
          </a>
          <a href="#" className="bg-primary text-white w-10 h-10 flex items-center justify-center rounded-full">
            <FaInstagram />
          </a>
          <a href="#" className="bg-primary text-white w-10 h-10 flex items-center justify-center rounded-full">
            <FaLinkedinIn />
          </a>
          <a href="#" className="bg-primary text-white w-10 h-10 flex items-center justify-center rounded-full">
            <FaYoutube />
          </a>
        </div>

        <hr className="border-purple-300" />
        <p className="text-sm text-gray-600 mt-4">Copyright Ideapeel Inc © 2023, All Rights Reserved</p>
      </div>
    </footer> 
  );
};

export default Footer;