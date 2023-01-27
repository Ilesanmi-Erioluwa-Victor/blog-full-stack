const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
// User Schema
const userSchema = new mongoose.Schema(
  {
    firstName: {
      required: [true, "First name is required"],
      type: String,
    },

    lastName: {
      required: [true, "Last name is required"],
      type: String,
    },

    profilePhoto: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2016/04/01/10/04/amusing-1299756_960_720.png",
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },

    bio: {
      type: String,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    postCount: {
      type: Number,
      default: 0,
    },

    isBlocked: {
      type: Boolean,
      default: false,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    role: {
      type: String,
      enum: ["Admin", "Blogger", "Guest"],
    },

    isFollowing: {
      type: Boolean,
      default: false,
    },

    isUnFollowing: {
      type: Boolean,
      default: false,
    },

    isAccountVerified: {
      type: Boolean,
      default: false,
    },

    accountVerificationToken: {
      type: String,
    },

    accountVerificationTokenExpires: {
      type: Date,
    },

    viewedBy: {
      type: [
        //  Referencing..,
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },

    followers: {
      type: [
        //  Referencing..,
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },

    following: {
      type: [
        //  Referencing..,
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },

    passwordChangeAt: {
      type: Date,
    },

    passwordResetToken: {
      type: String,
    },

    passwordResetExpires: {
      type: Date,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  // Object used here for populating the referenced users above
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


// Virtual Methods to populate created post 
userSchema.virtual("posts", {
  //  ref for referencing your schema
  ref : "Post",
  foreignField : "user",
  localField : "_id"
})

// Hashing of Password
userSchema.pre("save", async function (next) {
  // isModified mongoose function
  // Check for if password !isModified, run the below code if yes, run this code
  if (!this.isModified("password")) {
    next();
  }
  //   Hash Password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Verify account method...
userSchema.methods.createAccountVerificationToken = async function () {
  // create a token
  const verificationToken = crypto.randomBytes(32).toString("hex");
  this.accountVerificationToken = crypto
    .createHash("sha256")
    .update(verificationToken)
    .digest("hex");

  // Token expires in 10 minutes.
  this.accountVerificationTokenExpires = Date.now() + 30 * 60 * 1000;

  return verificationToken;
};
// Method for Password checking
// This method is available in all this model..
userSchema.methods.isPasswordMatched = async function (userPassword) {
  return await bcrypt.compare(userPassword, this.password);
};

// Forget Password / Reset
userSchema.methods.createPasswordResetToken = async function () {
  // Create a token for password reset
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Token expires in 10 minutes.
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000;

  return resetToken;
};

// Compile Schema into Model
const User = mongoose.model("User", userSchema);

module.exports = User;
