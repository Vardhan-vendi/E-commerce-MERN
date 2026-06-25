import { useState } from "react";
import { toast } from "react-toastify";
import CategoryForm from "../../components/CategoryForm.jsx";

import {
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../redux/api/CategoryApiSlice";

const CategoryList = () => {
  const [name, setName] = useState("");

  // Edit states
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  const {
    data: categories,
    isLoading,
    error,
    refetch,
  } = useGetAllCategoriesQuery();

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Category is required");
      return;
    }

    try {
      await createCategory({ name }).unwrap();

      toast.success("Category created successfully");
      setName("");

      await refetch();
    } catch (error) {
      console.log(error);
      toast.error("Category not created");
    }
  };

  const handleUpdateCategory = async (categoryId) => {
    if (!editName.trim()) {
      toast.error("Category name cannot be empty");
      return;
    }

    try {
      await updateCategory({
        category_id: categoryId,
        name: editName,
      }).unwrap();

      toast.success("Category updated successfully");

      setEditingId(null);
      setEditName("");

      await refetch();
    } catch (error) {
      console.log(error);
      toast.error("Failed to update category");
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategory({
        category_id: categoryId,
      }).unwrap();

      toast.success("Category deleted successfully");

      await refetch();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete category");
    }
  };

  return (
    <div className="p-4">
      {/* Heading */}
      <div className="flex flex-col items-center mb-4">
        <h2 className="text-3xl font-bold font-[Poppins] text-purple-400 tracking-wider">
          CATEGORY LIST
        </h2>

        <div className="w-24 h-[2px] mt-2 bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,1)]" />
      </div>

      {/* Create Form */}
      <div className="flex justify-center">
        <CategoryForm
          name={name}
          setName={setName}
          handleSubmit={handleCreateCategory}
        />
      </div>

      <hr className="my-6" />

      {/* Categories */}
      {isLoading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">
          Error loading categories
        </p>
      ) : (
        <div className="space-y-3">
          {categories?.map((category) => (
            <div
              key={category._id}
              className="flex items-center justify-between border border-purple-500 rounded-lg p-3"
            >
              {editingId === category._id ? (
                <div className="flex items-center gap-2 w-full">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="border px-2 py-1 rounded w-full text-white"
                  />

                  <button
                    onClick={() =>
                      handleUpdateCategory(category._id)
                    }
                    className="bg-green-500 px-3 py-1 rounded text-white"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => {
                      setEditingId(null);
                      setEditName("");
                    }}
                    className="bg-gray-500 px-3 py-1 rounded text-white"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <p className="font-medium">{category.name}</p>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingId(category._id);
                        setEditName(category.name);
                      }}
                      className="bg-blue-500 px-3 py-1 rounded text-white"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDeleteCategory(category._id)
                      }
                      className="bg-red-500 px-3 py-1 rounded text-white"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;