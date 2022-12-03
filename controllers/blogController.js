import { getBodyData, SendErrorResponce } from "../configs/utils.js";

import { ValidateAuth } from "../middlewares/Auth.js";

import Blogs from "../models/blogSchema.js";

import { v4 as uuidv4 } from "uuid";

// @desc    Get all the blogs
// @route   /api/getAllBlogs
async function getAllBlogs(req, res) {
  try {
    const blogs = await Blogs.find();

    res.writeHead(200, { "Content-type": "application/json" });
    return res.end(JSON.stringify(blogs));
  } catch (err) {
    res.writeHead(400, { "Content-type": "application/json" });
    res.end(JSON.stringify(err));
  }
}

// @desc    Get a specific Blog
// @route   /api/blog/{blog ID}
async function getSpecificBlog(req, res, blogId) {
  try {
    const blog = await Blogs.findById(blogId);

    if (!blog) {
      res.writeHead(400, { "Content-type": "application/json" });
      return res.end(JSON.stringify({ err: "blog does not exists" }));
    }

    res.writeHead(200, { "Content-type": "application/json" });
    return res.end(JSON.stringify(blog));
  } catch (err) {
    res.writeHead(400, { "Content-type": "application/json" });
    res.end(JSON.stringify(err));
  }
}
// @desc    Get all the blogs related to a user
// @route   /api/blogs/{username}
async function getAllUserBlogs(req, res, userId) {
  try {
    const blogs = await Blogs.find({
      "author.userId": userId,
    });

    if (!blogs) {
      res.writeHead(400, { "Content-type": "application/json" });
      res.end(JSON.stringify({ err: "blog does not exists" }));
    }

    res.writeHead(200, { "Content-type": "application/json" });
    res.end(JSON.stringify(blogs));
  } catch (err) {
    res.writeHead(400, { "Content-type": "application/json" });
    res.end(JSON.stringify(err));
  }
}

async function createBlog(req, res) {
  try {
    const { title, description, category, thumbnail } = await getBodyData(req);
    if (!title || !description || !category || !thumbnail) {
      return SendErrorResponce(res, "Please fill all fields");
    }
    const user = await ValidateAuth(req);
    if (!user) {
      return SendErrorResponce(res, "Invalid authentication");
    }
    const newBlogData = {
      title,
      description,
      category,
      thumbnail,
      author: {
        userId: user._id.toString(),
        username: user.username,
        profession: user.profession,
        avatar: user.avatar,
      },
    };

    const newBlog = await new Blogs(newBlogData);

    newBlog.save();

    res.writeHead(201, { "Content-type": "application/json" });
    return res.end(JSON.stringify({ msg: "Blog created!", newBlog }));
  } catch (error) {
    return SendErrorResponce(res, error.message);
  }
}

async function updateBlog(req, res) {
  try {
    const { id, title, description, category, thumbnail } = await getBodyData(
      req
    );

    if (!id) {
      return SendErrorResponce(res, "Please select a blog to update");
    }

    const user = await ValidateAuth(req);

    if (!user) {
      return SendErrorResponce(res, "Invalid authentication");
    }

    const blog = await Blogs.findById(id);

    if (!blog) {
      return SendErrorResponce(res, "Blog does not exists.");
    }

    if (blog.author.userId !== user._id.toString()) {
      return SendErrorResponce(res, "Access denied");
    }

    const newBlog = {
      title: title ?? blog.title,
      description: description ?? blog.description,
      category: category ?? blog.category,
      thumbnail: thumbnail ?? blog.thumbnail,
    };

    await Blogs.findByIdAndUpdate(id, newBlog);

    res.writeHead(201, { "Content-type": "application/json" });
    return res.end(JSON.stringify({ msg: "Blog updated!" }));
  } catch (error) {
    return SendErrorResponce(res, error.message);
  }
}

async function deleteBlog(req, res) {
  try {
    const { blogid: id } = await getBodyData(req);

    if (!id) {
      return SendErrorResponce(res, "Please Select a blog to delete.");
    }
    const user = await ValidateAuth(req);

    if (!user) {
      return SendErrorResponce(res, "Invalid authentication");
    }

    const blog = await Blogs.findById(id);
    if (!blog) {
      return SendErrorResponce(res, "Blog does not exists.");
    }

    if (blog.author.userId !== user._id.toString()) {
      return SendErrorResponce(res, "Access denied");
    }

    await Blogs.findByIdAndDelete(id);

    res.writeHead(200, { "Content-type": "application/json" });
    return res.end(JSON.stringify({ msg: "Blog deleted successfully!" }));
  } catch (error) {
    return SendErrorResponce(res, error.message);
  }
}

async function createComment(req, res) {
  try {
    const { blogId, comment } = await getBodyData(req);

    if (!blogId || !comment) {
      return SendErrorResponce(res, "Invalid request!");
    }

    const user = await ValidateAuth(req);

    if (!user) {
      return SendErrorResponce(res, "Invalid authentication");
    }

    const blog = await Blogs.findById(blogId);
    if (!blog) {
      return SendErrorResponce(res, "Blog does not exists.");
    }

    const newCommentData = {
      id: uuidv4(),
      comment,
      commentOwner: {
        id: user._id.toString(),
        username: user.username,
        profession: user.profession,
        avatar: user.avatar,
      },
      createdAt: Date.now(),
    };

    await Blogs.updateOne(
      { _id: blogId },
      {
        $push: {
          comments: {
            $each: [newCommentData],
            $position: 0,
          },
        },
      }
    );

    res.writeHead(200, { "Content-type": "application/json" });
    return res.end(
      JSON.stringify({
        msg: "Comment added successfully!",
        createdComment: newCommentData,
      })
    );
  } catch (error) {
    return SendErrorResponce(res, error.message);
  }
}

async function searchBlog(req, res, query) {
  try {
    console.log(query);
    var re = new RegExp(`${query}`, "gi");
    const blogs = await Blogs.find({
      title: { $regex: re },
    });

    res.writeHead(200, { "Content-type": "application/json" });
    return res.end(JSON.stringify({ msg: blogs }));
  } catch (error) {
    return SendErrorResponce(res, error.message);
  }
}

export {
  getAllBlogs,
  getSpecificBlog,
  getAllUserBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  createComment,
  searchBlog,
};
