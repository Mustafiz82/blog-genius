"use client";
import { signIn } from "next-auth/react";
import React from "react";
import { FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SocialLoginButton = ({ provider, callbackUrl, icon, label, iconClass }) => {
  return (
    <button
      onClick={() => signIn(provider, { callbackUrl })}
      type="button"
      className="w-full flex items-center justify-center px-4 py-2 border-gray-300 rounded-full shadow-sm border text-sm font-medium text-gray-700 group hover:bg-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500 hover:border-primary cursor-pointer duration-300 active:scale-100"
    >
      <span className={`w-5 h-5 mr-2 ${iconClass}`}>{icon}</span>
      {label}
    </button>
  );
};

const Page = () => {
  return (
    <div className="flex md:min-h-screen py-10 bg-white md:bg-transparent md:py-0 2xl:py-16 items-center justify-center">
      <div className="w-full bg-white box-content p-8 md:shadow-lg max-w-md space-y-8 rounded-sm">
        <div className="text-center">
          <h1 className="text-3xl font-bold font-inter tracking-tight">
            <span className="text-primary">Publish</span> Your <br />
            Blog with <span className="text-primary">AI</span>
          </h1>
        </div>

        {/* Social Login Buttons */}
        <div className="flex flex-wrap justify-center mt-14 gap-4">
          <SocialLoginButton
            provider="google"
            callbackUrl="/"
            icon={<FcGoogle className="w-full h-full group-hover:brightness-0 group-hover:invert duration-300" />}
            label="Log in with Google"
          />
          <SocialLoginButton
            provider="linkedin"
            callbackUrl="/"
            icon={<FaLinkedinIn className="w-5 h-5 text-[#0077B5] group-hover:!text-white duration-300" />}
            label="Log in with Linkedin"
          />
          <SocialLoginButton
            provider="github"
            callbackUrl="/"
            icon={<FaGithub className="w-5 h-5 text-[#000000] group-hover:!text-white duration-300" />}
            label="Log in with Github"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
