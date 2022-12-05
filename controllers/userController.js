import bcrypt from "bcrypt";

import Users from "../models/userSchema.js";
import { getBodyData, SendErrorResponce } from "../configs/utils.js";
import { ValidateAuth } from "../middlewares/Auth.js";

// @desc    Updating user profile data
// @route  /api/user/updateProfile
async function updateUserProfile(req, res) {
  try {
    const { username, profession, oldPassword, newPassword, avatar } =
      await getBodyData(req);
    const user = await ValidateAuth(req);

    if (!user) {
      return SendErrorResponce(res, "Invalid authentication");
    }

    let password;

    if (newPassword) {
      const isMatchPassword = await bcrypt.compare(oldPassword, user.password);
      if (!isMatchPassword) {
        return SendErrorResponce(res, "Incorrect old password");
      }
      if (newPassword.length < 6) {
        return SendErrorResponce(
          res,
          "Password length should be atleast 6 characters"
        );
      }
      password = await bcrypt.hash(newPassword, 12);
    }

    const updateProfileData = {
      username: username ?? user.username,
      profession: profession ?? user.profession,
      avatar: avatar ?? user.avatar,
      password: password ?? user.password,
    };

    await Users.findByIdAndUpdate(user._id, updateProfileData);

    res.writeHead(201, { "Content-type": "application/json" });
    return res.end(JSON.stringify({ msg: "Profile updated!" }));
  } catch (error) {
    return SendErrorResponce(res, error.message);
  }
}

// @desc    Search a blog
// @route  /api/user/{userId}
async function getUserProfile(req, res, userId) {
  try {
    const user = await Users.findById(userId).select("-password");

    if (!user) {
      return SendErrorResponce(res, "User does not exists");
    }

    res.writeHead(200, { "Content-type": "application/json" });
    return res.end(JSON.stringify({ msg: user }));
  } catch (error) {
    return SendErrorResponce(res, error.message);
  }
}

export { updateUserProfile, getUserProfile };
