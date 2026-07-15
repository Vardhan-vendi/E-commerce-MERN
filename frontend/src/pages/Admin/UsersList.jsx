import { useState } from "react";
import { useSelector } from "react-redux";
import Card from "../../components/Card.jsx";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserByIdMutation,
} from "../../redux/api/UsersApiSlice.js";
import EditableCards from "../../components/EditableCards.jsx";
import { toast } from "react-toastify";

const UsersList = () => {
  const { userInfo } = useSelector((state) => state.user);
  const { data: users = [], isLoading, error } = useGetUsersQuery();
  const [updateSelectedUser] = useUpdateUserByIdMutation();
  const [deleteSelectedUser] = useDeleteUserMutation();

  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditCard, setShowEditCard] = useState(false);

  const editHandler = (id) => {
    const user = users.find((u) => u._id === id);
    setSelectedUser(user);
    setShowEditCard(true);
  };

  const saveHandler = async (updated) => {
    try {
      await updateSelectedUser(updated).unwrap();
      toast.success("User updated");
      setShowEditCard(false);
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  const deleteHandler = async (id) => {
    try {
      await deleteSelectedUser(id).unwrap();
      toast.success("User deleted");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  if (!userInfo?.isAdmin) return null;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="glass-card w-full h-80 p-6 rounded-2xl animate-pulse flex flex-col items-center"
          >
            <div className="w-20 h-20 rounded-full bg-slate-800/80 mb-4" />
            <div className="w-36 h-4 bg-slate-800/80 rounded mb-2" />
            <div className="w-48 h-3 bg-slate-800/80 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-center text-red-400">
        <h2 className="text-2xl font-bold mb-2">Error Loading Users</h2>
        <p className="text-sm text-slate-500">Please try refreshing later.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col p-4 sm:p-6 md:p-8 space-y-6 overflow-y-auto [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:bg-transparent [scrollbar-width:none] [-ms-overflow-style:none]">
      {/* 3 cards per row on large screens, left‑to‑right flow */}
      <div className="flex flex-col items-center mb-4 flex-shrink-0">
        <h2 className="text-3xl font-bold font-[Poppins] text-purple-400 tracking-wider">
          USER LIST
        </h2>
        <div className="w-24 h-[2px] mt-2 bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,1)]"></div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {users
          .filter((u) => !u.isAdmin)
          .map((user) => (
            <Card
              key={user._id}
              user={user}
              onEdit={editHandler}
              onDelete={deleteHandler}
            />
          ))}
      </div>

      {showEditCard && selectedUser && (
        <EditableCards
          user={selectedUser}
          onClose={() => setShowEditCard(false)}
          onSave={saveHandler}
          onDelete={deleteHandler}
        />
      )}
    </div>
  );
};

export default UsersList;
