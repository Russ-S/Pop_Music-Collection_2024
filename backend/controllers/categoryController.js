import asyncHandler from "../middlewares/asyncHandler.js";
import Category from "../models/categoryModel.js";

// @desc    Create category
// @route   POST /api/categories
// @access  Private/Admin
const createCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const categoryExists = await Category.findOne({ name });

  if (categoryExists) {
    res.status(400);
    throw new Error("Category already exists");
  }

  const category = await Category.create({
    name,
  });

  if (category) {
    res.status(201).json({
      _id: category._id,
      name: category.name,
    });
  } else {
    res.status(400);
    throw new Error("Unable to add category");
  }
});

// @desc    Get categories
// @route   GET /api/categories
// @access  Private/Admin
const getCategories = asyncHandler(async (req, res) => {
  const pageSize = 12;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Category.countDocuments();

  const categories = await Category.find({})
    .sort({
      name: 1,
    })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ categories, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Get categories for forms
// @route   GET /api/categories/formlist
// @access  Private/Admin
const getCategoriesFormlist = asyncHandler(async (req, res) => {
  const categories = await Category.find({}).sort({
    name: 1,
  });
  res.json(categories);
});

// @desc    Get category by ID
// @route   GET /api/categories/:id
// @access  Private/Admin
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    return res.json(category);
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

// @desc    Update categories
// @route   PUT /api/categories/:id
// @access  Private/Admin
const updateCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const category = await Category.findById(req.params.id);

  if (category) {
    category.name = name;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc    Delete categories
// @route   DELETE /api/categories/:id
// @access  Private/Admin
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    await Category.deleteOne({ _id: category._id });
    res.status(200).json({ message: "Category deleted" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

const fetchCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({}).sort({
    name: 1,
  });
  res.json(categories);
});

export {
  createCategory,
  getCategories,
  getCategoriesFormlist,
  getCategoryById,
  updateCategory,
  deleteCategory,
  fetchCategories,
};
