import { Request } from 'express';
import expressAsyncHandler from 'express-async-handler';
import SgMail from '@sendgrid/mail';
import Filter from 'bad-words';
import EmailMsg from './EmailMsg';

interface CustomRequest extends Request {
  AuthId?: string;
}

export const SendEmailCtrl = expressAsyncHandler(
  async (req: CustomRequest, res) => {
    console.log(req);
    const { to, subject, message } = req.body;
    const emailMessage = `${subject} ${message}`;
    const filter = new Filter();

    const isProfane = filter.isProfane(emailMessage);
    if (isProfane)
      throw new Error('Email sent failed, because it contains profane words.');
    try {
      const msg = {
        to,
        subject,
        text: message,
        from: 'ericjay1452@gmail.com',
      };
      await SgMail.send(msg);
      await EmailMsg.create({
        sentBy: req?.AuthId,
        // from: req?.AuthId,
        to,
        message,
        subject,
      });
      res.json('Mail sent');
    } catch (error: any) {
      res.json(error.message);
    }
  }
);
