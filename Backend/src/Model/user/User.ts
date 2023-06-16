import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';

interface IUser extends Document {
  firstName: string;
  lastName: string;
  profilePhoto: string;
  email: string;
  bio?: string;
  password: string;
  postCount: number;
  isBlocked: boolean;
  isAdmin: boolean;
  role: 'Admin' | 'Blogger' | 'Guest';
  isFollowing: boolean;
  isUnFollowing: boolean;
  isAccountVerified: boolean;
  accountVerificationToken?: string;
  accountVerificationTokenExpires?: Date;
  viewedBy: mongoose.Types.ObjectId[];
  followers: mongoose.Types.ObjectId[];
  following: mongoose.Types.ObjectId[];
  passwordChangeAt?: Date;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  active: boolean;

  // Virtual method
  posts: any[];
  // Custom methods
  createAccountVerificationToken: () => Promise<string>;
  isPasswordMatched: (userPassword: string) => Promise<boolean>;
  createPasswordResetToken: () => Promise<string>;
}

interface IUserModel extends Model<IUser> {
  emailTaken: (email: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser, IUserModel>(
  {
    firstName: {
      required: [true, 'First name is required'],
      type: String,
    },

    lastName: {
      required: [true, 'Last name is required'],
      type: String,
    },

    profilePhoto: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2016/04/01/10/04/amusing-1299756_960_720.png',
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },

    bio: {
      type: String,
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
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
      enum: ['Admin', 'Blogger', 'Guest'],
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
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    },

    followers: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    },

    following: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
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

userSchema.virtual('posts', {
  ref: 'Post',
  foreignField: 'user',
  localField: '_id',
});

userSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) {
    next();
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

userSchema.statics.emailTaken = async function (email: string) {
  const user = await this.findOne({ email });
  return !!user;
};

userSchema.methods.createAccountVerificationToken = async function () {
  const verificationToken = crypto.randomBytes(32).toString('hex');
  this.accountVerificationToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');

  this.accountVerificationTokenExpires = Date.now() + 30 * 60 * 1000;

  return verificationToken;
};

userSchema.methods.isPasswordMatched = async function (userPassword: string) {
  return await bcrypt.compare(userPassword, this.password);
};

userSchema.methods.createPasswordResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 30 * 60 * 1000;

  return resetToken;
};

export const User: IUserModel = mongoose.model<IUser, IUserModel>(
  'User',
  userSchema
);
