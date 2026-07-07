import { asyncHandler } from "../middlewares/asyncHandler.js";
import ProductModel from "../models/ProductsModel.js";

const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, category, quantity, brand } = req.fields;
    switch (true) {
      case !name:
        return res.json({ error: "Name is required..." });
      case !description:
        return res.json({ error: "description is required..." });
      case !price:
        return res.json({ error: "price is required..." });
      case !category:
        return res.json({ error: "category is required..." });
      case !quantity:
        return res.json({ error: "quantity is required..." });
      case !brand:
        return res.json({ error: "brand is required..." });
    }

    const product = new ProductModel({ ...req.fields });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const existedProduct = await ProductModel.findById(req.params.id);

  if (!existedProduct) {
    res.status(404);
    throw new Error("No product found");
  }

  const {
    name = existedProduct.name,
    description = existedProduct.description,
    price = existedProduct.price,
    category = existedProduct.category,
    quantity = existedProduct.quantity,
    brand = existedProduct.brand,
  } = req.fields;

  switch (true) {
    case !name:
      return res.status(400).json({ error: "Name is required" });

    case !description:
      return res.status(400).json({ error: "Description is required" });

    case !price:
      return res.status(400).json({ error: "Price is required" });

    case !category:
      return res.status(400).json({ error: "Category is required" });

    case !quantity:
      return res.status(400).json({ error: "Quantity is required" });

    case !brand:
      return res.status(400).json({ error: "Brand is required" });
  }

  const updatedProduct = await ProductModel.findByIdAndUpdate(
    req.params.id,
    req.fields,
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(200).json(updatedProduct);
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const removedProduct = await ProductModel.findByIdAndDelete(req.params.id);
    if (!removedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    res.status(200).json(removedProduct);
  } catch (error) {
    console.log(error);
    res.status(400).json(error.message);
  }
});

const getAllProducts = asyncHandler(async (req, res) => {
  const pageSize = 6;
  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: "i" } }
    : {};
  const count = await ProductModel.countDocuments({ ...keyword });
  const products = await ProductModel.find({ ...keyword }).limit(pageSize);
  res.status(200).json({
    products,
    page: 1,
    pages: Math.ceil(count / pageSize),
    hasMore: false,
  });
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await ProductModel.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json(product);
});

const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const product = await ProductModel.findById(req.params.id);
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString(),
      );

      if (alreadyReviewed) {
        res.status(400);
        throw new Error("product already reviewed..");
      }

      const review = {
        name: req.user.username,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "review addes" });
    } else {
      res.status(404);
      throw new Error("product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const fetchTopProducts = asyncHandler(async (req, res) => {
  try {
    const products = await ProductModel.find({}).sort({ rating: -1 }).limit(5);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const fetchNewProducts = asyncHandler(async(req,res)=>{
    try {
      const products = await ProductModel.find({}).sort({_id: -1}).limit(5)
       res.json(products);
    } catch (error) {
       console.error(error);
    res.status(400).json(error.message);
    }
}
)


export {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  addProductReview,
  fetchTopProducts,
  fetchNewProducts
};
