import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const userId = req.user._id;
  //TODO: toggle like on video

  if (isValidObjectId(videoId)) {
    throw new ApiError(400, "Invalid Video ID");
  }

  const isLikeExists = await Like.findOne({
    $and: [
      { video: new mongoose.Types.ObjectId(videoId) },
      { likedBy: new mongoose.Types.ObjectId(userId) },
    ],
  });

  if (isLikeExists) {
    await Like.findByIdAndDelete(isLikeExists._id);
  } else {
    await Like.create({
      video: videoId,
      likedBy: userId,
    });
  }

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Toggle video like successful"));
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const userId = req.user._id;
  //TODO: toggle like on comment

  if (isValidObjectId(commentId)) {
    throw new ApiError(400, "Invalid Comment ID");
  }

  const isLikeExists = await Like.findOne({
    $and: [
      { comment: new mongoose.Types.ObjectId(commentId) },
      { likedBy: new mongoose.Types.ObjectId(userId) },
    ],
  });

  if (isLikeExists) {
    await Like.findByIdAndDelete(isLikeExists._id);
  } else {
    await Like.create({
      comment: commentId,
      likedBy: userId,
    });
  }

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Toggle comment like successful"));
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  const userId = req.user._id;
  //TODO: toggle like on tweet

  if (isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid Tweet ID");
  }

  const isLikeExists = await Like.findOne({
    $and: [
      { tweet: new mongoose.Types.ObjectId(tweetId) },
      { likedBy: new mongoose.Types.ObjectId(userId) },
    ],
  });

  if (isLikeExists) {
    await Like.findByIdAndDelete(isLikeExists._id);
  } else {
    await Like.create({
      tweet: tweetId,
      likedBy: userId,
    });
  }

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Toggle tweet like successful"));
});

const getLikedVideos = asyncHandler(async (req, res) => {
  //TODO: get all liked videos
  const userId = req.user._id;
  const likedVideos = await Like.find({
    likedBy: new mongoose.Types.ObjectId(userId),
  });
  res
    .status(200)
    .json(
      new ApiResponse(200, likedVideos, "Fetching likes videos successful")
    );
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
