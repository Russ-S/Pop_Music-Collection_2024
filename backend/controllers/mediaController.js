import asyncHandler from "../middlewares/asyncHandler.js";
import Media from "../models/media.Model.js";

// @desc    Create media
// @route   POST /api/media
// @access  Private/Admin
const createMedia = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const mediaExists = await Media.findOne({ name });

  if (mediaExists) {
    res.status(400);
    throw new Error("Media type already exists");
  }

  const media = await Media.create({
    name,
  });

  if (media) {
    res.status(201).json({
      _id: media._id,
      name: media.name,
    });
  } else {
    res.status(400);
    throw new Error("Unable to add media type");
  }
});

// @desc    Get media
// @route   GET /api/media
// @access  Private/Admin
const getMedia = asyncHandler(async (req, res) => {
  const media = await Media.find({});
  res.json(media);
});

// @desc    Get media by ID
// @route   GET /api/media/:id
// @access  Private/Admin
const getMediaById = asyncHandler(async (req, res) => {
  const media = await Media.findById(req.params.id);

  if (media) {
    return res.json(media);
  } else {
    res.status(404);
    throw new Error("Media type not found");
  }
});

// @desc    Update media
// @route   PUT /api/media/:id
// @access  Private/Admin
const updateMedia = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const media = await Media.findById(req.params.id);

  if (media) {
    media.name = name;

    const updatedMedia = await media.save();
    res.json(updatedMedia);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc    Delete media
// @route   DELETE /api/medias/:id
// @access  Private/Admin
const deleteMedia = asyncHandler(async (req, res) => {
  const media = await Media.findById(req.params.id);

  if (media) {
    await Media.deleteOne({ _id: media._id });
    res.status(200).json({ message: "Media type deleted" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

export { createMedia, getMedia, getMediaById, updateMedia, deleteMedia };
