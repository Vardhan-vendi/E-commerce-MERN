import { useState } from "react";
import { useSelector } from "react-redux";
import Card from "../../components/Card.jsx";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserByIdMutation,
} from "../../redux/api/usersApiSlice.js";
import EditableCards from "../../components/EditableCards.jsx";
import { toast } from "react-toastify";

const UsersList = () => {
  const { userInfo } = useSelector((state) => state.user);
  console.log(userInfo)
  const { data: users = [], isLoading, error } = useGetUsersQuery();
  const [updateSelectedUser] = useUpdateUserByIdMutation();
  const [deleteSelectedUser] = useDeleteUserMutation();

  const [ selectedUser, setSelectedUser ] = useState(null);
  const [showEditcard, setShowEditCard ] = useState(false);
  const editHandler = (id) => {
    const user = users.find((e) => id === e._id);
    setSelectedUser(user);
    setShowEditCard(true);
  };
  const saveHandler = async (updateData) => {
    try {
      await updateSelectedUser(updateData).unwrap();
      toast.success("user Updated...");
      setShowEditCard(false);
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  const deleteHandler = async (id) => {
    try {
      await deleteSelectedUser(id).unwrap();
      toast.success("user deleted...");
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
            className="glass-card w-full h-[20rem] p-6 rounded-2xl animate-pulse flex flex-col items-center"
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
        <p className="text-sm text-slate-500">
          Please try refreshing the page later.
        </p>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* 3 cards per row on large screens, left‑to‑right flow */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {users
        .filter((user) => user.isAdmin == false)
        .map((user) => (
          <Card key={user._id} user={user} onEdit={editHandler}onDelete={deleteHandler} />
        ))}
      </div>

      {showEditcard && selectedUser && (
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
