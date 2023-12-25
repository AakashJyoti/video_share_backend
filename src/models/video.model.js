import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
  {
    videoFile: {
      type: String, // Cloudinary url
      required: [true, "VideFile for video is required"],
    },
    thumbnail: {
      type: String, // Cloudinary url
      required: [true, "Thumbnail for video is required"],
    },
    title: {
      type: String,
      required: [true, "Tile for video is required"],
    },
    description: {
      type: String,
      required: [true, "Description for video is required"],
    },
    duration: {
      type: Number,
      required: [true, "Duration for video is required"],
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video", videoSchema);
