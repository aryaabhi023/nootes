import { useEffect,useState } from "react";
import DateObject from "react-date-object";
import { useParams, useNavigate } from "react-router-dom";
import Button2 from "../SharedComponent/Button2";
import roomdb from "../Appwrite/RoomDb";

export default function VerifyRoom() {
  const [room, setRoom] = useState(null);
  const [error, setError] = useState(null);
  const [key,setKey]=useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const roomInfo=JSON.parse(localStorage.getItem('RoomInfo'))?.split(';');

  let date=new DateObject();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(key==room?.RoomKey)
    {
        localStorage.setItem('RoomInfo', JSON.stringify(id+';'+date.format('DD-MM-YYYY')));
        navigate(`/Room/${id}`);;
    }
    else
        setError("Invalid Key");
  };

  useEffect(() => {
    roomdb.getRoom({ RoomId: id }).then((res) => {
      setRoom(res);
      if(roomInfo[0]==id && roomInfo[1]==date.format('DD-MM-YYYY')){
        navigate(`/Room/${id}`);
      }
    });
  }, []);

  return (
    <div className="h-screen bg-[#e8e8e8]">
      <div
        className="flex justify-center items-center pt-10"
      >
        <form className="flex flex-col items-center justify-center pt-4 border-2 border-gray-300 bg-gray-900 rounded-2xl md:w-1/3 w-5/6 p-4"
            onSubmit={handleSubmit}
        >
            {error && <div className="text-red-700 p-2">*{error}</div>}
          <div className="text-white py-2 text-3xl font-semibold">
            Verify Room
          </div>
          <div className="text-neutral-400 text-lg font-semibold">Room Title : <span>{room?.RoomName}</span></div>
          <input
            type="text"
            placeholder="Room Key"
            className="rounded p-2 w-2/3 my-2 rounded-lg focus:outline-none ring-1 ring-indigo-300"
            onChange={(e) => setKey(e.target.value)}
            autoComplete="off"
            required
          />
          <Button2 name="Verify" type="submit" />
        </form>
      </div>
    </div>
  );
}
