import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / App Name */}
          <div className="text-xl font-bold">
            Smart Healthcare
          </div>

          {/* Links */}
          <div className="flex space-x-6">
            <Link
              to="/dashboard"
              className="hover:bg-blue-700 px-3 py-2 rounded-md"
            >
              Dashboard
            </Link>
            <Link
              to="/doctors"
              className="hover:bg-blue-700 px-3 py-2 rounded-md"
            >
              Doctors
            </Link>

            <Link
              to="/assistant"
              className="hover:bg-blue-700 px-3 py-2 rounded-md"
            >
              ASK AI
            </Link>
            
            <Link
              to="/profile"
              className="hover:bg-blue-700 px-3 py-2 rounded-md"
            >
              Profile
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;




