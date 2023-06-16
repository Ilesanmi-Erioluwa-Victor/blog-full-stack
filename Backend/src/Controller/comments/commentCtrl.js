const expressAsyncHandler = require("express-async-handler");
const Comment = require("../../Model/comment/Comment");
const ValidateMongoDbId = require("../../Utils/ValidateMongoDbId");

// __________________________________________CreateCommentCtrl
const CreateCommentCtrl = expressAsyncHandler(async (req, res) => {
  // Get the user first from the req.user
  const user = req?.user;
  // get post id
  const { postId } = req?.body;
  ValidateMongoDbId(postId);
  try {
    const comment = await Comment.create({
      post: postId,
      user,
      description: req?.body?.description,
    });
    res.json(comment);
  } catch (error) {
    res.json(error.message);
  }
});

// __________________________________________Getall CommentCtrl
const GetAllCommentsCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const comment = await Comment.find({}).sort("-created");
    res.json(comment);
  } catch (error) {
    res.json(error.message);
  }
});

// __________________________________________Get CommentDetailCtrl
const GetCommentDetailCtrl = expressAsyncHandler(async (req, res) => {
  const { commentId } = req?.params;
  ValidateMongoDbId(commentId);
  try {
    const comment = await Comment.findById(commentId);
    res.json(comment);
  } catch (error) {
    res.json(error.message);
  }
});

// __________________________________________Update CommentCtrl
const UpdateCommentCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  ValidateMongoDbId(id);
  try {
    const comment = await Comment.findByIdAndUpdate(
      id,
      {
        post: req?.body?.postId,
        user: req?.user,
        description: req?.body?.description,
      },
      { new: true, runValidators: true }
    );
    res.json(comment);
  } catch (error) {
    res.json(error.message);
  }
});

// __________________________________________Delete CommentCtrl
const DeleteCommentCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req?.params;
  ValidateMongoDbId(id);
  try {
    const comment = await Comment.findByIdAndDelete(id);
    res.json(comment);
  } catch (error) {
    res.json(error.message);
  }
});
module.exports = {
  CreateCommentCtrl,
  GetAllCommentsCtrl,
  GetCommentDetailCtrl,
  UpdateCommentCtrl,
  DeleteCommentCtrl,
};
