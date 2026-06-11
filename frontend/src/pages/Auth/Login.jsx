import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/usersApiSlice.js";
import { setCredentials } from "../../redux/features/User/userSlice.js";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const dispatch = useDispatch();
    const [login] = useLoginMutation();
    const navigate = useNavigate();


  const loginHandler = async (e)=>{
    e.preventDefault();
    try{
      const res = await login({email,password}).unwrap();
      dispatch(setCredentials(res));
       toast.success("Login Successful");
       navigate('/profile');

    }catch(err){
      toast.error(err?.data?.message || err.message)
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        className="border border-red-800 p-6 rounded-lg shadow-md flex flex-col space-y-4 w-[25rem]"
        onSubmit={loginHandler}
      >
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            className="border-b border-gray-400 p-2 outline-none "
            onChange={e=>setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className=" border-b border-gray-400 p-2 outline-none "
            onChange={e=>setPassword(e.target.value)}
            value={password}
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
