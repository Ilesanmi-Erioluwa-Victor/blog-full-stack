import { Request } from 'express';
import expressAsyncHandler from 'express-async-handler';
import Filter from 'bad-words';
import fs from 'fs';
import Post from './Post';
import ValidateMongoDbId from '../../Utils/ValidateMongoDbId';
import { User } from '../user/User';
// import cloudinaryUploadImage from '../../Utils/Cloudinary';

interface CustomRequest extends Request {
  AuthId?: string;
}

export const CreatePostCtrl = expressAsyncHandler(
  async (req: CustomRequest, res) => {
    const _id = req.AuthId;
    const filter = new Filter();
    const profaneWord = filter.isProfane(req?.body?.title);

    const profaneTitle = filter.isProfane(req?.body?.description);

    if (profaneWord || profaneTitle) {
      await User.findByIdAndUpdate(
        _id,
        {
          isBlocked: true,
        },
        { new: true }
      );
      throw new Error(
        'You have been blocked because, your posts contains Profane words..'
      );
    }

    try {
      // const localPath = `public/images/posts/${req.file.filename}`;

      // const UploadImg = await cloudinaryUploadImage(localPath);
      const post = await Post.create({
        ...req?.body,
        // image: UploadImg.url,
        user: _id,
      });
      res.json(post);
    } catch (error: any) {
      res.json(error);
    }
  }
);

export const GetAllPostsCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const posts = await Post.find({}).populate('user');
    res.json(posts);
  } catch (error: any) {
    res.json(error.message);
  }
});

export const GetPostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  ValidateMongoDbId(id);
  try {
    const post = await Post.findById(id)
      .populate('user')
      .populate('dislikes')
      .populate('likes');
    await Post.findByIdAndUpdate(
      id,
      {
        $inc: {
          numViews: 1,
        },
      },
      { new: true }
    );
    res.json(post);
  } catch (error: any) {
    res.json(error.message);
  }
});

export const UpdatePostCtrl = expressAsyncHandler(
  async (req: CustomRequest, res) => {
    const { id } = req.params;
    ValidateMongoDbId(id);
    try {
      const post = await Post.findByIdAndUpdate(
        id,
        {
          ...req?.body,
          user: req.AuthId,
        },
        { new: true }
      );
      res.json(post);
    } catch (error: any) {
      res.json(error.message);
    }
  }
);

export const DeletePostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  ValidateMongoDbId(id);
  try {
    const post = await Post.findByIdAndDelete(id);
    res.json(post);
  } catch (error: any) {
    res.json(error.message);
  }
});

export const LikePostCtrl = expressAsyncHandler(
  async (req: CustomRequest, res) => {
    const { postId } = req.body;
    const post = await Post.findById(postId);
    const loginUserId = req.AuthId;
    const isLiked = post?.isLiked;
    const alreadyDisliked = post?.dislikes?.find(
      (userId: any) => userId.toString() === (loginUserId?.toString() as string)
    );

    if (alreadyDisliked) {
      const post = await Post.findByIdAndUpdate(
        postId,
        {
          $pull: { dislikes: loginUserId },
          isDisLiked: false,
        },
        { new: true }
      );
      res.json(post);
    }

    if (isLiked) {
      const post = await Post.findByIdAndUpdate(
        postId,
        {
          $pull: { likes: loginUserId },
          isLiked: false,
        },
        { new: true }
      );
      res.json(post);
    } else {
      const post = await Post.findByIdAndUpdate(
        postId,
        {
          $push: { likes: loginUserId },
          isLiked: true,
        },
        { new: true }
      );
      res.json(post);
    }
  }
);

export const DislikePostCtrl = expressAsyncHandler(
  async (req: CustomRequest, res) => {
    const { postId } = req.body;
    const post = await Post.findById(postId);
    const loginUserId = req.AuthId;
    const isDisLiked = post?.isDisliked;
    const alreadyLiked = post?.likes?.find(
      (userId: any) => userId.toString() === (loginUserId?.toString() as string)
    );
    if (alreadyLiked) {
      const post = await Post.findOneAndUpdate(
        postId,
        {
          $pull: { likes: loginUserId },
          isLiked: false,
        },
        { new: true }
      );
      res.json(post);
    }
    if (isDisLiked) {
      const post = await Post.findByIdAndUpdate(
        postId,
        {
          $pull: { dislikes: loginUserId },
          isDisLiked: false,
        },
        { new: true }
      );
      res.json(post);
    } else {
      const post = await Post.findByIdAndUpdate(
        postId,
        {
          $push: { dislikes: loginUserId },
          isDisLiked: true,
        },
        { new: true }
      );
      res.json(post);
    }
  }
);
