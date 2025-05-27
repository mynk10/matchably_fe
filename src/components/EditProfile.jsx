import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import BASE_URL from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setlastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
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
      <div className="flex justify-center ">
        <div>
          <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4 mx-5 mt-2">
            <legend className="fieldset-legend text-2xl">Update Profile</legend>

            <label className="label my-2">First Name: </label>
            <input
              type="string"
              value={firstName}
              className="input "
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label className="label my-2">Last Name: </label>
            <input
              type="string"
              value={lastName}
              className="input "
              onChange={(e) => setlastName(e.target.value)}
            />
            <label className="label my-2">Age: </label>
            <input
              type="string"
              value={age}
              className="input "
              onChange={(e) => setAge(e.target.value)}
            />
            <label className="label my-2">Gender: </label>
            <input
              type="string"
              value={gender}
              className="input "
              onChange={(e) => setGender(e.target.value)}
            />
            <label className="label my-2">About: </label>
            <input
              type="string"
              value={description}
              className="input "
              onChange={(e) => setDescription(e.target.value)}
            />
            <label className="label my-2">Photo URL: </label>
            <input
              type="string"
              value={photoURL}
              className="input "
              onChange={(e) => setPhotoURL(e.target.value)}
            />
            <p className="text-red-700 ">{error}</p>

            <button className="btn btn-neutral mt-8" onClick={saveProfile}>
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
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
