// import { useDispatch } from "react-redux";
// import { useLoginMutation } from "../../redux/api/UsersApiSlice.js";
// import { setCredentials } from "../../redux/features/User/userSlice.js";
// import { useState } from "react";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//     const [email,setEmail]=useState("")
//     const [password,setPassword]=useState("")
//     const dispatch = useDispatch();
//     const [login] = useLoginMutation();
//     const navigate = useNavigate();


//   const loginHandler = async (e)=>{
//     e.preventDefault();
//     try{
//       const res = await login({email,password}).unwrap();
//       dispatch(setCredentials(res));
//        toast.success("Login Successful");
//        navigate('/profile');

//     }catch(err){
//       toast.error(err?.data?.message || err.message)
//     }
//   }

//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center">
//       <h2 className="mb-4 font-bold text-white-900 font-poppins text-5xl item ">Login</h2>
//       <form
//         className="border border-red-800 p-6 rounded-lg shadow-md flex flex-col space-y-4 w-[25rem]"
//         onSubmit={loginHandler}
//       >
//         <div className="flex flex-col">
//           <label htmlFor="email">Email</label>
//           <input
//             type="text"
//             id="email"
//             className="border-b border-gray-400 p-2 outline-none "
//             onChange={e=>setEmail(e.target.value)}
//             value={email}
//           />
//         </div>

//         <div className="flex flex-col">
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             className=" border-b border-gray-400 p-2 outline-none "
//             onChange={e=>setPassword(e.target.value)}
//             value={password}
//           />
//         </div>

//         <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;


import { useDispatch } from "react-redux";
import { useLoginMutation } from "../../redux/api/UsersApiSlice.js";
import { setCredentials } from "../../redux/features/User/userSlice.js";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate,Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [shake, setShake] = useState(false);

  const dispatch = useDispatch();
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      triggerShake();
      return;
    }
    
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res));
      toast.success("Login Successful");
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.message);
      triggerShake();
    }
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center bg-[#090d16] overflow-hidden font-sans">
      
      {/* Background Animated Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-violet-600/20 to-indigo-600/20 blur-[120px] animate-blob" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-fuchsia-600/15 to-pink-600/15 blur-[120px] animate-blob animation-delay-2000" />
        <div className="absolute top-[30%] left-[40%] w-[35%] h-[35%] rounded-full bg-gradient-to-br from-cyan-600/15 to-blue-600/15 blur-[100px] animate-blob animation-delay-4000" />
      </div>

      {/* Login Card Wrapper */}
      <div className="relative w-full max-w-[28rem] mx-4 sm:mx-0 z-10 p-[1px] rounded-2xl overflow-hidden bg-gradient-to-b from-white/10 to-transparent">
        <div className={`w-full h-full glass-card p-6 sm:p-10 rounded-[15px] flex flex-col ${shake ? 'animate-shake' : ''}`}>
          
          <div className="text-center mb-8">
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 tracking-tight mb-2">
              Welcome Back
            </h2>
            <p className="text-sm text-slate-400">
              Enter your credentials to access your account
            </p>
          </div>

          <form className="flex flex-col space-y-6" onSubmit={loginHandler}>
            
            {/* Email Input */}
            <div className="relative flex items-center group">
              <span className="absolute left-3 text-slate-400 group-focus-within:text-violet-400 transition-colors duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V8.25a3.75 3.75 0 00-3.75-3.75h-1.5a8.25 8.25 0 10-2.38 15.631" />
                </svg>
              </span>
              <input
                type="text"
                id="email"
                className="w-full bg-slate-950/40 border-b border-slate-700/60 py-3.5 pl-11 pr-4 text-white outline-none focus:border-violet-500 transition-all duration-300 text-sm rounded-t-lg"
                placeholder=" "
                onChange={e => setEmail(e.target.value)}
                value={email}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
              />
              <label
                htmlFor="email"
                className={`absolute left-11 transition-all duration-300 pointer-events-none text-slate-400 text-sm ${
                  emailFocused || email.length > 0
                    ? '-translate-y-7 scale-90 text-violet-400 font-medium'
                    : 'translate-y-0 text-slate-400'
                }`}
              >
                Email Address
              </label>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-violet-500 to-indigo-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-center" />
            </div>

            {/* Password Input */}
            <div className="relative flex items-center group">
              <span className="absolute left-3 text-slate-400 group-focus-within:text-violet-400 transition-colors duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="w-full bg-slate-950/40 border-b border-slate-700/60 py-3.5 pl-11 pr-12 text-white outline-none focus:border-violet-500 transition-all duration-300 text-sm rounded-t-lg"
                placeholder=" "
                onChange={e => setPassword(e.target.value)}
                value={password}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
              />
              <label
                htmlFor="password"
                className={`absolute left-11 transition-all duration-300 pointer-events-none text-slate-400 text-sm ${
                  passwordFocused || password.length > 0
                    ? '-translate-y-7 scale-90 text-violet-400 font-medium'
                    : 'translate-y-0 text-slate-400'
                }`}
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-slate-400 hover:text-white transition-colors duration-200 focus:outline-none"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-violet-500 to-indigo-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-center" />
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <label className="flex items-center space-x-2 text-slate-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-700 bg-slate-900/60 text-violet-600 focus:ring-violet-500/30 focus:ring-offset-0 transition duration-200"
                />
                <span>Remember me</span>
              </label>
              <a href="#forgot" className="text-violet-400 hover:text-violet-300 transition-colors duration-200 font-medium relative group">
                Forgot Password?
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-violet-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full py-3.5 px-4 bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98] focus:outline-none transition-all duration-300 overflow-hidden group disabled:opacity-70 disabled:hover:scale-100"
            >
              {/* Shine overlay effect on hover */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shine" />

              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Logging in...</span>
                </div>
              ) : (
                <span>Login</span>
              )}
            </button>
          </form>

          {/* Social Logins */}
          <div className="relative my-8 flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800"></div>
            </div>
            <span className="relative bg-[#0d111c] px-4 text-xs uppercase text-slate-500 tracking-wider">
              Or continue with
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              className="flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl border border-slate-800 bg-slate-950/20 hover:bg-slate-900/40 text-slate-300 hover:text-white transition-all duration-300"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-sm font-medium">Google</span>
            </button>
            <button
              type="button"
              className="flex items-center justify-center space-x-2 py-2.5 px-4 rounded-xl border border-slate-800 bg-slate-950/20 hover:bg-slate-900/40 text-slate-300 hover:text-white transition-all duration-300"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.646.64.699 1.026 1.592 1.026 2.683 0 3.842-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              <span className="text-sm font-medium">GitHub</span>
            </button>
          </div>

          {/* Footer Sign Up Redirect */}
          <p className="mt-8 text-center text-sm text-slate-400">
            Don't have an account?{' '}
            <Link to='/register' className="text-violet-400 hover:text-violet-300 font-semibold transition-colors duration-200 relative group">
              Register
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-violet-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Login;
