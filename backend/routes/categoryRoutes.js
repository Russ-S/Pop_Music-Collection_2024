import express from "express";
const router = express.Router();
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  fetchCategories,
  getCategoriesFormlist,
} from "../controllers/categoryController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

router
  .route("/")
  .post(authenticate, authorizeAdmin, createCategory)
  .get(getCategories);
router.route("/categories").get(fetchCategories);
router.route("/formlist").get(getCategoriesFormlist);
router
  .route("/:id")
  .delete(authenticate, authorizeAdmin, deleteCategory)
  .get(authenticate, authorizeAdmin, getCategoryById)
  .put(authenticate, authorizeAdmin, updateCategory);

export default router;
