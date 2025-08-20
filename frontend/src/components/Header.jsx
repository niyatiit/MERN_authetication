import React from "react";

const Header = () => {
  return (
    <>
      <header className="flex flex-col items-center justify-center text-center py-20 bg-white">
      {/* Robot/Human image */}
      <img
        src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
        alt="Robot"
        className="h-24 w-24 mb-6"
      />

      {/* Main Text */}
      <h2 className="text-lg font-medium text-gray-700">
        Hey Developer 👋
      </h2>
      <h1 className="text-3xl font-bold text-gray-900 mt-2">
        Welcome to our app
      </h1>
      <p className="text-gray-500 mt-3 max-w-md">
        Let’s start with a quick product tour and we will have you up and running in no time!
      </p>

      {/* Get Started button */}
      <button className="mt-6 border border-gray-400 px-6 py-2 rounded-full text-gray-700 hover:bg-gray-100 transition cursor-pointer">
        Get Started
      </button>
    </header>
    </>
  );
};

export default Header;
