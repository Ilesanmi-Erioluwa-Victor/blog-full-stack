import mongoose, { Document, Model, Schema, Types } from 'mongoose';

interface IComment extends Document {
  post: Types.ObjectId;
  user: object;
  description: string;
}

interface ICommentModel extends Model<IComment> {}

const commentSchema = new Schema<IComment, ICommentModel>(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      required: [true, 'Post is required'],
    },
    user: {
      type: Object,
      required: [true, 'User is required'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
  },
  { timestamps: true }
);

const Comment: ICommentModel = mongoose.model<IComment, ICommentModel>(
  'Comment',
  commentSchema
);

export default Comment;
