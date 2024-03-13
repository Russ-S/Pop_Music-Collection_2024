import asyncHandler from "../middlewares/asyncHandler.js";
import Recording from "../models/recordingModel.js";

// @desc    Create recording
// @route   POST /api/recordings
// @access  Private/Admin
const createRecording = asyncHandler(async (req, res) => {
  const recording = new Recording({
    artist_name: req.body.artist_name,
    coverImage: req.body.coverImage,
    title: req.body.title,
    category: req.body.category,
    label: req.body.label,
    number: req.body.number,
    year: req.body.year,
    media: req.body.media,
    number_in_set: req.body.number_in_set,
    value: req.body.value,
    num_tracks: req.body.num_tracks,
    location: req.body.location,
  });

  const createdRecording = await recording.save();
  res.status(201).json(createdRecording);
});

// @desc    Fetch all recordings
// @route   GET /api/recordings
// @access  Public
const getRecordings = asyncHandler(async (req, res) => {
  const pageSize = 12;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Recording.countDocuments();

  const recordings = await Recording.find({})
    .sort({
      artist_name: 1,
      title: 1,
    })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ recordings, page, pages: Math.ceil(count / pageSize) });
});

const getRecordingsSortList = asyncHandler(async (req, res) => {
  const items = await Recording.find({}).sort({
    artist_name: 1,
    title: 1,
  });
  res.json(items);
});

// @desc    Fetch a recording
// @route   GET /api/recordings/:id
// @access  Public
const getRecordingById = asyncHandler(async (req, res) => {
  const recording = await Recording.findById(req.params.id);

  if (recording) {
    return res.json(recording);
  } else {
    res.status(404);
    throw new Error("Recording not found");
  }
});

// @desc    Update a recording
// @route   PUT /api/recordings/:id
// @access  Private/Admin
const updateRecording = asyncHandler(async (req, res) => {
  const {
    artist_name,
    coverImage,
    title,
    category,
    label,
    number,
    year,
    media,
    number_in_set,
    value,
    num_tracks,
    location,
  } = req.body;

  const recording = await Recording.findById(req.params.id);
  console.log(recording);

  if (recording) {
    recording.artist_name = artist_name || recording.artist_name;
    recording.coverImage = coverImage || recording.coverImage;
    recording.title = title || recording.title;
    recording.category = category || recording.category;
    recording.label = label || recording.label;
    recording.number = number || recording.number;
    recording.year = year || recording.year;
    recording.media = media || recording.media;
    recording.number_in_set = number_in_set || recording.number_in_set;
    recording.value = value || recording.value;
    recording.num_tracks = num_tracks || recording.num_tracks;
    recording.location = location || recording.location;

    const updatedRecording = await recording.save();
    res.json(updatedRecording);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc    Delete a recording
// @route   DELETE /api/recordings/:id
// @access  Private/Admin
const deleteRecording = asyncHandler(async (req, res) => {
  const recording = await Recording.findById(req.params.id);

  if (recording) {
    await Recording.deleteOne({ _id: recording._id });
    res.status(200).json({ message: "Recording deleted" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

const fetchRecordings = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = parseInt(req.query.startIndex) || 0;

    const searchTerm = req.query.searchTerm || "";

    const recordings = await Recording.find({
      $or: [
        { artist_name: { $regex: searchTerm, $options: "i" } },
        { title: { $regex: searchTerm, $options: "i" } },
        { category: { $regex: searchTerm, $options: "i" } },
        { location: { $regex: searchTerm, $options: "i" } },
      ],
    })
      .sort({
        artist_name: 1,
        title: 1,
      })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(recordings);
  } catch (error) {
    next(error);
  }
};

const fetchAllRecordings = asyncHandler(async (req, res) => {
  try {
    const recordings = await Recording.find({})
      .populate("media")
      .limit(12)
      .sort({ artist_name: 1, title: 1 });

    res.json(recordings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

const filterRecordings = asyncHandler(async (req, res) => {
  try {
    const { checked, radio } = req.body;

    let args = {};
    if (checked.length > 0) args.media = checked;
    if (radio.length) args.category = { $gte: radio[0], $lte: radio[1] };

    const recordings = await Recording.find(args).sort({
      artist_name: 1,
      title: 1,
    });
    res.json(recordings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

export {
  createRecording,
  getRecordings,
  getRecordingById,
  updateRecording,
  deleteRecording,
  getRecordingsSortList,
  fetchRecordings,
  fetchAllRecordings,
  filterRecordings,
};
