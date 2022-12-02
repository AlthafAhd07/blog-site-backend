import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please Enter Your name"],
      trim: true,
      maxLength: [20, "Your name is upto 20 char long"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your E-mail"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/davg6e0yh/image/upload/v1632832500/blog_site/avatardefault_92824_c4u8sm.png",
    },
    profession: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      default: "user", // admin
    },
    rf_token: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("users", userSchema);
