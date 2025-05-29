import axios from "axios";
import React, { useEffect } from "react";
import BASE_URL from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();
  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnection(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (!connections) return "loading...";
  if (connections == 0) return <h1>No connections found</h1>;

  return (
    <div className="flex justify-center mt-10">
      <ul className="bg-[#DCDCDD] rounded-xl shadow-md w-full max-w-2xl p-4">
        <li className="pb-4 text-2xl font-semibold tracking-wide text-[#4C5C68] border-b border-[#C5C3C6]">
          My Connections
        </li>

        {connections.map((connection) => (
          <li
            key={connection._id}
            className="flex gap-4 items-start py-4 border-b border-[#C5C3C6] last:border-none"
          >
            <img
              className="w-20 h-20 rounded-lg object-cover border border-[#C5C3C6]"
              src={connection.photoURL}
              alt="user"
            />

            <div className="flex flex-col">
              <div className="text-lg font-medium text-[#46494C]">
                {connection.firstName + " " + connection.lastName}
              </div>

              <div className="text-xs font-semibold uppercase text-[#4C5C68] mt-1">
                {connection.age && connection.gender
                  ? `${connection.age}, ${connection.gender}`
                  : null}
              </div>

              <p className="text-sm text-[#46494C] mt-1">
                {connection.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Connections;
