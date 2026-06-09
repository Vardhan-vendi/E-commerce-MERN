import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Navigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default App;
