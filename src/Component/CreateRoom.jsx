import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button2 from "../SharedComponent/Button2";
import roomdb from "../Appwrite/RoomDb";

export default function CreateRoom() {
  const {name}= useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const [room, setRoom] = useState({
    RoomName: "",
    RoomDescription: "",
    RoomKey: "",
  });
  const handleChange = (e) => {
    setRoom({ ...room, [e.target.name]: e.target.value });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(room);
    await roomdb.createRoom({...room,UserName:name});
    setRoom({
      RoomName: "",
      RoomDescription: "",
      RoomKey: "",
    });
    navigate("/Home");
  };
  return (
    <div>
      <div className="flex justify-center items-center pt-10">
        <form
          className="flex flex-col items-center justify-center p-4 border-2 border-gray-300 bg-[#212121] rounded-lg md:w-1/3 w-5/6"
          onSubmit={handleSubmit}
        >
          <div className="text-white py-2 text-3xl font-semibold">
            Create Room
          </div>
          <input
            type="text"
            placeholder="Room Name"
            className="rounded p-2 w-2/3 my-2 rounded-lg focus:outline-none ring-1 ring-indigo-300 focus:ring-green-600"
            name="RoomName"
            value={room.RoomName}
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <input
            type="text"
            placeholder="Room Description"
            className="rounded p-2 w-2/3 my-2 rounded-lg focus:outline-none ring-1 ring-indigo-300 focus:ring-green-600"
            name="RoomDescription"
            value={room.RoomDescription}
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <input
          type="text"
          placeholder="Room Key"
          className="rounded p-2 w-2/3 my-2 rounded-lg focus:outline-none ring-1 ring-indigo-300 focus:ring-green-600"
          name="RoomKey"
          value={room.RoomKey}
          onChange={handleChange}
          autoComplete="off"
          required
          />
         <Button2 name="Create Room" type="submit" />
        </form>
      </div>
    </div>
  );
}
