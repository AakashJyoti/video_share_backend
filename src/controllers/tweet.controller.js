import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweet.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createTweet = asyncHandler(async (req, res) => {
  //TODO: create tweet
  const { content } = req.body;
  const userID = req.user._id;

  if (!content) {
    throw new ApiError(400, "Content is Required");
  }

  const newTweet = await Tweet.create({
    content,
    owner: userID,
  });

  res
    .status(201)
    .json(new ApiResponse(201, newTweet, "Tweet creation successful"));
});

const getUserTweets = asyncHandler(async (req, res) => {
  // TODO: get user tweets
  const { userId } = req.params;

  if (!isValidObjectId(userId)) {
    throw new ApiError(400, "Invalid userID");
  }

  const tweets = await Tweet.find({ owner: userId });

  res
    .status(201)
    .json(new ApiResponse(200, tweets, "Fetching tweets successful"));
});

const updateTweet = asyncHandler(async (req, res) => {
  //TODO: update tweet
  const { tweetId } = req.params;
  const { content } = req.body;

  if (!isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid TweetId");
  }

  if (!content) {
    throw new ApiError(400, "Content is Required");
  }

  const updatedTweet = await Tweet.findByIdAndUpdate(
    tweetId,
    {
      $set: {
        content: content,
      },
    },
    { new: true }
  );
  res
    .status(201)
    .json(new ApiResponse(201, updatedTweet, "Update tweet successful"));
});

const deleteTweet = asyncHandler(async (req, res) => {
  //TODO: delete tweet
  const { tweetId } = req.params;

  if (!isValidObjectId(tweetId)) {
    throw new ApiError(400, "Invalid TweetId");
  }

  await Tweet.findByIdAndDelete(tweetId);

  res.status(204).json(new ApiResponse(201, {}, "Delete tweet successful"));
});

export { createTweet, getUserTweets, updateTweet, deleteTweet };
