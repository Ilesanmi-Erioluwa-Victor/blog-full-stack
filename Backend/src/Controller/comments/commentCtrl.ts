import expressAsyncHandler from 'express-async-handler';
import Comment from '../../Model/comment/Comment';
import ValidateMongoDbId from '../../Utils/ValidateMongoDbId';

export const CreateCommentCtrl = expressAsyncHandler(async (req, res) => {
  const user = req.AuthId;
  const { postId } = req?.body;
  ValidateMongoDbId(postId);
  try {
    const comment = await Comment.create({
      post: postId,
      user,
      description: req?.body?.description,
    });
    res.json(comment);
  } catch (error: any) {
    res.json(error.message);
  }
});

export const GetAllCommentsCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const comment = await Comment.find({}).sort('-created');
    res.json(comment);
  } catch (error: any) {
    res.json(error.message);
  }
});

export const GetCommentDetailCtrl = expressAsyncHandler(async (req, res) => {
  const { commentId } = req?.params;
  ValidateMongoDbId(commentId);
  try {
    const comment = await Comment.findById(commentId);
    res.json(comment);
  } catch (error: any) {
    res.json(error.message);
  }
});

export const UpdateCommentCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  ValidateMongoDbId(id);
  try {
    const comment = await Comment.findByIdAndUpdate(
      id,
      {
        post: req?.body?.postId,
        user: req.AuthId,
        description: req?.body?.description,
      },
      { new: true, runValidators: true }
    );
    res.json(comment);
  } catch (error: any) {
    res.json(error.message);
  }
});

export const DeleteCommentCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  ValidateMongoDbId(id);
  try {
    const comment = await Comment.findByIdAndDelete(id);
    res.json(comment);
  } catch (error: any) {
    res.json(error.message);
  }
});
