import { GoHome } from "react-icons/go";
import { FiShoppingCart } from "react-icons/fi";
import { RiLoginCircleLine } from "react-icons/ri";
import { TbUserPlus } from "react-icons/tb";
import { RiHeart2Fill } from "react-icons/ri";
import { CiShoppingCart } from "react-icons/ci";

import "./Navigation.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/features/User/userSlice.js";
import { useLogoutMutation } from "../../redux/api/usersApiSlice.js";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.user);
  const [LogoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);

  const toggleDropDown = () => {
    setDropDownOpen((prev) => !prev);
  };

  const toggleSideBar = () => {
    setShowSideBar((prev) => !prev);
  };

  const closeSideBar = () => {
    setShowSideBar(false);
  };

  const logoutHandler = async () => {
    try {
      await LogoutApiCall().unwrap();
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(logout());
      setDropDownOpen(false);
      closeSideBar();
      navigate("/login");
    }
  };

  return (
    <>
      {/* Mobile Hamburger Menu Toggle */}
      <button
        onClick={toggleSideBar}
        className="fixed top-4 left-4 z-50 p-2 bg-[#0e1320]/80 border border-slate-800 text-white rounded-lg md:hidden hover:bg-slate-800/80 backdrop-blur-md transition-colors focus:outline-none"
      >
        {showSideBar ? (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* Mobile Overlay */}
      {showSideBar && (
        <div
          onClick={closeSideBar}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
        />
      )}

      {/* Sidebar Navigation Container */}
      <div
        style={{ zIndex: 999 }}
        id="navigation-container"
        onMouseLeave={() => {
          setDropDownOpen(false);
        }}
        className={`fixed md:sticky top-0 left-0 h-screen bg-[#080b11] border-r border-slate-900/60 p-4 flex flex-col justify-between text-white transition-all duration-300 ease-in-out group z-50
          ${showSideBar ? "translate-x-0 w-64" : "-translate-x-full md:translate-x-0 w-20 md:hover:w-64"}
        `}
      >
        {/* Navigation Links */}
        <div className="flex flex-col space-y-2 mt-16 md:mt-8">
          <Link
            to="/"
            onClick={closeSideBar}
            className="flex items-center p-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-300 relative group/link"
          >
            <div className="absolute left-0 w-1 h-0 bg-violet-500 rounded-r-full group-hover/link:h-6 transition-all duration-300" />
            <GoHome size={22} className="flex-shrink-0" />
            <span
              className={`ml-4 text-sm font-semibold tracking-wide whitespace-nowrap transition-opacity duration-300
                ${showSideBar ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"}
              `}
            >
              HOME
            </span>
          </Link>

          <Link
            to="/shopping"
            onClick={closeSideBar}
            className="flex items-center p-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-300 relative group/link"
          >
            <div className="absolute left-0 w-1 h-0 bg-violet-500 rounded-r-full group-hover/link:h-6 transition-all duration-300" />
            <FiShoppingCart size={22} className="flex-shrink-0" />
            <span
              className={`ml-4 text-sm font-semibold tracking-wide whitespace-nowrap transition-opacity duration-300
                ${showSideBar ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"}
              `}
            >
              SHOP
            </span>
          </Link>

          <Link
            to="/favorites"
            onClick={closeSideBar}
            className="flex items-center p-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-300 relative group/link"
          >
            <div className="absolute left-0 w-1 h-0 bg-violet-500 rounded-r-full group-hover/link:h-6 transition-all duration-300" />
            <RiHeart2Fill size={22} className="flex-shrink-0" />
            <span
              className={`ml-4 text-sm font-semibold tracking-wide whitespace-nowrap transition-opacity duration-300
                ${showSideBar ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"}
              `}
            >
              FAVORITES
            </span>
          </Link>

          <Link
            to="/cart"
            onClick={closeSideBar}
            className="flex items-center p-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-300 relative group/link"
          >
            <div className="absolute left-0 w-1 h-0 bg-violet-500 rounded-r-full group-hover/link:h-6 transition-all duration-300" />
            <CiShoppingCart size={22} className="flex-shrink-0" />
            <span
              className={`ml-4 text-sm font-semibold tracking-wide whitespace-nowrap transition-opacity duration-300
                ${showSideBar ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"}
              `}
            >
              CART
            </span>
          </Link>
        </div>

        {/* User Session Footer Actions */}
        {userInfo ? (
          <div className="relative border-t border-slate-900/60 pt-4">
            <button
              onClick={toggleDropDown}
              className="flex items-center w-full p-2 rounded-xl hover:bg-white/5 transition-all duration-300 focus:outline-none"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-md shadow-violet-500/20 flex-shrink-0">
                {userInfo?.username?.charAt(0)?.toUpperCase()}
              </div>
              <div
                className={`ml-3 text-left transition-opacity duration-300 whitespace-nowrap overflow-hidden
                  ${showSideBar ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"}
                `}
              >
                <p className="text-sm font-semibold text-orange-400 capitalize">
                  {userInfo.username}
                </p>
                <p className="text-xs text-slate-500">View Account</p>
              </div>
              <svg
                className={`ml-auto w-4 h-4 text-slate-400 transition-all duration-300 flex-shrink-0
                  ${showSideBar ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"}
                  ${dropDownOpen ? "rotate-180" : ""}
                `}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Menu overlay */}
            {dropDownOpen && (
              <div className="absolute bottom-16 left-2 w-48 glass-dropdown rounded-xl p-2 shadow-2xl border border-white/10 z-55 animate-fadeIn">
                <Link
                  to="/profile"
                  onClick={() => {
                    setDropDownOpen(false);
                    closeSideBar();
                  }}
                  className="flex items-center px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                >
                  Profile
                </Link>
                {userInfo.isAdmin && (
                  <>
                    <Link
                      to="/admin/dashboard"
                      onClick={() => {
                        setDropDownOpen(false);
                        closeSideBar();
                      }}
                      className="flex items-center px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/admin/productList"
                      onClick={() => {
                        setDropDownOpen(false);
                        closeSideBar();
                      }}
                      className="flex items-center px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                    >
                      Products
                    </Link>
                    <Link
                      to="/admin/CategoryList"
                      onClick={() => {
                        setDropDownOpen(false);
                        closeSideBar();
                      }}
                      className="flex items-center px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                    >
                      Category
                    </Link>
                    <Link
                      to="/admin/OrdersList"
                      onClick={() => {
                        setDropDownOpen(false);
                        closeSideBar();
                      }}
                      className="flex items-center px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                    >
                      Orders
                    </Link>
                    <Link
                      to="/admin/usersList"
                      onClick={() => {
                        setDropDownOpen(false);
                        closeSideBar();
                      }}
                      className="flex items-center px-4 py-2.5 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all duration-200"
                    >
                      Users
                    </Link>
                  </>
                )}
                <button
                  onClick={logoutHandler}
                  className="flex items-center w-full text-left px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col space-y-2 border-t border-slate-900/60 pt-4">
            <Link
              to="/login"
              onClick={closeSideBar}
              className="flex items-center p-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-300 relative group/link"
            >
              <div className="absolute left-0 w-1 h-0 bg-violet-500 rounded-r-full group-hover/link:h-6 transition-all duration-300" />
              <RiLoginCircleLine size={22} className="flex-shrink-0" />
              <span
                className={`ml-4 text-sm font-semibold tracking-wide whitespace-nowrap transition-opacity duration-300
                  ${showSideBar ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"}
                `}
              >
                Login
              </span>
            </Link>

            <Link
              to="/register"
              onClick={closeSideBar}
              className="flex items-center p-3 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all duration-300 relative group/link"
            >
              <div className="absolute left-0 w-1 h-0 bg-violet-500 rounded-r-full group-hover/link:h-6 transition-all duration-300" />
              <TbUserPlus size={22} className="flex-shrink-0" />
              <span
                className={`ml-4 text-sm font-semibold tracking-wide whitespace-nowrap transition-opacity duration-300
                  ${showSideBar ? "opacity-100" : "opacity-0 md:group-hover:opacity-100"}
                `}
              >
                Register
              </span>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Navigation;
