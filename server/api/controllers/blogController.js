import Blog from "../models/blogModel.js"
import { v4 as uuidv4 } from 'uuid'

export const CreateBlog = async (req, res) => {
  try {
    const { title, blogContent, tags, category, coverImage, readTime, draft } = req.body;

    if (!title || !blogContent) {
      return res.status(400).json({ message: "Title and blog content are required" });
    }

    const newBlog = new Blog({
      blog_id: uuidv4(), title, blogContent, tags, category, coverImage, author: req.user.id, readTime, draft, isPublished: !draft
    });

    await newBlog.save();

    res.status(201).json({
      message: "Blog created successfully",
      blog: newBlog
    });

  } catch (error) {
    console.error("Blog creation error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
}



// UpdateBlog
export const UpdateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({ message: 'Blog updated successfully', blog: updatedBlog });
  } catch (error) {
    console.error('Update Blog Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


// Delete Blog
export const DeleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Delete Blog Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


// Get blog by id
export const GetBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id).populate('author', 'name email');

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    res.status(200).json({ blog });
  } catch (error) {
    console.error('Get Blog Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};


// Get All Blogs
export const GetAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }).populate('author', 'name');

    res.status(200).json({ blogs });
  } catch (error) {
    console.error('Get All Blogs Error:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};
