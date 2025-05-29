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
    <div className="card bg-base-300 w-85 shadow-sm mt-7">
      <figure>
        <img src={photoURL} alt="userPhoto" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        <div>
          {age && gender && <p> {age + " , " + gender}</p>}
          <p> {description}</p>
        </div>
        <div className="card-actions justify-center ">
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
          <button
            className="btn btn-primary"
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
