"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const Nav = () => {
  const [token, setToken] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // State for mobile menu toggle

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    console.log("the token", storedToken);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <nav className="w-full px-4 md:px-0">
      <div className="max-w-[1120px] mx-auto my-6 py-2 flex justify-between items-center text-black">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-2xl font-bold">
            Smart Ai Agent Tracker
          </h1>
        </Link>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>

        {/* Desktop and Mobile Links */}
        <ul className={`
          ${isOpen ? "flex" : "hidden"} 
          flex-col md:flex md:flex-row absolute md:static top-20 left-0 w-full md:w-auto bg-white md:bg-transparent z-50 p-6 md:p-0 gap-6 items-center shadow-lg md:shadow-none
        `}>
          <Link href="/about" onClick={() => setIsOpen(false)}><li>About My Team</li></Link>
          <Link href="/features" onClick={() => setIsOpen(false)}>
            <li className="cursor-pointer">Features</li>
          </Link>

          <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center">
            {token ? (
              <button
                onClick={() => { handleLogout(); setIsOpen(false); }}
                className="cursor-pointer bg-linear-to-br from-zinc-700 to-gray-300 text-white rounded-sm py-1 px-3 font-bold"
              >
                Logout
              </button>
            ) : (
              <>
                <Link href="/login" onClick={() => setIsOpen(false)}>
                  <button className="cursor-pointer bg-linear-to-br from-zinc-700 to-gray-300 text-white rounded-sm py-1 px-3 font-bold md:-mr-4">
                    Login
                  </button>
                </Link>
                <Link href="/signup" onClick={() => setIsOpen(false)}>
                  <button className="cursor-pointer bg-linear-to-bl from-zinc-700 to-gray-300 text-white rounded-sm py-1 px-3 font-bold">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;