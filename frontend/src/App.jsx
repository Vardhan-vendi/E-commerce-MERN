import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className="bg-gray-300 relative  w-screen h-screen mt-0">
        <Outlet />
      </main>
    </>
  );
};

export default App;
