import React, { useState } from "react";
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
    data: responseData,
    isLoading,
    error,
    refetch,
  } = useGetAllCategoriesQuery();

  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  // Safely extract the categories array from the backend response structure
  const categories = Array.isArray(responseData)
    ? responseData
    : responseData?.categories && Array.isArray(responseData.categories)
    ? responseData.categories
    : responseData?.data && Array.isArray(responseData.data)
    ? responseData.data
    : [];

  const handleCreateCategory = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      await createCategory({ name }).unwrap();
      toast.success("Category created successfully");
      setName("");
      await refetch();
    } catch (err) {
      console.log(err);
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
    } catch (err) {
      console.log(err);
      toast.error("Failed to update category");
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory({
          category_id: categoryId,
        }).unwrap();

        toast.success("Category deleted successfully");
        await refetch();
      } catch (err) {
        console.log(err);
        toast.error("Failed to delete category");
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col p-6 sm:p-8">
      {/* Premium Glass Card Container */}
      <div className="relative w-full flex-1 bg-white/5 backdrop-blur-xl border border-white/20 p-6 sm:p-8 rounded-3xl shadow-2xl flex flex-col justify-between overflow-hidden">
        
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 tracking-tight text-center sm:text-left">
            Category Management
          </h2>
        </div>

        {/* Create Form Container */}
        <div className="bg-purple-950/10 border  border-purple-500/20 p-5 rounded-2xl mb-6 shadow-inner flex justify-center">
          <CategoryForm
            name={name}
            setName={setName}
            handleSubmit={handleCreateCategory}
          />
        </div>

        {/* Categories List (Scrollable Area) */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-1">
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <div className="w-8 h-8 border-3 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : error ? (
            <p className="text-center text-red-400 text-sm py-10">
              Error loading categories. Please refresh.
            </p>
          ) : categories.length === 0 ? (
            <p className="text-center text-slate-400 text-sm py-10">
              No categories found.
            </p>
          ) : (
            categories.map((category) => (
              <div
                key={category._id}
                className="flex items-center justify-between bg-purple-950/10 border border-purple-500/20 hover:border-purple-400/40 p-4 rounded-xl shadow-md transition-all duration-200"
              >
                {editingId === category._id ? (
                  /* Edit Mode View */
                  <div className="flex items-center gap-3 w-full">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="flex-1 bg-purple-950/30 border border-purple-500/50 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-purple-400 transition-colors"
                      placeholder="Category name"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleUpdateCategory(category._id)}
                        className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-lg active:scale-95 transition-all"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingId(null);
                          setEditName("");
                        }}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs px-4 py-2.5 rounded-lg active:scale-95 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Normal View */
                  <>
                    <p className="font-medium text-sm text-slate-200 pl-1">{category.name}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setEditingId(category._id);
                          setEditName(category.name);
                        }}
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-md active:scale-95 transition-all"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category._id)}
                        className="bg-gray-950/20 text-shadow-orange-500 border border-red-500/40 hover:bg-red-900/40 hover:border-red-400 text-red-400 font-semibold text-xs px-4 py-2.5 rounded-lg active:scale-95 transition-all"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
};

export default CategoryList;