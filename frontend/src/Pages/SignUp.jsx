import React from "react";
import { Link } from "react-router-dom";
const SignUp = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="text-3xl text-center pt-16 font-semibold">
        <h1>Sign Up</h1>
      </div>
      <form className="mt-10 max-w-lg w-full px-6">
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="border mt-4 p-2 rounded-lg w-full"
        />
        <input
          type="text"
          placeholder="E-mail"
          id="email"
          className="border mt-4 p-2 rounded-lg w-full"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border mt-4 p-2 rounded-lg w-full"
        />
        <button
          type="submit"
          className="bg-blue-700 hover:bg-blue-500 text-white font-semibold py-2 px-4 mt-4 rounded-lg w-full"
        >
          SIGN UP
        </button>
      </form>
      <div className="flex mt-5 text-left gap-1">
        <p>Have an account?</p>
        <Link to={"/signin"}>
          <span className="text-blue-700">Login</span>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
