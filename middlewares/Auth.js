import jwt from "jsonwebtoken";
import Users from "../models/userSchema.js";

export async function ValidateAuth(req) {
  try {
    const tokenWithBearer = req.headers.authorization; // This includes "Bearer" prefix
    const token = tokenWithBearer.split(" ")[1];

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
