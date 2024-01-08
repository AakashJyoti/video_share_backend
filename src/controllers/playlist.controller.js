import mongoose, { isValidObjectId } from "mongoose";
import { Playlist } from "../models/playlist.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body;
  const userId = req.user._id;
  //TODO: create playlist

  if (name === undefined && description === undefined) {
    throw new ApiError(400, "Name and Description id required");
  }

  const newPlaylist = await Playlist.create({
    name,
    description,
    owner: userId,
  });

  res
    .status(201)
    .json(new ApiResponse(201, newPlaylist, "Playlist created successfully"));
});

const getUserPlaylists = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  //TODO: get user playlists

  if (isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid Playlist ID");
  }

  const userPlaylist = await Playlist.find({ owner: userId });

  res
    .status(201)
    .json(
      new ApiResponse(201, userPlaylist, "User Playlists fetched successfully")
    );
});

const getPlaylistById = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  //TODO: get playlist by id

  if (isValidObjectId(playlistId)) {
    throw new ApiError(400, "Invalid Playlist ID");
  }

  const prevPlaylist = await Playlist.findById(playlistId);

  res
    .status(201)
    .json(new ApiResponse(201, prevPlaylist, "Playlist fetched successfully"));
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;

  if (isValidObjectId(playlistId)) {
    throw new ApiError(400, "Invalid Playlist ID");
  }

  if (isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid Video ID");
  }

  const updatedPlaylist = await Playlist.updateOne(
    { _id: new mongoose.Types.ObjectId(playlistId) },
    {
      $push: {
        videos: videoId,
      },
    }
  );

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        updatedPlaylist,
        "Video added on Playlist successfully"
      )
    );
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;
  // TODO: remove video from playlist

  if (isValidObjectId(playlistId)) {
    throw new ApiError(400, "Invalid Playlist ID");
  }

  if (isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid Video ID");
  }

  const updatedPlaylist = await Playlist.updateOne(
    { _id: new mongoose.Types.ObjectId(playlistId) },
    {
      $pull: {
        videos: videoId,
      },
    }
  );

  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        updatedPlaylist,
        "Video removed from Playlist successfully"
      )
    );
});

const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  // TODO: delete playlist

  if (isValidObjectId(playlistId)) {
    throw new ApiError(400, "Invalid Playlist ID");
  }

  await Playlist.findByIdAndDelete(playlistId);

  res
    .status(204)
    .json(new ApiResponse(204, {}, "Playlist deleted successfully"));
});

const updatePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body;
  //TODO: update playlist

  if (name === undefined && description === undefined) {
    throw new ApiError(400, "Name and Description id required");
  }

  if (isValidObjectId(playlistId)) {
    throw new ApiError(400, "Invalid Playlist ID");
  }

  const updatedPlaylist = await Playlist.findByIdAndUpdate(
    playlistId,
    {
      $set: {
        fullName,
        email,
      },
    },
    { new: true }
  );

  res
    .status(204)
    .json(
      new ApiResponse(204, updatedPlaylist, "Playlist update successfully")
    );
});

export {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
};
