import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { logout as authLogout } from "../Store/authSlice";
import { useDispatch } from "react-redux";
import auth from "../Appwrite/auth";


const ProfileCard = ({user,avtar,count}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  
  const handleClick=()=>{
    auth.logout().then((res)=>{
      dispatch(authLogout());
      navigate("/login");
    }).catch((error)=>{
      setIsError(true);
      setError(error.message);
    });
  }
  return (
    <div className="max-w-sm rounded-xl bg-gray-800 p-4">
      <div className="flex items-start gap-4">

        <div className="h-28 w-28 rounded-full bg-gradient-to-br from-purple-700 to-purple-300 flex items-center justify-center">
          <img src={avtar} alt="avtar" className="shadow-xl rounded-full shadow-purple-700" />
        </div>

        <div className="flex flex-1 flex-col justify-between h-28">
          <div>
            <p className="text-lg font-medium text-white">{user?.name}</p>
            <p className="text-sm text-gray-400">{user?.email}</p>
          </div>

          <div className="rounded-lg bg-white p-2 text-sm text-black">
            <p className="flex flex-col items-center">
              Total Rooms
              <span className="font-bold text-purple-700">{count}</span>
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="mt-6 w-full rounded-lg border border-transparent bg-blue-400 px-4 py-2 text-base leading-6 transition hover:bg-purple-700 hover:text-white"
        onClick={handleClick}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileCard;
