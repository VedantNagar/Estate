import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success === false) {
        setLoading(false);
        setError(response.data.message);
        return;
      }
      console.log(response.data);
      setLoading(false);
      setError(null);
      navigate("/signin");
    } catch (error) {
      setLoading(false);
      console.error("Error:", error.response?.data || error.message);
      setError(error.response?.data.message || "An error occurred");
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="text-3xl text-center pt-16 font-semibold">
        <h1>Sign Up</h1>
      </div>
      <form className="mt-10 max-w-lg w-full px-6" onSubmit={handleSubmit}>
        <input
          type="text"
          id="username"
          placeholder="Username"
          value={data.username}
          className="border mt-4 p-2 rounded-lg w-full"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="E-mail"
          value={data.email}
          id="email"
          className="border mt-4 p-2 rounded-lg w-full"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={data.password}
          id="password"
          className="border mt-4 p-2 rounded-lg w-full"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-blue-700 hover:bg-blue-500 text-white font-semibold py-2 px-4 mt-4 rounded-lg w-full"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
      </form>
      <div className="flex mt-5 text-left gap-1">
        <p>Have an account?</p>
        <Link to={"/signin"}>
          <span className="text-blue-700">Login</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default SignUp;
