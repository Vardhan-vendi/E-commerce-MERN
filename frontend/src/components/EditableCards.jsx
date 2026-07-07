import { useState } from "react";

const EditableCards = ({ user, onClose, onSave, onDelete }) => {
  const [username, setUsername] = useState(user.username || "");
  const [email, setEmail] = useState(user.email || "");
  const [focused, setFocused] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !email.trim()) return;
    onSave({ id: user._id, username, email });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fadeIn">
      {/* Modal backdrop dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal box */}
      <div className="relative w-full max-w-md z-10 p-[1px] rounded-2xl overflow-hidden bg-gradient-to-b from-purple-900/60 to-purple-800/30 shadow-2xl animate-scaleUp">
        <div className="w-full h-full glass-card p-8 rounded-[15px] flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-purple-200 tracking-tight">
              Edit User Details
            </h3>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors duration-200 focus:outline-none p-1"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div className="relative flex flex-col group">
              <input
                id="username-edit"
                type="text"
                className="w-full bg-purple-900/40 border-b border-purple-700/60 py-3.5 px-3 text-white outline-none focus:border-purple-400 transition-all duration-300 text-sm rounded-t-lg"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder=" "
                onFocus={() => setFocused("username")}
                onBlur={() => setFocused(null)}
              />
              <label
                htmlFor="username-edit"
                className={`absolute left-3 transition-all duration-300 pointer-events-none text-slate-400 text-sm ${
                  focused === "username" || username
                    ? "-translate-y-7 scale-90 text-purple-400 font-medium"
                    : "translate-y-3.5"
                }`}
              >
                Username
              </label>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 to-indigo-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-center" />
            </div>

            {/* Email */}
            <div className="relative flex flex-col group">
              <input
                id="email-edit"
                type="email"
                className="w-full bg-purple-900/40 border-b border-purple-700/60 py-3.5 px-3 text-white outline-none focus:border-purple-400 transition-all duration-300 text-sm rounded-t-lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder=" "
                onFocus={() => setFocused("email")}
                onBlur={() => setFocused(null)}
              />
              <label
                htmlFor="email-edit"
                className={`absolute left-3 transition-all duration-300 pointer-events-none text-slate-400 text-sm ${
                  focused === "email" || email
                    ? "-translate-y-7 scale-90 text-purple-400 font-medium"
                    : "translate-y-3.5"
                }`}
              >
                Email Address
              </label>
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 to-indigo-500 scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-center" />
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-900/80">
              {onDelete && (
                <button
                  type="button"
                  onClick={() => {
                    onDelete(user._id);
                    onClose();
                  }}
                  className="px-4 py-2.5 text-sm font-semibold text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-xl transition-all duration-200"
                >
                  Delete User
                </button>
              )}
              <div className="flex items-center gap-3 ml-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 text-sm font-semibold border border-slate-800 text-slate-300 hover:bg-slate-900/40 hover:text-white rounded-xl transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 text-sm font-semibold bg-gradient-to-r from-purple-600 to-indigo-600 hover:shadow-lg hover:shadow-indigo-500/20 text-white rounded-xl active:scale-[0.98] transition-all duration-200"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditableCards;