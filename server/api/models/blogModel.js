import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
  blog_id: {
    type: String,
    required: true,
    unique: true
  },

  title: {
    en: { type: String, required: true },
    hi: { type: String }
  },

  blogContent: {
    en: { type: String, required: true },
    hi: { type: String }
  },

  tags: [{ type: String }],

  category: { type: String },

  coverImage: { type: String },

  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  activity: {
    total_likes: { type: Number, default: 0 },
    total_comments: { type: Number, default: 0 },
    total_reads: { type: Number, default: 0 },
    total_parent_comments: { type: Number, default: 0 },
  },

  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],

  draft: {
    type: Boolean,
    default: false
  },

  readTime: {
    type: Number,
    default: 0 // in minutes
  },

  isPublished: {
    type: Boolean,
    default: false
  },

  views: {
    type: Number,
    default: 0
  }

}, {
  timestamps: true
})

// Model
const Blog = mongoose.model('Blog', blogSchema)
export default Blog
