import jwt from "jsonwebtoken";
import Users from "../models/userSchema.js";

export async function ValidateAuth(req) {
  try {
    const token = req.headers.authorization;

    if (!token) return false;

    const decoded = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decoded) return false;

    const user = await Users.findById(decoded.id);
    if (!user) return false;

    return user;
  } catch (error) {
    return false;
  }
}
