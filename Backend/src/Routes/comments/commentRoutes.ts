import express from 'express';
import {
  CreateCommentCtrl,
  GetAllCommentsCtrl,
  GetCommentDetailCtrl,
  UpdateCommentCtrl,
  DeleteCommentCtrl,
} from '../../Model/comment/commentCtrl';

import { AuthMiddleWare } from '../../middlewares/Auth/AuthMiddleware';

const commentRoutes = express.Router();

commentRoutes.post('/', AuthMiddleWare, CreateCommentCtrl);
commentRoutes.get('/', AuthMiddleWare, GetAllCommentsCtrl);
commentRoutes.get('/:id', AuthMiddleWare, GetCommentDetailCtrl);
commentRoutes.put('/:id', AuthMiddleWare, UpdateCommentCtrl);
commentRoutes.delete('/:id', AuthMiddleWare, DeleteCommentCtrl);

export default commentRoutes;
