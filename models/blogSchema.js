import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please Enter a title"],
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
    tags: {
      type: array,
      required: [true, "Their should be atleast one tag for the blog"],
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
