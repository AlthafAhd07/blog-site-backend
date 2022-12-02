console.clear();
import http from "http";
import dotenv from "dotenv";
dotenv.config();

import {
  getAllBlogs,
  getAllUserBlogs,
  getSpecificBlog,
  createBlog,
  createComment,
  updateBlog,
  deleteBlog,
  searchBlog,
} from "./controllers/blogController.js";

import {
  getRefreshToken,
  login,
  logout,
  register,
} from "./controllers/authController.js";

import {
  getUserProfile,
  updateUserProfile,
} from "./controllers/userController.js";

// connect to the database
import "./configs/connectDatabase.js";

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/api/blog/all" && method === "GET") {
    getAllBlogs(req, res);
  } else if (
    url.match(/\/api\/specificBlog\/([a-zA-Z0-9]+)/) &&
    method === "GET"
  ) {
    const blogId = url.split("/")[3];
    getSpecificBlog(req, res, blogId);
  } else if (
    url.match(/\/api\/AllUserBlogs\/([a-zA-Z0-9]+)/) &&
    method === "GET"
  ) {
    const userId = url.split("/")[3];
    getAllUserBlogs(req, res, userId);
  } else if (url === "/api/blog/create" && method === "POST") {
    createBlog(req, res);
  } else if (url === "/api/blog/update" && method === "PUT") {
    updateBlog(req, res);
  } else if (url === "/api/blog/delete" && method === "DELETE") {
    deleteBlog(req, res);
  } else if (url === "/api/blog/comment" && method === "POST") {
    createComment(req, res);
  } else if (url === "/api/user/login" && method === "POST") {
    login(req, res);
  } else if (url === "/api/user/register" && method === "POST") {
    register(req, res);
  } else if (url === "/api/user/logout" && method === "GET") {
    logout(req, res);
  } else if (url === "/api/user/refresh_token" && method === "GET") {
    getRefreshToken(req, res);
  } else if (url === "/api/user/updateProfile" && method === "POST") {
    updateUserProfile(req, res);
  } else if (url.match(/\/api\/user\/([a-zA-Z0-9]+)/) && method === "GET") {
    const userId = url.split("/")[3];
    getUserProfile(req, res, userId);
  } else if (url.match(/\/api\/search\/([a-zA-Z0-9]+)/) && method === "GET") {
    const query = url.split("/")[3];
    searchBlog(req, res, query);
  } else {
    res.writeHead(400, { "Content-type": "application/json" });
    res.end(JSON.stringify({ err: "This route does not exists" }));
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
