import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import Register from "./pages/Auth/Register.jsx";
import Login from "./pages/Auth/Login.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import Profile from "./pages/User/Profile.jsx";
import Users from "./pages/Admin/UsersList.jsx";
import AdminRoutes from "./components/AdminRoutes.jsx";
import UsersList from "./pages/Admin/UsersList.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="profile" element={<Profile />} />
        <Route path="usersList" element={<Users />} />
      </Route>

      {/* admin routes */}
      <Route path="admin" element ={ <AdminRoutes/>}>
          <Route path="usersList" element={<UsersList/>}/>
      </Route>
    </Route>,
  ),
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />,
  </Provider>,
);
