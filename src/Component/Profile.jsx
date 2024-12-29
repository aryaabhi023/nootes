import { useState, useEffect } from "react";
import roomdb from "../Appwrite/RoomDb";
import ProfileCard from "../SharedComponent/ProfileCard";
import Card from "../SharedComponent/Card";
import { useSelector } from "react-redux";

export default function Profile() {
  const [error, setError] = useState("");
  const [rooms, setRooms] = useState(null);
  const { user, avtar } = useSelector((state) => state.auth);

  useEffect(() => {
    roomdb.getRoomsByUserName({ UserName: user?.name }).then((data) => {
      if (data) {
        setRooms(data.documents);
      }
    });
  }, [user]);

  return (
    <div>
      <div className="pt-10">
        {!user ? (
          <div className="flex flex-col items-center justify-center pt-4 md:w-1/3 w-5/6">
            <div className="text-white p-2 text-2xl font-semibold">
              Please Login or Signup to see your profile
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center" >
            <ProfileCard user={user} avtar={avtar} count={rooms?.length} />
            <div className="grid grid-cols-1 md:grid-cols-3 place-items-center w-5/6 m-auto">
              {rooms?.map((room) => (
                <Card props={room} key={room?.$id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
