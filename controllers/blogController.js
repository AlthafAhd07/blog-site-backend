import { getBodyData } from "../configs/utils.js";

// @desc    Get all the blogs
// @route   /api/getAllBlogs
async function getAllBlogs(req, res) {
  try {
    // const blogs = await xxxxx
    res.writeHead(200, { "Content-type": "application/json" });
    // res.end(JSON.stringify(blogs));
  } catch (err) {
    res.writeHead(400, { "Content-type": "application/json" });
    res.end(JSON.stringify(err));
  }
}

// @desc    Get a specific Blog
// @route   /api/blog/{blog ID}
async function getSpecificBlog(req, res, id) {
  try {
    const blog = "";

    if (!blog) {
      res.writeHead(400, { "Content-type": "application/json" });
      res.end(JSON.stringify({ err: "blog does not exists" }));
    }

    res.writeHead(200, { "Content-type": "application/json" });
    // res.end(JSON.stringify(blog));
  } catch (err) {
    res.writeHead(400, { "Content-type": "application/json" });
    res.end(JSON.stringify(err));
  }
}
// @desc    Get all the blogs related to a user
// @route   /api/blogs/{username}
async function getAllUserBlogs(req, res, id) {
  try {
    const blogs = "";

    if (!blogs) {
      res.writeHead(400, { "Content-type": "application/json" });
      res.end(JSON.stringify({ err: "blog does not exists" }));
    }

    res.writeHead(200, { "Content-type": "application/json" });
    // res.end(JSON.stringify(blogs));
  } catch (err) {
    res.writeHead(400, { "Content-type": "application/json" });
    res.end(JSON.stringify(err));
  }
}

async function createBlog(req, res) {}

async function updateBlog(req, res) {}

async function deleteBlog(req, res) {}

async function createComment(req, res) {}

export {
  getAllBlogs,
  getSpecificBlog,
  getAllUserBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  createComment,
};
