"use client"
// import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { BsEye } from "react-icons/bs";
import { FiEyeOff } from "react-icons/fi";

const Input = ({ label, type = "text", name, value, onChange, placeholder = "", id, required, checkout = false }) => {

  const [showPassword, setShowPassword] = useState(false);


  if (checkout) {
    return <div className="relative w-full">
      <input
        className="peer h-[50px] w-full  border border-black/30 bg-transparent px-6 py-2  focus:outline-none"
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}

      />
      <label
        className="absolute left-4 -top-[7px] text-xs duration-300 bg-white w-fit px-[2px]
        peer-placeholder-shown:left-6 
        peer-placeholder-shown:top-[50%] peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-black/60 
        peer-focus:left-4 
        peer-focus:px-[2px]
        peer-focus:-top-[7px]
        peer-focus:-translate-y-0 
        peer-focus:text-xs
         "
        
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  }
  else {
    if (type == "password") {
      return (
        <div className="relative">
          <div className="relative w-full">
            <input
              className="peer h-[50px] w-full rounded-full border bg-transparent px-6 py-2 focus:outline-none"
              type={showPassword ? "text" : "password"}
              name={name}
              id={id}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              required={required}
            />
            <label
              className="absolute left-4 -top-[7px] text-xs duration-300 bg-white w-fit px-[2px]
               peer-placeholder-shown:left-6 
               peer-placeholder-shown:top-[50%] peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-black/60 
               peer-focus:left-4 
               peer-focus:px-[2px]
               peer-focus:-top-[7px]
               peer-focus:-translate-y-0 
               peer-focus:text-xs "
              htmlFor={id}

            >
              password
            </label>
          </div>

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute text-primary right-3 top-1/2 -translate-y-1/2  hover:text-gray-700"
          >
            {showPassword ? (
              <FiEyeOff className="h-4 w-4" />
            ) : (
              <BsEye className="h-4 w-4" />
            )}
          </button>
        </div>
      )
    }
    else {
      return (
        <div className="relative w-full">
          <input
            className="peer  h-[50px] w-full rounded-full border bg-transparent px-6 py-2  focus:outline-none"
            type={type}
            name={name}
            id={id}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}

          />
          <label
            className="absolute left-4 -top-[7px] text-xs duration-300 bg-white w-fit px-[2px]
            peer-placeholder-shown:left-6 
            peer-placeholder-shown:top-[50%] peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-black/60 
            peer-focus:left-4 
            peer-focus:px-[2px]
            peer-focus:-top-[7px]
            peer-focus:-translate-y-0 
            peer-focus:text-xs 

            
            "
            
            htmlFor={id}
          >
            {label}
          </label>
        </div>
      );
    }
  }
};

export default Input;
