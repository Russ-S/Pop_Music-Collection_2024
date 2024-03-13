import asyncHandler from "../middlewares/asyncHandler.js";
import Artist from "../models/artistModel.js";

// @desc    Create artistr
// @route   POST /api/artists
// @access  Private/Admin
const createArtist = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const artistExists = await Artist.findOne({ name });

  if (artistExists) {
    res.status(400);
    throw new Error("Artist already exists");
  }

  const artist = await Artist.create({
    name,
  });

  if (artist) {
    res.status(201).json({
      _id: artist._id,
      name: artist.name,
    });
  } else {
    res.status(400);
    throw new Error("Unable to add artist");
  }
});

// @desc    Get artists
// @route   GET /api/artists
// @access  Private/Admin
const getArtists = asyncHandler(async (req, res) => {
  const pageSize = 12;
  const page = Number(req.query.pageNumber) || 1;
  const count = await Artist.countDocuments();

  const artists = await Artist.find({})
    .sort({
      name: 1,
    })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ artists, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Get artists for forms
// @route   GET /api/artists/formlist
// @access  Private/Admin
const getArtistsFormlist = asyncHandler(async (req, res) => {
  const artists = await Artist.find({}).sort({
    name: 1,
  });
  res.json(artists);
});

// @desc    Get artist by ID
// @route   GET /api/artists/:id
// @access  Private/Admin
const getArtistById = asyncHandler(async (req, res) => {
  const artist = await Artist.findById(req.params.id);

  if (artist) {
    return res.json(artist);
  } else {
    res.status(404);
    throw new Error("Artist not found");
  }
});

// @desc    Update artists
// @route   PUT /api/artists/:id
// @access  Private/Admin
const updateArtist = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const artist = await Artist.findById(req.params.id);

  if (artist) {
    artist.name = name;

    const updatedArtist = await artist.save();
    res.json(updatedArtist);
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

// @desc    Delete artists
// @route   DELETE /api/artists/:id
// @access  Private/Admin
const deleteArtist = asyncHandler(async (req, res) => {
  const artist = await Artist.findById(req.params.id);

  if (artist) {
    await Artist.deleteOne({ _id: artist._id });
    res.status(200).json({ message: "Artist deleted" });
  } else {
    res.status(404);
    throw new Error("Resource not found");
  }
});

const fetchArtists = asyncHandler(async (req, res) => {
  const artists = await Artist.find({}).sort({
    name: 1,
  });
  res.json(artists);
});

export {
  createArtist,
  getArtists,
  getArtistsFormlist,
  getArtistById,
  updateArtist,
  deleteArtist,
  fetchArtists,
};
