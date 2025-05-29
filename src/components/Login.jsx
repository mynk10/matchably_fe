import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [islogin, setIsLogin] = useState(true);
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

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );
      console.log(res);
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong ");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#DCDCDD]">
      <fieldset className="w-full max-w-sm bg-white border border-[#C5C3C6] rounded-2xl shadow-lg p-6 space-y-4">
        <legend className="text-3xl font-semibold text-center text-[#4C5C68] mb-4">
          {islogin ? "Login" : "Signup"}
        </legend>

        {!islogin && (
          <>
            <label className="block text-sm font-medium text-[#46494C]">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              className="w-full px-4 py-2 border border-[#C5C3C6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1985A1] text-[#46494C]"
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label className="block text-sm font-medium text-[#46494C] mt-2">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              className="w-full px-4 py-2 border border-[#C5C3C6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1985A1] text-[#46494C]"
              onChange={(e) => setLastName(e.target.value)}
            />
          </>
        )}

        <label className="block text-sm font-medium text-[#46494C] mt-2">
          Email
        </label>
        <input
          type="email"
          value={emailId}
          placeholder="Email"
          className="w-full px-4 py-2 border border-[#C5C3C6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1985A1] placeholder-[#46494C] text-[#46494C]"
          onChange={(e) => setEmailId(e.target.value)}
        />

        <label className="block text-sm font-medium text-[#46494C] mt-2">
          Password
        </label>
        <input
          type="password"
          value={password}
          placeholder="Password"
          className="w-full px-4 py-2 border border-[#C5C3C6] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1985A1] placeholder-[#46494C] text-[#46494C]"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          onClick={() => setIsLogin((value) => !value)}
          className="text-sm text-[#1985A1] underline hover:text-[#4C5C68] transition"
        >
          {islogin ? "New user? Signup here" : "Already have an account?"}
        </button>

        <button
          className="w-full bg-[#1985A1] hover:bg-[#4C5C68] text-white font-semibold py-2 px-4 rounded-lg mt-4 transition"
          onClick={islogin ? handleLogin : handleSignup}
        >
          {islogin ? "Login" : "Sign Up"}
        </button>
      </fieldset>
    </div>
  );
};

export default Login;

// <div>
//   <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-auto mt-20">
//     <legend className="fieldset-legend text-2xl">
//       {islogin ? "Login" : "Signup"}
//     </legend>

//     {!islogin && (
//       <>
//         <label className="label my-2">First Name </label>
//         <input
//           type="name"
//           value={firstName}
//           className="input "
//           onChange={(e) => setFirstName(e.target.value)}
//         />

//         <label className="label my-2">Last Name</label>
//         <input
//           type="name"
//           value={lastName}
//           className="input "
//           onChange={(e) => setLastName(e.target.value)}
//         />
//       </>
//     )}

//     <label className="label my-2">Email</label>
//     <input
//       type="email"
//       value={emailId}
//       className="input "
//       placeholder="Email"
//       onChange={(e) => setEmailId(e.target.value)}
//     />

//     <label className="label my-2">Password</label>
//     <input
//       type="password"
//       value={password}
//       className="input "
//       placeholder="Password"
//       onChange={(e) => setPassword(e.target.value)}
//     />
//     <p className="text-red-700 ">{error}</p>
//     <button onClick={() => setIsLogin((value) => !value)}>
//       {islogin ? "New user? Signup here" : "Already have an acount? "}
//     </button>

//     <button
//       className="btn btn-neutral mt-8"
//       onClick={islogin ? handleLogin : handleSignup}
//     >
//       {islogin ? "login" : "sign up "}
//     </button>
//   </fieldset>
// </div>
