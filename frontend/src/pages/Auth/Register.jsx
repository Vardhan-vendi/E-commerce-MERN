import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../../redux/api/UsersApiSlice.js";
import { setCredentials } from "../../redux/features/User/userSlice.js";
import { toast } from "react-toastify";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [usernameFocused, setUsernameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [shake, setShake] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [register, { isLoading }] = useRegisterMutation();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const registerHandler = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      triggerShake();
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      triggerShake();
      return;
    }

    try {
      const res = await register({ username, email, password }).unwrap();
      dispatch(setCredentials(res));
      toast.success("Account Created Successfully");
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.message || "Registration failed");
      triggerShake();
    }
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center bg-[#090d16] overflow-hidden font-sans py-12">
      
      {/* Background Animated Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-violet-600/20 to-indigo-600/20 blur-[120px] animate-blob" />
        <div className="absolute bottom-[-10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-fuchsia-600/15 to-pink-600/15 blur-[120px] animate-blob animation-delay-2000" />
        <div className="absolute top-[30%] left-[40%] w-[35%] h-[35%] rounded-full bg-gradient-to-br from-cyan-600/15 to-blue-600/15 blur-[100px] animate-blob animation-delay-4000" />
      </div>

      {/* Register Card Wrapper */}
      <div className="relative w-full max-w-[28rem] mx-4 sm:mx-0 z-10 p-[1px] rounded-2xl overflow-hidden bg-gradient-to-b from-white/10 to-transparent">
        <div className={`w-full h-full glass-card p-6 sm:p-10 rounded-[15px] flex flex-col ${shake ? 'animate-shake' : ''}`}>
          
          <div className="text-center mb-6">
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-400 tracking-tight mb-2">
              Create Account
            </h2>
            <p className="text-sm text-slate-400">
              Get started with your free account today
            </p>
          </div>

          <form className="flex flex-col space-y-6" onSubmit={registerHandler}>
            
            {/* Username Input */}
            <div className="relative flex items-center group">
              <span className="absolute left-3 text-slate-400 group-focus-within:text-violet-400 transition-colors duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </span>
              <input
                type="text"
                id="username"
                className="w-full bg-slate-950/40 border-b border-slate-700/60 py-3.5 pl-11 pr-4 text-white outline-none focus:border-violet-500 transition-all duration-300 text-sm rounded-t-lg"
                placeholder=" "
                onChange={e => setUsername(e.target.value)}
                value={username}
                onFocus={() => setUsernameFocused(true)}
                onBlur={() => setUsernameFocused(false)}
              />
              <label
                htmlFor="username"
                className={`absolute left-11 transition-all duration-300 pointer-events-none text-slate-400 text-sm ${
                  usernameFocused || username.length > 0
                    ? '-translate-y-7 scale-90 text-violet-400 font-medium'
                    : 'translate-y-0 text-slate-400'
                }`}
              >
                Username
              </label>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-violet-500 to-indigo-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-center" />
            </div>

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

            {/* Confirm Password Input */}
            <div className="relative flex items-center group">
              <span className="absolute left-3 text-slate-400 group-focus-within:text-violet-400 transition-colors duration-300">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </span>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="cfmpassword"
                className="w-full bg-slate-950/40 border-b border-slate-700/60 py-3.5 pl-11 pr-12 text-white outline-none focus:border-violet-500 transition-all duration-300 text-sm rounded-t-lg"
                placeholder=" "
                onChange={e => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                onFocus={() => setConfirmPasswordFocused(true)}
                onBlur={() => setConfirmPasswordFocused(false)}
              />
              <label
                htmlFor="cfmpassword"
                className={`absolute left-11 transition-all duration-300 pointer-events-none text-slate-400 text-sm ${
                  confirmPasswordFocused || confirmPassword.length > 0
                    ? '-translate-y-7 scale-90 text-violet-400 font-medium'
                    : 'translate-y-0 text-slate-400'
                }`}
              >
                Confirm Password
              </label>
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 text-slate-400 hover:text-white transition-colors duration-200 focus:outline-none"
              >
                {showConfirmPassword ? (
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full py-3.5 px-4 bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:scale-[1.02] active:scale-[0.98] focus:outline-none transition-all duration-300 overflow-hidden group disabled:opacity-70 disabled:hover:scale-100"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-shine" />

              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Creating Account...</span>
                </div>
              ) : (
                <span>Register</span>
              )}
            </button>
          </form>

          {/* Bottom Redirect Link */}
          <p className="mt-8 text-center text-sm text-slate-400">
            Already have an account?{" "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="text-violet-400 hover:text-violet-300 font-semibold transition-colors duration-200 relative group"
            >
              Login
              <span className="absolute bottom-0 left-0 w-full h-[1px] bg-violet-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default Register;