import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import auth from "../Appwrite/auth";
import { login as authlogin } from "../Store/authSlice";

const Navbar = () => {
  const avtar = useSelector((state) => state.auth.avtar);

  return (
    <div className="flex items-center justify-center w-64 rounded-lg bg-gray-100 fixed bottom-4 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
      <div className="flex bg-zinc-600 w-64 h-10 items-center justify-around rounded-lg shadow-lg">
        {/* Home Link */}
        <Link
          className="w-10 h-10 rounded-full bg-transparent flex items-center justify-center text-white hover:-translate-y-1 transform transition duration-300 cursor-pointer"
          to="/Home"
        >
          <svg
            className="text-white w-6 h-6"
            stroke="currentColor"
            fill="currentColor"
            strokeWidth={0}
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M946.5 505L560.1 118.8l-25.9-25.9a31.5 31.5 0 0 0-44.4 0L77.5 505a63.9 63.9 0 0 0-18.8 46c.4 35.2 29.7 63.3 64.9 63.3h42.5V940h691.8V614.3h43.4c17.1 0 33.2-6.7 45.3-18.8a63.6 63.6 0 0 0 18.7-45.3c0-17-6.7-33.1-18.8-45.2zM568 868H456V664h112v204zm217.9-325.7V868H632V640c0-22.1-17.9-40-40-40H432c-22.1 0-40 17.9-40 40v228H238.1V542.3h-96l370-369.7 23.1 23.1L882 542.3h-96.1z" />
          </svg>
        </Link>

        {/* Profile Link */}
        <Link
          className="w-10 h-10 rounded-full bg-transparent flex items-center justify-center text-white hover:-translate-y-1 transform transition duration-300"
          to="/Profile"
        >
          {avtar ? (
            <img src={avtar} alt="Avatar" className="w-6 h-6 rounded-full" />
          ) : (
            <svg
              className="text-white w-6 h-6"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth={0}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2.5a5.5 5.5 0 0 1 3.096 10.047 9.005 9.005 0 0 1 5.9 8.181.75.75 0 1 1-1.499.044 7.5 7.5 0 0 0-14.993 0 .75.75 0 0 1-1.5-.045 9.005 9.005 0 0 1 5.9-8.18A5.5 5.5 0 0 1 12 2.5ZM8 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z" />
            </svg>
          )}
        </Link>

        {/* Create Room Link */}
        <Link
          className="w-10 h-10 rounded-full bg-transparent flex items-center justify-center text-white hover:-translate-y-1 transform transition duration-300"
          to={"/CreateRoom"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
