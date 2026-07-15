import React from "react";

/**
 * Props
 *   user: { _id: string, username: string, email: string }
 *   onEdit:   (id: string) => void   // called when the “Edit” button is clicked
 *   onDelete: (id: string) => void   // called when the “Delete” button is clicked
 */
const Card = ({ user, onEdit, onDelete }) => {
  const { _id, username, email } = user;
  const initials = username?.[0]?.toUpperCase() ?? "U";

  return (
    <div
      className="group relative flex flex-col sm:flex-row max-w-[32rem] w-full cursor-pointer rounded-2xl
                 bg-purple-900/40 backdrop-blur-xl border border-purple-700/30 p-6 space-y-4 sm:space-y-0 sm:space-x-5
                 shadow-[0_4px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.2)]
                 hover:-translate-y-2 hover:scale-105 transition-all duration-300 items-center sm:items-start"
    >
      {/* Avatar – purple gradient */}
      <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full
                      bg-gradient-to-br from-purple-600 via-indigo-600 to-pink-600
                      text-white text-2xl font-medium shadow-lg">
        {initials}
      </div>

      {/* Details */}
      <div className="flex flex-col flex-1 justify-between space-y-3 text-center sm:text-left w-full">
        <h2 className="text-xl font-bold text-purple-300">{username}</h2>

        <p className="text-sm text-gray-300">
          <span className="font-medium text-purple-400 mr-1">Name:</span>
          <span className="text-purple-200">{username}</span>
        </p>

        <p className="text-sm text-gray-300">
          <span className="font-medium text-purple-400 mr-1">Email:</span>
          <span className="text-purple-200">{email}</span>
        </p>

        <p className="text-sm text-gray-300 break-all">
          <span className="font-medium text-purple-400 mr-1">ID:</span>
          <span className="font-mono text-purple-200">{_id}</span>
        </p>

        {/* Action buttons */}
        <div className="mt-4 flex gap-3">
          <button
            type="button"
            onClick={() => onEdit?.(_id)}
            className="flex-1 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600
                       px-4 py-2 text-sm font-medium text-white
                       shadow-md hover:scale-105 transform transition-transform"
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => onDelete?.(_id)}
            className="flex-1 rounded-lg bg-gradient-to-r from-red-600 to-pink-600
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