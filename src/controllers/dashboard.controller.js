import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";
import { Subscription } from "../models/subscription.model.js";
import { Like } from "../models/like.model.js";

const getChannelStats = asyncHandler(async (req, res) => {
  // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.

  const owner = req.user._id;

  const totalVideos = await Video.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(owner),
      },
    },
    {
      $count: "owner",
    },
  ]);

  const totalSubscribers = await Subscription.find({
    channel: new mongoose.Types.ObjectId(owner),
  });

  const totalLikes = await Like.aggregate([
    {
      $match: {
        video: "",
      },
    },
  ]);

  const totalVideoViews = await Video.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(owner),
      },
    },
    {
      $group: {
        _id: null,
        totalViews: {
          $sum: "$views",
        },
      },
    },
  ]);

  const response = {
    totalVideoViews: totalVideoViews[0].totalViews,
    totalSubscribers,
    totalVideos,
    totalLikes,
  };

  return res
    .status(200)
    .json(new ApiResponse(200, response, "Channel stats fetch successfully"));
});

const getChannelVideos = asyncHandler(async (req, res) => {
  // TODO: Get all the videos uploaded by the channel

  const owner = req.user._id;

  const uploadedVideo = await Video.find({
    owner: new mongoose.Types.ObjectId(owner),
  });

  return res
    .status(200)
    .json(new ApiResponse(200, uploadedVideo, "Videos fetching successfully"));
});

export { getChannelStats, getChannelVideos };
