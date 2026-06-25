import { asyncHandler } from "../middlewares/asyncHandler.js";
import Category from "../models/CategoryModel.js";

const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name || !name.trim()) {
    res.status(400);
    throw new Error("enter the valid details....");
  }
  const existingCategory = await Category.findOne({ name });
  if (existingCategory) {
    res.status(409);
    throw new Error("category already existing...");
  }

  const newCategory = new Category({ name });
  try {
    await newCategory.save();
    res.status(201).json(newCategory)

  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});


const updateCategory = asyncHandler(async (req,res)=>{
  try {
    const {categoryId}  =  req.params
    const existingCategory = await Category.findById({_id: categoryId})
    if(!existingCategory){
      res.status(404) 
      throw new Error('noo category found..')
    }

    if(req.body.name){
      existingCategory.name = req.body.name.trim() || existingCategory.name
    }
    const updatedCategory = await existingCategory.save();
    res.status(200).json(updatedCategory)
    
  } catch (error) {
    res.status(500)
    throw new Error (error?.data?.message || error.message)
    
  }
})


const removeCategory = asyncHandler(async (req, res) => {
  const { categoryId } = req.params;

  const removed = await Category.findByIdAndDelete(categoryId);

  if (!removed) {
    res.status(404);
    throw new Error("Category not found");
  }

  res.status(200).json({
    message: "Category removed successfully",
  });
});


const categoryList = asyncHandler(async (req,res)=>{
   const allCategory = await Category.find();

  if (allCategory.length === 0) {
    res.status(404);
    throw new Error("no Categories found");
  }

  res.status(200).json(allCategory);
})


const getCategoryById =asyncHandler(async(req,res)=>{
  const {categoryId} = req.params;
  const category = await findById(categoryId)

  if(!category){
    res.status(404)
    throw new Error(' no category found')
  }
res.status(200).json(category)

})

export { createCategory,updateCategory,removeCategory ,categoryList ,getCategoryById};
