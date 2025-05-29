import axios from "axios";
import React, { useEffect } from "react";
import BASE_URL from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const getRequests = async () => {
    const res = await axios.get(BASE_URL + "/user/request/received", {
      withCredentials: true,
    });
    dispatch(addRequests(res.data.data));
  };

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);
  if (!requests)
    return (
      <div className="flex justify-center textarea-md font-semibold m-10">
        loading...
      </div>
    );
  if (requests == 0)
    return (
      <div className="flex justify-center textarea-md font-semibold m-10">
        No request found
      </div>
    );

  return (
    <div className="flex justify-center mt-10">
      <ul className="bg-[#DCDCDD] rounded-xl shadow-md w-full max-w-2xl p-4">
        <li className="pb-4 text-2xl font-semibold tracking-wide text-[#4C5C68] border-b border-[#C5C3C6]">
          Requests
        </li>

        {requests.map((request) => (
          <li
            key={request._id}
            className="flex flex-wrap md:flex-nowrap items-center gap-4 py-4 border-b border-[#C5C3C6] last:border-none"
          >
            <img
              className="w-20 h-20 rounded-lg object-cover border border-[#C5C3C6]"
              src={request.fromUserId.photoURL}
              alt="user"
            />

            <div className="flex flex-col flex-grow">
              <div className="text-lg font-medium text-[#46494C]">
                {request.fromUserId.firstName +
                  " " +
                  request.fromUserId.lastName}
              </div>
              <div className="text-xs font-semibold uppercase text-[#4C5C68] mt-1">
                {request.fromUserId.age && request.fromUserId.gender
                  ? `${request.fromUserId.age}, ${request.fromUserId.gender}`
                  : null}
              </div>
              <p className="text-sm text-[#46494C] mt-1">
                {request.fromUserId.description}
              </p>
            </div>

            <div className="flex gap-2 justify-center mt-2 md:mt-0">
              <button
                className="bg-[#1985A1] text-white px-4 py-1 rounded-lg hover:bg-[#15758e] transition"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                Accept
              </button>
              <button
                className="bg-[#4C5C68] text-white px-4 py-1 rounded-lg hover:bg-[#3b4b5a] transition"
                onClick={() => reviewRequest("rejected", request._id)}
              >
                Reject
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Requests;
