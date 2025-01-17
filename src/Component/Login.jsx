import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login as authLogin } from "../Store/authSlice";
import auth from "../Appwrite/auth";
import Button2 from "../SharedComponent/Button2";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [seen, setSeen] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const loggedIn = useSelector((state) => state.auth.status);
  if (loggedIn) {
    return <Navigate to="/Home" replace />;
  }

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await auth.login(user);
      const avatar = await auth.getAvatar(res.email); // Adjust parameter if needed
      dispatch(authLogin({ user: res, avatar }));
      navigate("/Home");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="h-screen">
      <div className="flex justify-center items-center pt-10">
        <form
          className="flex flex-col items-center justify-center pt-4 border-2 border-gray-300 bg-gray-900 rounded-3xl md:w-1/3 w-5/6"
          onSubmit={handleSubmit}
        >
          {error && <div className="text-red-700 p-2">*{error}</div>}
          <div className="text-white py-2 text-3xl font-semibold">Sign In</div>
          <input
            type="text"
            placeholder="Email"
            className="rounded p-2 w-2/3 my-2 rounded-lg focus:outline-none ring-1 ring-indigo-300"
            name="email"
            value={user.email}
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <div className="relative w-2/3">
            <input
              type={seen ? "text" : "password"}
              placeholder="Password"
              className="rounded p-2 w-full my-2 rounded-lg focus:outline-none ring-1 ring-indigo-300"
              name="password"
              value={user.password}
              onChange={handleChange}
              autoComplete="off"
              required
            />
            <img
              src="https://img.icons8.com/?size=100&id=32680&format=png&color=000000"
              alt="seen"
              className="absolute top-1/2 right-2 transform -translate-y-1/2 w-6 h-6 cursor-pointer"
              onClick={() => setSeen(!seen)}
            />
          </div>

          <Button2 name="Login" type="submit" />

          <div className="text-white py-3">
            <h2>
              Don't have an account?{" "}
              <Link
                className="text-lg font-semibold text-[#ed8f57]"
                to="/SignUp"
              >
                Sign Up
              </Link>
            </h2>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
