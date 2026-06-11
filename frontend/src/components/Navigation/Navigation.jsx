import { GoHome } from "react-icons/go";
import { FiShoppingCart } from "react-icons/fi";
import { RiLoginCircleLine } from "react-icons/ri";
import { TbUserPlus } from "react-icons/tb";
import { RiHeart2Fill } from "react-icons/ri";
import { CiShoppingCart } from "react-icons/ci";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navigation.css";
import {useSelector,useDispatch} from 'react-redux'
import { useRegisterMutation } from "../../redux/api/usersApiSlice.js";
import { logout } from "../../redux/features/User/userSlice.js";

const Navigation = () => {
  const {userInfo}  = useSelector(state => state.user);
  const {registerApiCall}= useRegisterMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);

  const toggleDropDown = () => {
    setDropDownOpen(!dropDownOpen);
  };

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  const closeSideBar = () => {
    setShowSideBar(false);
  };

  // const logout


  return (
    <div
      style={{ zIndex: 999 }}
      id="navigation-container"
      className={`${showSideBar}?"hidden" : "flex" xl:flex lg:flex md:hidden sm: hidden 
      flex-col justify-between p-4 text-white bg-black w-[4%] hover: w-[15%] h-screen`}
    >
      <div className="flex flex-col justify-center space-y-4">
        <Link
          to="/"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <GoHome size={26} className=" mt-[3rem] flex-shrink-0" />
          <span className="nav-item-name mt-[3rem]">HOME</span>
        </Link>

        <Link
          to="/shopping"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <FiShoppingCart size={26} className=" mt-[3rem] flex-shrink-0" />
          <span className="nav-item-name mt-[3rem]">SHOP</span>
        </Link>
        <Link
          to="/favorites"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <RiHeart2Fill size={26} className=" mt-[3rem] flex-shrink-0" />
          <span className="nav-item-name mt-[3rem]">FAVORITES</span>
        </Link>
        <Link
          to="/cart"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <CiShoppingCart size={26} className=" mt-[3rem] flex-shrink-0" />
          <span className="nav-item-name mt-[3rem]">CART</span>
        </Link>
      </div>
      <div className="flex flex-col mb-[1rem] justify-center ">
        <Link
          to="/login"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <RiLoginCircleLine size={26} className=" mt-[3rem] flex-shrink-0" />
          <span className="nav-item-name mt-[3rem]">Login</span>
        </Link>
        <Link
          to="/register"
          className="flex items-center transition-transform transform hover:translate-x-2"
        >
          <TbUserPlus size={26} className=" mt-[3rem] flex-shrink-0" />
          <span className="nav-item-name mt-[3rem]">Register</span>
        </Link>
      </div>
    </div>
  );
};

export default Navigation;
