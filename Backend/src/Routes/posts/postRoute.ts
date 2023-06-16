import express from 'express';
import {
  CreatePostCtrl,
  GetAllPostsCtrl,
  GetPostCtrl,
  UpadatePostCtrl,
  DeletPostCtrl,
  LikePostCtrl,
  DislikePostCtrl,
} from '../../Controller/posts/postCtrl';
import { AuthMiddleWare } from '../../middlewares/Auth/AuthMiddleware';

const postRoute = express.Router();

postRoute.post('/', AuthMiddleWare, CreatePostCtrl);
postRoute.put('/likes', AuthMiddleWare, LikePostCtrl);
postRoute.put('/dislikes', AuthMiddleWare, DislikePostCtrl);
postRoute.get('/', GetAllPostsCtrl);
postRoute.get('/:id', GetPostCtrl);
postRoute.put('/:id', AuthMiddleWare, UpadatePostCtrl);
postRoute.delete('/:id', AuthMiddleWare, DeletPostCtrl);

module.exports = postRoute;
