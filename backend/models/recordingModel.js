import mongoose from "mongoose";

const recordingSchema = new mongoose.Schema(
  {
    artist_name: {
      type: String,
      required: true,
    },
    coverImage: {
      type: String,
      default: "no-image.jpg",
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    media: {
      type: String,
      required: true,
    },
    number_in_set: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      required: true,
    },
    num_tracks: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Recording = mongoose.model("Recording", recordingSchema);

export default Recording;
