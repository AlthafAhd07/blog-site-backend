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
} from "./controllers/blogController.js";

import {
  getRefreshToken,
  login,
  logout,
  register,
} from "./controllers/authController.js";

// connect to the database
import "./configs/connectDatabase.js";

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/api/getAllBlogs" && method === "GET") {
    getAllBlogs(req, res);
  } else if (url.match(/\/api\/blog\/([0-9]+)/) && method === "GET") {
    const id = url.split("/")[3];
    getSpecificBlog(req, res, id);
  } else if (url.match(/\/api\/blogs\/([0-9]+)/) && method === "GET") {
    const username = url.split("/")[3];
    getAllUserBlogs(req, res, username);
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
  } else if (url === "/api/user/logout" && method === "POST") {
    logout(req, res);
  } else if (url === "/api/user/getRefreshToken" && method === "GET") {
    getRefreshToken(req, res);
  } else {
    res.writeHead(400, { "Content-type": "application/json" });
    res.end(JSON.stringify({ err: "This route does not exists" }));
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
