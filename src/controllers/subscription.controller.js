import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.model.js";
import { Subscription } from "../models/subscription.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  const userId = req.body._id;
  // TODO: toggle subscription

  if (isValidObjectId(channelId)) {
    throw new ApiError(400, "Invalid Comment ID");
  }

  const isSubscriptionExists = await Subscription.findOne({
    $and: [
      { comment: new mongoose.Types.ObjectId(channelId) },
      { likedBy: new mongoose.Types.ObjectId(userId) },
    ],
  });

  if (isSubscriptionExists) {
    await Subscription.findByIdAndDelete(isSubscriptionExists._id);
  } else {
    await Subscription.create({
      subscriber: userId,
      channel: channelId,
    });
  }

  res
    .status(201)
    .json(new ApiResponse(201, {}, "Toggle subscription successful"));
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  if (isValidObjectId(channelId)) {
    throw new ApiError(400, "Invalid Comment ID");
  }

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Fetching user subscriber successful"));
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { subscriberId } = req.params;
  if (isValidObjectId(subscriberId)) {
    throw new ApiError(400, "Invalid Comment ID");
  }

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Fetching subscribed channels successful"));
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
