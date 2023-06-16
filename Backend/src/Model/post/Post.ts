const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required.."],
      trim: true,
    },
    //   Only admin can create category
    category: {
      type: String,
      required: [true, "Post category is required.."],
      // default: "All",
    },

    isLiked: {
      type: Boolean,
      default: false,
    },

    isDisLiked: {
      type: Boolean,
      default: false,
    },

    numViews: {
      type: Number,
      default: 0,
    },
    //   Referencing to User Model
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    //   Referencing to User Model
    disLikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Post Author is required.. "],
    },
    description: {
      type: String,
      required: [true, "Post description is required.. "],
    },
    image: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2023/01/10/07/12/cat-7709087_960_720.jpg",
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);

// Compile to form Model
const Post = mongoose.model("Post", postSchema);

module.exports = Post;
