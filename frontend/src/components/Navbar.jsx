import React from "react";
import "../app.css";
import { useNavigate } from "react-router-dom";
const Navbar = () => {

    const navigate = useNavigate()
  return (
    <>
      <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-white">
        {/* Left side logo + text */}
        <div className="flex items-center gap-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
            alt="Logo"
            className="h-8 w-8"
          />
          <span className="text-xl font-bold text-gray-800">auth</span>
        </div>

        {/* Right side Login button */}
        <button onClick={()=> navigate('/login')} className="flex items-center gap-2 border border-gray-400 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-100 transition cursor-pointer">
          <span className="font-bold" style={{letterSpacing : "1.5px"}}>Login</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-move-right-icon lucide-move-right"
          >
            <path d="M18 8L22 12L18 16" />
            <path d="M2 12H22" />
          </svg>
        </button>
      </nav>
    </>
  );
};

export default Navbar;
