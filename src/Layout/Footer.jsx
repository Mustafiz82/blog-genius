"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaFacebookF, FaLinkedinIn, FaGlobe, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/signup";

  const subcategories = ["technology", "travel", "lifestyle", "Food", "business"];

  return (
    <footer hidden={isAuthPage} className="bg-white border-t px-5 border-purple-300 py-16 text-center">
      <div className="!container mx-auto">

        {/* Developer Info */}
        <div className="flex flex-col lg:flex-row justify-evenly gap-10">
          <div className="rounded-xl">
            <h2 className="text-xl text-start font-semibold mb-4 uppercase text-gray-800">Developer Info</h2>
            <div className="flex items-center space-x-4">
              <Image
                src="https://mustafizrahman.vercel.app/_next/image?url=%2Fassets%2Fprofile-picture.webp&w=1920&q=75"
                width={80}
                height={80}
                alt="Developer"
                className="w-20 h-20 rounded-full object-cover border-2 border-primary"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">MD. Mustafiz Rahman</h3>
                <div className="flex space-x-3 mt-2">
                  {/* Website */}
                  <a
                    href="https://mustafizrahman.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-white w-9 h-9 flex items-center justify-center rounded-full hover:scale-110 transition"
                    title="Website"
                  >
                    <FaGlobe />
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:mustafiz8260@gmail.com"
                    className="bg-primary text-white w-9 h-9 flex items-center justify-center rounded-full hover:scale-110 transition"
                    title="Email"
                  >
                    <FaEnvelope />
                  </a>

                  {/* LinkedIn */}
                  <a
                    href="https://www.linkedin.com/in/mdmustafiz8260/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-white w-9 h-9 flex items-center justify-center rounded-full hover:scale-110 transition"
                    title="LinkedIn"
                  >
                    <FaLinkedinIn />
                  </a>

                  {/* Facebook */}
                  <a
                    href="https://www.facebook.com/mdmustafiz.rahman.988"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-white w-9 h-9 flex items-center justify-center rounded-full hover:scale-110 transition"
                    title="Facebook"
                  >
                    <FaFacebookF />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Links */}
          <div>
            <h2 className="text-xl font-semibold text-start uppercase">Blog Genius AI</h2>
            <nav className="my-4">
              <ul className="flex flex-wrap max-w-xs gap-x-10 gap-y-2">
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
          </div>
        </div>

        {/* Footer Bottom */}
        <hr className="border-purple-300 mt-12" />
        <p className="text-sm text-gray-600 mt-4">Copyright Blog Genius Inc © 2025, All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
