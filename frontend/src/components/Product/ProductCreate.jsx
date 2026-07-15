import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/ProductApiSlice.js";
import { useGetAllCategoriesQuery } from "../../redux/api/CategoryApiSlice.js";
import { toast } from "react-toastify";

const ProductCreate = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);

  const navigate = useNavigate();

  const [uploadProductImage, { isLoading: isUploading }] = useUploadProductImageMutation();
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const { data: categories } = useGetAllCategoriesQuery();

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await uploadProductImage(formData).unwrap();
      setImageUrl(res.image);
      toast.success("Image uploaded successfully!");
    } catch (err) {
      toast.error(err?.data?.message || err.error || "Image upload failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !price || !category || !brand || !quantity || !stock) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("brand", brand);
      formData.append("countInStock", stock);
      formData.append("image", imageUrl);

      await createProduct(formData).unwrap();
      toast.success(`${name} created successfully!`);
      navigate("/admin/productList");
    } catch (err) {
      toast.error(err?.data?.message || err.error || "Product creation failed");
    }
  };

  return (
    <div className="w-full h-full flex flex-col p-6 sm:p-8">
      <div className="relative w-full flex-1 bg-white/5 backdrop-blur-xl border border-white/20 p-6 sm:p-8 rounded-3xl shadow-2xl flex flex-col justify-between">
        <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-6 tracking-tight">
          Create Product
        </h2>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col justify-between space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 flex-1">
            
            {/* Left Column */}
            <div className="flex flex-col justify-between space-y-6">
              <div className="flex flex-col items-center justify-center p-6 border border-dashed border-purple-500/50 rounded-2xl bg-purple-950/10 hover:border-purple-400 transition-colors duration-200">
                {imageUrl ? (
                  <div className="relative group w-24 h-24 rounded-lg overflow-hidden border border-purple-500/40">
                    <img src={imageUrl} alt="product" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <span className="text-[10px] text-white bg-purple-600 px-2 py-1 rounded">Change</span>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-xs text-slate-300">Select product photo</p>
                  </div>
                )}
                <label className="mt-3 px-4 py-1.5 bg-purple-900/60 hover:bg-purple-800/80 border border-purple-500/60 text-xs font-medium rounded-lg cursor-pointer transition-all active:scale-95">
                  {isUploading ? "Uploading..." : image ? "Replace Image" : "Upload File"}
                  <input type="file" name="image" accept="image/*" onChange={handleUploadImage} className="hidden" />
                </label>
              </div>

              <div className="relative z-0 w-full group">
                <input
                  type="text"
                  id="name"
                  className="block py-3 px-2 w-full text-sm text-white bg-transparent border-0 border-b-2 border-purple-500/50 appearance-none focus:outline-none focus:ring-0 focus:border-purple-400 peer transition-colors"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder=" "
                />
                <label
                  htmlFor="name"
                  className="peer-focus:font-semibold absolute text-sm text-slate-300 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-2 peer-focus:text-purple-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 left-2"
                >
                  Name
                </label>
              </div>

              <div className="relative z-0 w-full group">
                <input
                  type="number"
                  id="price"
                  className="block py-3 px-2 w-full text-sm text-white bg-transparent border-0 border-b-2 border-purple-500/50 appearance-none focus:outline-none focus:ring-0 focus:border-purple-400 peer transition-colors"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder=" "
                />
                <label
                  htmlFor="price"
                  className="peer-focus:font-semibold absolute text-sm text-slate-300 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-2 peer-focus:text-purple-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 left-2"
                >
                  Price ($)
                </label>
              </div>

              <div className="relative z-0 w-full group">
                <input
                  type="text"
                  id="brand"
                  className="block py-3 px-2 w-full text-sm text-white bg-transparent border-0 border-b-2 border-purple-500/50 appearance-none focus:outline-none focus:ring-0 focus:border-purple-400 peer transition-colors"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder=" "
                />
                <label
                  htmlFor="brand"
                  className="peer-focus:font-semibold absolute text-sm text-slate-300 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-2 peer-focus:text-purple-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 left-2"
                >
                  Brand
                </label>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col justify-between space-y-6">
              <div className="relative z-0 w-full group">
                <select
                  id="category"
                  className="block py-3 px-2 w-full text-sm text-white bg-[#101011] border-b-2 border-purple-500/50 outline-none focus:border-purple-400 appearance-none cursor-pointer transition-colors"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="" disabled className="bg-[#0d0915]"></option>
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id} className="bg-[#0d0915]">
                      {c.name}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="category"
                  className="absolute text-sm text-purple-400 font-semibold transform -translate-y-6 scale-75 top-3 z-10 origin-[0] left-2"
                >
                  Category
                </label>
                <div className="absolute right-2 top-3.5 pointer-events-none text-slate-400 text-xs">
                  ▼
                </div>
              </div>

              <div className="relative z-0 w-full group">
                <input
                  type="number"
                  id="quantity"
                  className="block py-3 px-2 w-full text-sm text-white bg-transparent border-0 border-b-2 border-purple-500/50 appearance-none focus:outline-none focus:ring-0 focus:border-purple-400 peer transition-colors"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder=" "
                />
                <label
                  htmlFor="quantity"
                  className="peer-focus:font-semibold absolute text-sm text-slate-300 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-2 peer-focus:text-purple-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 left-2"
                >
                  Quantity
                </label>
              </div>

              <div className="relative z-0 w-full group">
                <input
                  type="number"
                  id="stock"
                  className="block py-3 px-2 w-full text-sm text-white bg-transparent border-0 border-b-2 border-purple-500/50 appearance-none focus:outline-none focus:ring-0 focus:border-purple-400 peer transition-colors"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  placeholder=" "
                />
                <label
                  htmlFor="stock"
                  className="peer-focus:font-semibold absolute text-sm text-slate-300 duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:left-2 peer-focus:text-purple-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 left-2"
                >
                  Count in Stock
                </label>
              </div>

              <div className="relative z-0 w-full group flex-1 flex flex-col justify-end">
                <textarea
                  id="description"
                  className="block py-2 px-2 w-full h-full min-h-[90px] text-xs text-white bg-purple-950/10 border border-purple-500/40 rounded-lg outline-none focus:border-purple-400 peer transition-colors resize-none"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder=" "
                />
                <label
                  htmlFor="description"
                  className="peer-focus:font-semibold absolute text-xs text-slate-300 duration-300 transform -translate-y-5 scale-75 top-2.5 z-10 origin-[0] peer-focus:left-2 peer-focus:text-purple-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-5 left-2"
                >
                  Description
                </label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isCreating}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl transition-all active:scale-95 shadow-md shadow-purple-950/50 disabled:opacity-50"
          >
            {isCreating ? "Creating Product..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductCreate;