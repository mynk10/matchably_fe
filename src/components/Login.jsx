import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("tushar@gmail.com");
  const [password, setPassword] = useState("Tushar@123");
  const [error, setError] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong ");
    }
  };

  return (
    <div>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto mt-20">
        <legend className="fieldset-legend text-2xl">Login</legend>

        <label className="label my-2">Email</label>
        <input
          type="email"
          value={emailId}
          className="input "
          placeholder="Email"
          onChange={(e) => setEmailId(e.target.value)}
        />

        <label className="label my-2">Password</label>
        <input
          type="password"
          value={password}
          className="input "
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="text-red-700 ">{error}</p>

        <button className="btn btn-neutral mt-8" onClick={handleLogin}>
          Login
        </button>
      </fieldset>
    </div>
  );
};

export default Login;
