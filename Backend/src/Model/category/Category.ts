import mongoose, { Document, Model, Schema, Types } from 'mongoose';

interface ICategory extends Document {
  user: Types.ObjectId;
  title: string;
}

interface ICategoryModel extends Model<ICategory> {}

const categorySchema = new Schema<ICategory, ICategoryModel>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Category: ICategoryModel = mongoose.model<ICategory, ICategoryModel>(
  'Category',
  categorySchema
);

export default Category;
