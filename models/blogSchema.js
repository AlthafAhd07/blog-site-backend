import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please Enter a title"],
      trim: true,
    },
    author: {
      type: Object,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Please enter you blog description"],
      trim: true,
    },
    thumbnail: {
      type: String,
      required: [true, "Please enter a thumbnail for you blog"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please select a category"],
      trim: true,
    },
    comments: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("blogs", blogSchema);
