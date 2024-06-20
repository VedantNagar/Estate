import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { signIn, signInFail, signInSuccess } from "../Redux/User/userSlice";

const signin = () => {
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState({
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
      dispatch(signIn());
      const response = await axios.post(
        "http://localhost:5000/api/auth/signin",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.success === false) {
        dispatch(signInFail(response.data.message));
        return;
      }
      console.log(response.data);
      dispatch(signInSuccess(response.data));
      navigate("/home");
    } catch (error) {
      dispatch(signInFail(error.message));
      console.error("Error:", error.response?.data || error.message);
    }
  };
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="text-3xl text-center pt-16 font-semibold">
        <h1>Sign In</h1>
      </div>
      <form className="mt-10 max-w-lg w-full px-6" onSubmit={handleSubmit}>
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
        <p>Don't have an account?</p>
        <Link to={"/signup"}>
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default signin;
