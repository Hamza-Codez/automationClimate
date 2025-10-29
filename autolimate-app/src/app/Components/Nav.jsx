"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const Nav = () => {
  const [token, setToken] = useState(null);

  // Only access localStorage in the browser
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
    <nav className="w-[1120px] mx-auto my-6 py-2 flex justify-between items-center">
      <div className="flex justify-between w-full text-black">
        <Link href="/">
          <h1 className="text-2xl font-bold text-black">
            Smart Ai Agent Tracker
          </h1>
        </Link>

        <ul className="flex gap-6 items-center">
          <Link href="/about"><li>About My Team</li></Link>
          <Link href="/contact"><li>Join Us</li></Link>
          <Link href="/features">
            <li className="cursor-pointer">Features</li>
          </Link>

          {/* ✅ Conditionally show buttons based on token */}
          {token ? (
            <button
              onClick={handleLogout}
              className="cursor-pointer bg-linear-to-br from-zinc-700 to-gray-300 text-white rounded-sm py-1 px-3 font-bold"
            >
              Logout
            </button>
          ) : (
            <>
              <Link href="/login">
                <button className="cursor-pointer bg-linear-to-br from-zinc-700 to-gray-300 text-white rounded-sm py-1 px-3 font-bold -mr-4">
                  Login
                </button>
              </Link>
              <Link href="/signup">
                <button className="cursor-pointer bg-linear-to-bl from-zinc-700 to-gray-300 text-white rounded-sm py-1 px-3 font-bold">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
