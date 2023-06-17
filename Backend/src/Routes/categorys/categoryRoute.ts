import express from 'express';
import {
  CreateCategoryCtrl,
  GetAllCategoryCtrl,
  GetCategoryCtrl,
  UpdateCategory,
  DeleteCategoryCtrl,
} from '../../Model/category/categoryCtrl';
import { AuthMiddleWare } from '../../middlewares/Auth/AuthMiddleware';

const categoryRoute = express.Router();

categoryRoute.post('/', AuthMiddleWare, CreateCategoryCtrl);
categoryRoute.get('/', AuthMiddleWare, GetAllCategoryCtrl);
categoryRoute.get('/:id', AuthMiddleWare, GetCategoryCtrl);
categoryRoute.put('/:id', AuthMiddleWare, UpdateCategory);
categoryRoute.delete('/:id', AuthMiddleWare, DeleteCategoryCtrl);

export default categoryRoute;
