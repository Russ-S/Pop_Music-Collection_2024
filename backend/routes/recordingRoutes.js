import express from "express";
const router = express.Router();
import {
  createRecording,
  getRecordings,
  getRecordingById,
  updateRecording,
  deleteRecording,
  getRecordingsSortList,
  fetchAllRecordings,
  filterRecordings,
  fetchRecordings,
} from "../controllers/recordingController.js";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";

router.route("/").post(authenticate, createRecording).get(getRecordings);
router.route("/sortlist").get(getRecordingsSortList);
router.route("/result").get(fetchRecordings);
router
  .route("/:id")
  .get(getRecordingById)
  .put(authenticate, authorizeAdmin, updateRecording)
  .delete(authenticate, authorizeAdmin, deleteRecording);

router.route("/allrecordings").get(fetchAllRecordings);
router.route("/filtered-recordings").post(filterRecordings);

export default router;
