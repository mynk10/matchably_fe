import axios from "axios";
import React, { useEffect } from "react";
import BASE_URL from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  console.log(connections);
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
    <div className=" flex justify-center mt-10 ">
      <ul className="list bg-base-200 rounded-box shadow-md">
        <li className="p-4 pb-2 text-2xl opacity-60 tracking-wide">
          My connections
        </li>
        {connections.map((connection) => (
          <div key={connection._id}>
            <li className="list-row">
              <div>
                <img
                  className="size-10 rounded-box"
                  src={connection.photoURL}
                />
              </div>
              <div>
                <div>{connection.firstName + " " + connection.lastName}</div>
                <div className="text-xs uppercase font-semibold opacity-60">
                  {connection.age + ", " + connection.gender}
                </div>
              </div>
              <p className="list-col-wrap text-xs">{connection.description}</p>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Connections;
