import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import BASE_URL from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setlastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [description, setDescription] = useState(user.description);
  const [photoURL, setPhotoURL] = useState(user.photoURL);
  const [error, setError] = useState("");
  const [showTost, setShowtoast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/update",
        { firstName, lastName, age, gender, description, photoURL },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowtoast(true);
      setInterval(() => {
        setShowtoast(false);
      }, 3000);
    } catch (err) {
      setError(err.response.data);
    }
  };
  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-start gap-6 p-4 bg-[#DCDCDD] text-[#46494C]">
        <div>
          <fieldset className="rounded-xl w-80 border border-[#C5C3C6] p-6 bg-white shadow-md">
            <legend className="text-2xl font-semibold mb-4 text-[#4C5C68]">
              Update Profile
            </legend>

            <label className="block mt-2 font-medium text-sm">
              First Name:
            </label>
            <input
              type="text"
              value={firstName}
              className="w-full px-3 py-2 mt-1 rounded-md border border-[#C5C3C6] focus:outline-none focus:ring-2 focus:ring-[#1985A1]"
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label className="block mt-3 font-medium text-sm">Last Name:</label>
            <input
              type="text"
              value={lastName}
              className="w-full px-3 py-2 mt-1 rounded-md border border-[#C5C3C6] focus:outline-none focus:ring-2 focus:ring-[#1985A1]"
              onChange={(e) => setlastName(e.target.value)}
            />

            <label className="block mt-3 font-medium text-sm">Gender:</label>
            <select
              className="w-full px-3 py-2 mt-1 rounded-md border border-[#C5C3C6] bg-white focus:outline-none focus:ring-2 focus:ring-[#1985A1]"
              required
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option disabled value="">
                Select gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Others</option>
            </select>

            <label className="block mt-3 font-medium text-sm">Age:</label>
            <input
              type="text"
              value={age}
              className="w-full px-3 py-2 mt-1 rounded-md border border-[#C5C3C6] focus:outline-none focus:ring-2 focus:ring-[#1985A1]"
              onChange={(e) => setAge(e.target.value)}
            />

            <label className="block mt-3 font-medium text-sm">About:</label>
            <input
              type="text"
              value={description}
              className="w-full px-3 py-2 mt-1 rounded-md border border-[#C5C3C6] focus:outline-none focus:ring-2 focus:ring-[#1985A1]"
              onChange={(e) => setDescription(e.target.value)}
            />

            <label className="block mt-3 font-medium text-sm">Photo URL:</label>
            <input
              type="text"
              value={photoURL}
              className="w-full px-3 py-2 mt-1 rounded-md border border-[#C5C3C6] focus:outline-none focus:ring-2 focus:ring-[#1985A1]"
              onChange={(e) => setPhotoURL(e.target.value)}
            />

            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}

            <button
              className="w-full mt-6 bg-[#1985A1] text-white py-2 rounded-md hover:bg-[#4C5C68] transition"
              onClick={saveProfile}
            >
              Update Profile
            </button>
          </fieldset>
        </div>

        <UserCard
          user={{ firstName, lastName, age, gender, description, photoURL }}
        />
      </div>

      {showTost && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success shadow-md">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
