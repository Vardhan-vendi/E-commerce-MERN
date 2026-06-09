import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import Register from "./pages/Auth/Register.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path="/" element={<App />} >
      <Route path="register" element  = {<Register/>} />
  </Route>
  ),
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />,
  </Provider>,
);
