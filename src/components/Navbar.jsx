import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import BASE_URL from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
    dispatch(removeUser());
    navigate("/login");
  };

  return (
    <div className="navbar bg-[#46494C] shadow-md px-4">
      <div className="flex-1">
        {user ? (
          <Link
            to="/"
            className="text-2xl font-bold text-white hover:text-[#1985A1] transition"
          >
            Matchably
          </Link>
        ) : (
          <div className="text-2xl font-bold text-white hover:text-[#1985A1] transition">
            Matchably
          </div>
        )}
      </div>

      {user && (
        <div className="flex gap-3 items-center">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar hover:bg-[#4C5C68]"
            >
              <div className="w-10 rounded-full border-2 border-[#1985A1]">
                <img alt="User avatar" src={user.photoURL} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] w-52 p-2 shadow-lg rounded-lg bg-white border border-[#C5C3C6]"
            >
              <li>
                <Link
                  to="/profile"
                  className="text-[#4C5C68] hover:text-[#1985A1]"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/connections"
                  className="text-[#4C5C68] hover:text-[#1985A1]"
                >
                  My Connections
                </Link>
              </li>
              <li>
                <Link
                  to="/requests"
                  className="text-[#4C5C68] hover:text-[#1985A1]"
                >
                  Connection Requests
                </Link>
              </li>
              <li>
                <a
                  onClick={handleLogout}
                  className="text-[#4C5C68] hover:text-red-600 transition"
                >
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
