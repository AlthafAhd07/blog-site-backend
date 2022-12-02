import bcrypt from "bcrypt";
import { Refresh_token } from "../../../Chat apps/Final/chatapp-backend/configs/web_tokens.js";

import {
  AvatarImages,
  getBodyData,
  SendErrorResponce,
} from "../configs/utils.js";
import { validateEmail, validRegister } from "../middlewares/validate.js";
import Users from "../models/userSchema.js";

async function register(req, res) {
  try {
    const { username, email, password } = await getBodyData(req);

    const validateInputs = validRegister(username, email, password);

    if (validateInputs.length > 0) {
      res.writeHead(400, { "Content-type": "application/json" });
      res.end(JSON.stringify({ msg: validateInputs }));
    }

    const user = await Users.findOne({ email });

    if (user) {
      res.writeHead(400, { "Content-type": "application/json" });
      res.end(JSON.stringify({ msg: "Email already exists." }));
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const newUserData = {
      username,
      email,
      password: hashPassword,
      avatar: AvatarImages[Math.round(Math.random() * 7)],
    };

    const newUser = await new Users(newUserData);

    await newUser.save();

    res.writeHead(201, { "Content-type": "application/json" });
    res.end(JSON.stringify({ msg: newUser }));
  } catch (err) {
    res.writeHead(400, { "Content-type": "application/json" });
    res.end(JSON.stringify({ msg: err.message }));
  }
}
async function login(req, res) {
  try {
    const { email, password } = await getBodyData(req);
    if (!email || !password) {
      return SendErrorResponce(res, "Please fill all fields");
    }
    if (!validateEmail(email)) {
      return SendErrorResponce(res, "Please enter a valid e-mail");
    }
    console.log(email);
    const user = await Users.findOne({ email: "althafahd07@gmail.com" });

    if (!user) {
      return SendErrorResponce(res, "User does not exists.");
    }

    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (!isMatchPassword) {
      return SendErrorResponce(res, "Password does not match.");
    }

    const refresh_token = Refresh_token({ id: user._id });

    console.log(refresh_token);
  } catch (error) {
    return SendErrorResponce(res, error.message);
  }
}
async function logout() {}
async function getRefreshToken() {}

export { register, login, logout, getRefreshToken };
