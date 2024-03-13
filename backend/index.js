import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Utils
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import recordingRoutes from "./routes/recordingRoutes.js";
import artistRoutes from "./routes/artistRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import labelRoutes from "./routes/labelRoutes.js";
import mediaRoutes from "./routes/mediaRoutes.js";

dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/recordings", recordingRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/labels", labelRoutes);
app.use("/api/media", mediaRoutes);

app.listen(port, () => console.log(`Server runing on port: ${port}`));
