import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { store } from "./Store/Store";
import App from "./App";
import {
  Auth,
  SecondAuth,
  LoginWrapper,
  Home,
  CreateRoom,
  Profile,
  Login,
  SignUp,
  Verify,
  VerifyRoom,
  Room,
  NotFound,
  NotVerified,
} from "./Component";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Home />} />
      <Route path="Home" element={<Home />} />
      <Route
        path="CreateRoom"
        element={
          <Auth>
            <SecondAuth>
              <CreateRoom />
            </SecondAuth>
          </Auth>
        }
      />
      <Route
        path="Profile"
        element={
          <Auth>
            <Profile />
          </Auth>
        }
      />
      <Route
        path="Login"
        element={
          <LoginWrapper>
            <Login />
          </LoginWrapper>
        }
      />
      <Route
        path="SignUp"
        element={
          <LoginWrapper>
            <SignUp />
          </LoginWrapper>
        }
      />
      <Route path="Verify" element={<Verify />} />
      <Route path="NotVerified" element={<NotVerified />} />
      <Route path="VerifyRoom/:id" element={<VerifyRoom />} />
      <Route path="Room/:id" element={<Room />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
