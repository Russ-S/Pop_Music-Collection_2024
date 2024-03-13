import mongoose from "mongoose";

const mediaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Media = mongoose.model("Media", mediaSchema);

export default Media;
