import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    personal_info: {
      fullname: {
        type: String,
        required: true,
        minlength: [3, 'Full name must be at least 3 characters long'],
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
      },
      username: {
        type: String,
        required: true,
        unique: true,
        minlength: [3, 'Username must be at least 3 characters long'],
      },
      bio: {
        type: String,
        maxlength: [200, 'Bio should not exceed 200 characters'],
        default: "",
      },
      role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
      },
      profile_img: {
        type: String,
        default: "",
      },
    },

    social_links: {
      youtube: { type: String, default: "" },
      instagram: { type: String, default: "" },
      facebook: { type: String, default: "" },
      twitter: { type: String, default: "" },
      github: { type: String, default: "" },
      website: { type: String, default: "" },
    },

    account_info: {
      total_posts: { type: Number, default: 0 },
      total_reads: { type: Number, default: 0 },
    },

    google_auth: {
      type: Boolean,
      default: false,
    },

    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
        default: [],
      }
    ],

    bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog',
      }
    ],

    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      }
    ],

    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      }
    ],

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: 'joinedAt',
      updatedAt: 'updatedAt',
    },
  }
);

const User = mongoose.model("User", userSchema);
export default User;
