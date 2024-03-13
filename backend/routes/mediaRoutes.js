import express from "express";
const router = express.Router();
import {
  createMedia,
  getMedia,
  getMediaById,
  updateMedia,
  deleteMedia,
} from "../controllers/mediaController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

router.route("/").post(authenticate, createMedia).get(getMedia);
router
  .route("/:id")
  .delete(authenticate, deleteMedia)
  .get(authenticate, getMediaById)
  .put(authenticate, updateMedia);

export default router;
