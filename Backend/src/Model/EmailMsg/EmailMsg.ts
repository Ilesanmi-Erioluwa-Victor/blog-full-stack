import mongoose, { Document, Model, Schema, Types } from 'mongoose';

interface IEmailMsg extends Document {
  from: string;
  to: string;
  message: string;
  subject: string;
  sentBy: Types.ObjectId;
  isFlagged: boolean;
}

interface IEmailMsgModel extends Model<IEmailMsg> {}

const emailMsgSchema = new Schema<IEmailMsg, IEmailMsgModel>(
  {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    sentBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    isFlagged: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const EmailMsg: IEmailMsgModel = mongoose.model<IEmailMsg, IEmailMsgModel>(
  'EmailMsg',
  emailMsgSchema
);

export default EmailMsg;
