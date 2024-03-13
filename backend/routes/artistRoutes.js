import express from "express";
const router = express.Router();
import {
  createArtist,
  getArtists,
  getArtistById,
  updateArtist,
  deleteArtist,
  fetchArtists,
  getArtistsFormlist,
} from "../controllers/artistController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

router.route("/").post(authenticate, createArtist).get(getArtists);
router.route("/categories").get(fetchArtists);
router.route("/formlist").get(getArtistsFormlist);
router
  .route("/:id")
  .delete(authenticate, authorizeAdmin, deleteArtist)
  .get(authenticate, authorizeAdmin, getArtistById)
  .put(authenticate, authorizeAdmin, updateArtist);

export default router;
