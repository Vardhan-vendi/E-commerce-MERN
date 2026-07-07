import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice.js";
import { useGetAllCategoriesQuery } from "../../redux/api/categoryApiSlice.js";
import { toast } from "react-toastify";

const ProductList = () => {
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

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useGetAllCategoriesQuery();

  return (
    <div className="container xl :mx-[9rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        {/* Admin menu */}

        <div className="md:w-3/4 p-3">
          <h2 className="font-bold text-white text-xl mb-4">create product</h2>
          <div className="h-12">
            {imageUrl && (
              <div className="text-center">
                <img
                  src={imageUrl}
                  alt="product"
                  className="block mx-auto h-50"
                />
              </div>
            )}

            <div className="mb-3">
              <label
                className="block border w-fill px-4 py-11 text-white 
                      text-center font-bold border rounded-lg cursor-pointer"
              >
                {image ? image.name : "upload image"}
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className={!image ? "hidden" : "text-white"}
                />
              </label>
            </div>
            <div className="p-3">
              <div className="flex flex-wrap ">
                <div className="one flex flex-col ml-7">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="p-3 my-3 w-[30rem] border rounded-lg outline-none text-white"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="two flex flex-col ml-10">
                  <label htmlFor="price">Price</label>
                  <input
                    type="number"
                    className="p-3 my-3 w-[30rem] border rounded-lg outline-none text-white "
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="one flex flex-col ml-7">
                  <label htmlFor="name block">Brand</label>
                  <input
                    type="text"
                    className="p-3 my-3 w-[30rem] border rounded-lg outline-none text-white"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </div>
                <div className="two flex flex-col ml-10">
                  <label htmlFor="name block">Quantity</label>
                  <input
                    type="number"
                    className="p-3 my-3 w-[30rem] border rounded-lg outline-none text-white"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
              </div>
              <div className="ml-7">
                <label>Description</label>
                <textarea
                  type="text"
                  className="my-3 bg-[#101011] border rounded-lg w-full text-white"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Description"
                ></textarea>
              </div>
              <div className="flex flex-col ml-7">
                <div className="flex flex-col">
                  <label htmlFor="stock">Count in Stock</label>
                  <input
                    type="number"
                    className="p-3 my-3 w-[30rem] border rounded-lg outline-none text-white"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col ml-7">
                <div className="flex flex-col">
                  <label htmlFor="stock">Category</label>
                  <select
                    className="p-3 my-3 w-[30rem] border rounded-lg bg-[#101011] outline-none text-white"
                    onChange={(e) => setCategory(e.target.value)}
                    aria-placeholder="choose category"
                  >
                    {categories?.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
