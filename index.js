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
  login,
  logout,
  register,
  getRefreshToken,
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

  // getting all blogs
  if (url === "/api/blog/all" && method === "GET") {
    getAllBlogs(req, res);
  }

  // getting a specific blog
  else if (
    url.match(/\/api\/specificBlog\/([a-zA-Z0-9]+)/) &&
    method === "GET"
  ) {
    const blogId = url.split("/")[3];
    getSpecificBlog(req, res, blogId);
  }

  // getting all blogs related to a user
  else if (
    url.match(/\/api\/AllUserBlogs\/([a-zA-Z0-9]+)/) &&
    method === "GET"
  ) {
    const userId = url.split("/")[3];
    getAllUserBlogs(req, res, userId);
  }

  // create a blog
  else if (url === "/api/blog/create" && method === "POST") {
    createBlog(req, res);
  }

  // update a blog
  else if (url === "/api/blog/update" && method === "PUT") {
    updateBlog(req, res);
  }

  // delete a specific blog
  else if (url === "/api/blog/delete" && method === "POST") {
    deleteBlog(req, res);
  }

  // add a comment on a specific blog
  else if (url === "/api/blog/comment" && method === "POST") {
    createComment(req, res);
  }

  // search blogs
  else if (url.match(/\/api\/search?([a-zA-Z0-9]+)/) && method === "GET") {
    const query = url.split("=")[1];

    searchBlog(req, res, query);
  }

  // login user
  else if (url === "/api/user/login" && method === "POST") {
    login(req, res);
  }

  // create an account
  else if (url === "/api/user/register" && method === "POST") {
    register(req, res);
  }

  // logout user
  else if (url === "/api/user/logout" && method === "GET") {
    logout(req, res);
  }

  // get access token and user data
  else if (url === "/api/user/refresh_token" && method === "GET") {
    getRefreshToken(req, res);
  }

  // update user profile info
  else if (url === "/api/user/updateProfile" && method === "PUT") {
    updateUserProfile(req, res);
  }

  // getting specific user's data
  else if (url.match(/\/api\/user\/([a-zA-Z0-9]+)/) && method === "GET") {
    const userId = url.split("/")[3];
    getUserProfile(req, res, userId);
  }

  // If any of the above routes doesn't match
  else {
    res.writeHead(400, { "Content-type": "application/json" });
    res.end(JSON.stringify({ err: "This route does not exists" }));
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
