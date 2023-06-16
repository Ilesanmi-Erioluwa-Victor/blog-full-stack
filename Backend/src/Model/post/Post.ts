import mongoose, { Document, Model, Schema, Types } from 'mongoose';

interface IPost extends Document {
  title: string;
  category: string;
  isLiked: boolean;
  isDisliked: boolean;
  numViews: number;
  likes: Types.ObjectId[];
  dislikes: Types.ObjectId[];
  user: Types.ObjectId;
  description: string;
  image: string;
}

interface IPostModel extends Model<IPost> {}

const postSchema = new Schema<IPost, IPostModel>(
  {
    title: {
      type: String,
      required: [true, 'Title is required..'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Post category is required..'],
    },
    isLiked: {
      type: Boolean,
      default: false,
    },
    isDisliked: {
      type: Boolean,
      default: false,
    },
    numViews: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    dislikes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Post Author is required..'],
    },
    description: {
      type: String,
      required: [true, 'Post description is required..'],
    },
    image: {
      type: String,
      default:
        'https://cdn.pixabay.com/photo/2023/01/10/07/12/cat-7709087_960_720.jpg',
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

const Post: IPostModel = mongoose.model<IPost, IPostModel>('Post', postSchema);

export default Post;
