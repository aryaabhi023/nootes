import { useEffect, useState } from "react";
import { Outlet, useLocation,useNavigate } from "react-router-dom";
import { Button, Navbar, Loader } from "./Component";
import { useDispatch, useSelector } from "react-redux";
import auth from "./Appwrite/auth";
import { login as authlogin } from "./Store/authSlice";

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);


  const user = useSelector((state) => state.auth.user);
  const avtar = useSelector((state) => state.auth.avtar);


  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [location?.pathname]);


  useEffect(() => {
    if (!user) {
      auth.getCurrentUser().then((fetchedUser) => {
        if (fetchedUser) {
          auth.getAvatar(fetchedUser?.email).then((response) => {
            dispatch(authlogin({ user: fetchedUser, avtar: response }));
          });
        }
      });
    }
  }, [user, dispatch]);

  return (
    <div className="bg-[#e8e8e8] h-full">
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col h-screen">
          {!user ? (
            <div className="flex justify-center items-center pt-8">
              <Button name="Login/Signup" onClick={() => {navigate("/Login")}} />
            </div>
          ) : <Navbar avtar={avtar} />}
          <div className="h-full bg-[#e8e8e8]">
            <Outlet />
          </div>
        </div>
      )}
    </div>
  );
}
