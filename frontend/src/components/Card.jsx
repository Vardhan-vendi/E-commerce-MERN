import React from "react";

/**
 * Props
 *   user: { _id: string, username: string, email: string }
 *   onEdit:   (id: string) => void   // called when the “Edit” button is clicked
 *   onDelete: (id: string) => void   // called when the “Delete” button is clicked
 */
const Card = ({ user, onEdit, onDelete }) => {
  const { _id, username, email } = user;

  // First letter for the avatar bubble
  const initials = username?.[0]?.toUpperCase() ?? "U";

  return (
    <div
      className="group relative flex max-w-[32rem] w-full cursor-pointer rounded-2xl
                 bg-white/5 bg-clip-padding backdrop-filter backdrop-blur-xl
                 border border-white/10 p-6 space-x-5
                 shadow-[0_4px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.2)]
                 hover:-translate-y-2 hover:scale-105 transition-all duration-300"
    >
      {/* ── Avatar (gradient) ── */}
      <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full
                      bg-gradient-to-br from-blue-500 via-green-500 to-pink-500
                      text-white text-2xl font-medium shadow-lg">
        {initials}
      </div>

      {/* ── Details column ── */}
      <div className="flex flex-col flex-1 justify-between space-y-3">
        {/* Username title (orange) */}
        <h2 className="text-xl font-bold text-violet-800">{username}</h2>

        {/* Name line */}
        <p className="text-sm text-gray-300">
          <span className="font-bold text-2xl text-red-400 mr-1">Name:</span>
          <span className="text-[#00700F] text-semibold text-2xl">{username}</span>
        </p>

        {/* Email line */}
        <p className="text-sm text-gray-300">
          <span className="font-bold text-2xl text-red-400 mr-1">Email:</span>
          <span className="text-[#00700F] text-semibold text-2xl">{email}</span>
        </p>

        {/* ID line */}
        <p className="text-sm text-gray-300 break-all">
          <span className="font-bold text-2xl text-red-400 mr-1">ID:</span>
          <span className="font-mono text-[#00700F] font-semibold text-[20px]">{_id}</span>
        </p>

        {/* Action buttons */}
        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={() => onEdit?.(_id)}
            className="flex-1 rounded-lg bg-gradient-to-r from-violet-700 to-black
                       px-4 py-2 text-sm font-medium text-white
                       shadow-md hover:scale-105 transform transition-transform"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete?.(_id)}
            className="flex-1 rounded-lg bg-gradient-to-r from-black to-violet-700
                       px-4 py-2 text-sm font-medium text-white
                       shadow-md hover:scale-105 transform transition-transform"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;