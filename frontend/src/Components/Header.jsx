import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <header className="bg-gradient-to-r from-gray-300 to-gray-200 shadow-md">
        <div className="flex justify-between items-center p-3">
          <Link to="/">
            <h1 className="font-bold text-sm sm:text-xl flex pl-4">
              <span className="text-slate-500">Royal</span>
              <span className="text-slate-800">Estate</span>
            </h1>
          </Link>
          <form className="bg-gray-100 p-3 rounded-lg flex">
            <input
              type="text"
              name="search-bar"
              id="search-bar"
              placeholder="Search.."
              className="bg-transparent focus:outline-none w-24 sm:w-64 md:w-96 lg:w-96 xl:w-96"
            />
            <FaSearch className="text-slate-700 flex m-1" />
          </form>
          <ul className="flex gap-4">
            <Link to="/">
              <li className="hover:underline">Home</li>
            </Link>
            <Link to="/about">
              <li className="hidden sm:inline hover:underline ">About</li>
            </Link>
            <Link to="/signin">
              <li className="hover:underline">Sign In</li>
            </Link>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
