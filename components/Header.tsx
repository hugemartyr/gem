"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="flex items-center justify-between bg-white shadow px-6 py-4">
      {/* Logo + Institute Name */}
      <div className="flex items-center gap-3">
        <Image
          src="/logocolor.png"
          alt="Imperial Gemological Institute of India"
          width={80}
          height={80}
        />
        <div>
          <Link
            href="/admin"
            className="text-sm font-bold leading-tight text-black hover:text-blue-600 transition"
          >
            <Image
              src="/writeupblack.png"
              alt="Imperial Gemological Institute of India"
              width={200}
              height={200}
            />
          </Link>
        </div>
      </div>

      {/* Center Title */}
      <h2 className="flex items-center text-lg font-semibold text-black">
        TEST REPORT GENERATOR
      </h2>

      {/* Admin Dropdown */}
      <div className="relative">
        <button
          className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-900 rounded-full hover:bg-gray-200"
          onClick={() => setOpen(!open)}
        >
          <span>Admin</span>
          <span>⚫</span>
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-md">
            <button className="block w-full text-left px-4 py-2 text-gray-900 hover:bg-gray-100">
              Profile
            </button>
            <button className="block w-full text-left px-4 py-2 text-gray-900 hover:bg-gray-100">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
