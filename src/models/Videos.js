const mongoose = require("mongoose");

const VideosSchema = new mongoose.Schema(
  {
    title: String,
    channelId: {
      type: String,
      required: true,
    },
    channelTitle: {
      type: String,
      required: true,
    },
    videoId: {
      type: String,
      required: true,
    },
    description: String,
    thumbnails: {
      default: {
        url: String,
        width: Number,
        height: Number,
      },
      medium: {
        url: String,
        width: Number,
        height: Number,
      },
      high: {
        url: String,
        width: Number,
        height: Number,
      },
      publishedAt: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("videos", VideosSchema);
