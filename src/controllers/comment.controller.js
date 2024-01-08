import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Comment } from "../models/comment.model.js";

const addComment = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const owner = req.user._id;
  const { content } = req.body;

  if (!content) {
    throw new ApiError(500, "Comment is empty");
  }

  const newComment = await Comment.create({
    content,
    video: videoId,
    owner,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, newComment, "Comment added successfully"));
});

const getVideoComments = asyncHandler(async (req, res) => {
  //TODO: get all comments for a video
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const result = await Comment.aggregate([
    {
      $match: {
        video: new mongoose.Types.ObjectId(videoId),
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $facet: {
        metadata: [{ $count: "total" }, { $addFields: { page } }],
        data: [{ $skip: limit * (page - 1) }, { $limit: limit }],
      },
    },
  ]);

  const response = {
    currentPage: result.metadata[0].page,
    totalPage: result.metadata[0].total,
    data: result.data,
  };

  return res
    .status(201)
    .json(new ApiResponse(200, response, "Comment fetching successfully"));
});

const updateComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const { content } = req.body;

  if (!content) {
    throw new ApiError(500, "Comment is empty");
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    commentId,
    {
      $set: {
        content: content,
      },
    },
    { new: true }
  );

  return res
    .status(201)
    .json(new ApiResponse(201, updatedComment, "Comment updated successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  await Comment.findByIdAndDelete(commentId);

  return res
    .status(201)
    .json(new ApiResponse(204, {}, "Comment deleted successfully"));
});

export { addComment, getVideoComments, updateComment, deleteComment };
