import { Outlet } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Navigation />
      <main className="bg-black relative w-screen h-screen mt-0">
        <div className="absolute left-0 top-0 h-full w-[2px] bg-purple-300 shadow-[0_0_25px_8px_rgba(168,85,247,0.8)]" />
        <Outlet />
      </main>
    </>
  );
};

export default App;
