import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import auth from "../Appwrite/auth";
import roomdb from "../Appwrite/RoomDb";
import Card from "../SharedComponent/Card";
import { login as authlogin } from "../Store/authSlice";

export default function Home() {
  const [avtar, setAvtar] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [RoomName, setRoomName] = useState("");
  const dispatch = useDispatch();
  const temp = useSelector((state) => state.auth.avtar);

  useEffect(() => {
    if (!temp) {
      auth.getCurrentUser().then((user) => {
        if (user) {
          auth.getAvatar(user?.email).then((response) => {
            dispatch(authlogin({ user, avtar: response }));
            setAvtar(response);
          });
        }
      });
    } else {
      setAvtar(temp);
    }
  }, [temp, dispatch]);

  useEffect(() => {
    roomdb.getRoomsByName(RoomName).then((response) => {
      setRooms(response.documents);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    roomdb.getRoomsByName(RoomName).then((response) => {
      setRooms(response.documents);
    });
  };

  return (
    <div className="bg-[#e8e8e8] h-full">
      <form className="flex justify-center items-center"
        onSubmit={handleSubmit}
      >
        <div className="w-full flex justify-center items-center">
          <input
            type="text"
            placeholder="Search Room"
            className="rounded p-2 w-1/4 my-5 rounded-lg focus:outline-none ring-1 ring-indigo-300"
            name="RoomName"
            value={RoomName}
            onChange={(e) => setRoomName(e.target.value)}
            autoComplete="off"
          />
          <button
            type="submit"
            className="bg-indigo-400 p-2 mx-4 my- rounded-lg text-white"
          >
            Search
          </button>
        </div>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-3 place-items-center w-5/6 m-auto">
        {rooms?.map((room) => (
          <Card props={room} key={room?.$id} />
        ))}
      </div>
    </div>
  );
}
