import express from "express";
const router = express.Router();
import {
  createLabel,
  getLabels,
  getLabelById,
  updateLabel,
  deleteLabel,
  getLabelsFormlist,
} from "../controllers/labelController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

router.route("/").post(authenticate, createLabel).get(authenticate, getLabels);
router.route("/formlist").get(getLabelsFormlist);
router
  .route("/:id")
  .delete(authenticate, authorizeAdmin, deleteLabel)
  .get(authenticate, authorizeAdmin, getLabelById)
  .put(authenticate, authorizeAdmin, updateLabel);

export default router;
