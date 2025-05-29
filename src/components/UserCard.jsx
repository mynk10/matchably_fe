import axios from "axios";
import React from "react";
import BASE_URL from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, age, gender, description, photoURL } = user;

  const handleSendRequest = async (status, userId) => {
    await axios.post(
      BASE_URL + "/request/" + status + "/" + userId,
      {},
      { withCredentials: true }
    );
    dispatch(removeFeed(userId));
  };

  return (
    <div className="card w-85 mt-7 bg-[#DCDCDD] text-[#46494C] shadow-lg rounded-xl overflow-hidden border border-[#C5C3C6]">
      <figure className="bg-[#C5C3C6]">
        <img
          src={photoURL}
          alt="userPhoto"
          className="object-cover w-full h-64"
        />
      </figure>

      <div className="card-body space-y-2">
        <h2 className="card-title text-xl font-semibold">
          {firstName + " " + lastName}
        </h2>

        <div className="text-sm text-[#4C5C68]">
          <p className="text-xs font-semibold uppercase">
            {gender + ", " + age}
          </p>
          <p className="mt-1">{description}</p>
        </div>

        <div className="card-actions justify-center mt-4 gap-2">
          <button
            className="px-4 py-2 bg-[#1985A1] text-white rounded-md hover:bg-[#1986a1d0] transition"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
          <button
            className="px-4 py-2 bg-[#4C5C68] text-white rounded-md hover:bg-[#4c5c68cb] transition"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
