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
  if (!requests) return "loading...";
  if (requests == 0) return <h1>No request found</h1>;

  return (
    <div className=" flex justify-center mt-10 ">
      <ul className="list bg-base-200 rounded-box shadow-md">
        <li className="p-4 pb-2 text-2xl opacity-60 tracking-wide">Requests</li>
        {requests.map((request) => (
          <div key={request._id}>
            <li className="list-row">
              <div>
                <img
                  className="size-20 rounded-box"
                  src={request.fromUserId.photoURL}
                />
              </div>
              <div>
                <div>
                  {request.fromUserId.firstName +
                    " " +
                    request.fromUserId.lastName}
                </div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {request.fromUserId.age &&
                    request.fromUserId.gender &&
                    request.fromUserId.age + ", " + request.fromUserId.gender}
                </div>
                <p className="list-col-wrap text-xs">
                  {request.fromUserId.description}
                </p>
              </div>
              <div className="justify-center">
                <button
                  className="btn btn-secondary mx-1"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-primary mx-1"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
              </div>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Requests;
