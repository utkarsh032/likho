//  Imported required modules
import express from 'express'
import { CreateBlog, DeleteBlog, GetAllBlogs, GetBlogById, UpdateBlog } from '../controllers/blogController.js';
import { authenticateUser } from '../middlewares/authMiddleware.js';

//  Created router
const blogRoutes = express.Router()

//  Protected blog creation route
blogRoutes.post("/create-blog", authenticateUser, CreateBlog)
blogRoutes.put('/update-blog/:id', authenticateUser, UpdateBlog);
blogRoutes.delete('/delete-blog/:id', authenticateUser, DeleteBlog);
blogRoutes.get('/get-blog/:id', GetBlogById);
blogRoutes.get('/all-blogs', GetAllBlogs);

//  Exported routes
export default blogRoutes;
