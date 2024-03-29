import express from 'express';
import { SendEmailCtrl } from '../../Model/EmailMsg/emailMsgCtrl';
import { AuthMiddleWare } from '../../middlewares/Auth/AuthMiddleware';
const emailRoutes = express.Router();

emailRoutes.post('/', AuthMiddleWare, SendEmailCtrl);

export default emailRoutes;
