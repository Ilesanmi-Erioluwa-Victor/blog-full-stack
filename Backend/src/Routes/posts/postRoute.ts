import express from 'express';
import {
  CreatePostCtrl,
  GetAllPostsCtrl,
  GetPostCtrl,
  UpdatePostCtrl,
  DeletePostCtrl,
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
postRoute.put('/:id', AuthMiddleWare, UpdatePostCtrl);
postRoute.delete('/:id', AuthMiddleWare, DeletePostCtrl);

export default postRoute;
