import expressAsyncHandler from 'express-async-handler';
import { Request } from 'express';
import Category from './Category';
import ValidateMongoDbId from '../../Utils/ValidateMongoDbId';

interface CustomRequest extends Request {
  AuthId?: string;
}

export const CreateCategoryCtrl = expressAsyncHandler(
  async (req: CustomRequest, res) => {
    try {
      const category = await Category.create({
        user: req.AuthId,
        title: req?.body?.title,
      });
      res.json(category);
    } catch (error: any) {
      res.json(error.message);
    }
  }
);

export const GetAllCategoryCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const category = await Category.find({})
      .populate('user')
      .sort('-createdAt');
    res.json(category);
  } catch (error: any) {
    res.json(error.message);
  }
});

export const GetCategoryCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  ValidateMongoDbId(id);
  try {
    const category = await Category.findById(id)
      .populate('user')
      .sort('-createdAt');
    res.json(category);
  } catch (error: any) {
    res.json(error.message);
  }
});

export const UpdateCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  ValidateMongoDbId(id);
  try {
    const category = await Category.findByIdAndUpdate(
      id,
      {
        title: req?.body?.title,
      },
      { new: true, runValidators: true }
    );
    res.json(category);
  } catch (error: any) {
    res.json(error.message);
  }
});

export const DeleteCategoryCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  ValidateMongoDbId(id);
  try {
    const category = await Category.findByIdAndDelete(id);
    res.json(category);
  } catch (error: any) {
    res.json(error.message);
  }
});
