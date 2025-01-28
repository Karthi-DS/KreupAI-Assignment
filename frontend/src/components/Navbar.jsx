import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">

        <Link to="/" className="text-lg font-semibold">
          School System
        </Link>
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="hover:bg-blue-700 px-3 py-2 rounded transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/subjects"
            className="hover:bg-blue-700 px-3 py-2 rounded transition duration-300"
          >
            Subjects
          </Link>

          <Link
            to="/grades"
            className="hover:bg-blue-700 px-3 py-2 rounded transition duration-300"
          >
            Grades
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;