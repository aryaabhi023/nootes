import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { login as authlogin } from "../Store/authSlice";
import auth from "../Appwrite/auth";

export default function Auth({ children }) {
  let loggedIn = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  
  if (!loggedIn) {
    auth.getCurrentUser().then((user) => {
      if (user) {
        auth.getAvatar(user.email).then((response) => {
          dispatch(authlogin({ user, avtar: response }));
          loggedIn = true;
        });
      }
    });
  }
  if (!loggedIn) {
    return <Navigate to="/Login" />;
  }
  return <div>{children}</div>;
}
