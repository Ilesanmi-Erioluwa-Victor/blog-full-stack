const expressAsyncHandler = require("express-async-handler");
const SgMail = require("@sendgrid/mail");
const Filter = require("bad-words");
const EmailMsg = require("../../Model/EmailMsg/EmailMsg");

// __________________________________Create EmailMessageCtrl
const SendEmailCtrl = expressAsyncHandler( async(req, res) => {
     const { to, subject, message } = req.body;
  //get the message
  const emailMessage = `${subject} ${message}`;
  //prevent profanity/bad words
  const filter = new Filter();

  const isProfane = filter.isProfane(emailMessage);
  if (isProfane)
    throw new Error("Email sent failed, because it contains profane words.");
  try {
    //buld up msg
    const msg = {
      to,
      subject,
      text: message,
      from: "ericjay1452@gmail.com",
    };
    //send msg
    await SgMail.send(msg);
    //save to our db
    await EmailMsg.create({
      sentBy: req?.user?._id,
      from: req?.user?.email,
      to,
      message,
      subject,
    });
    res.json("Mail sent");
   } catch (error) {
    res.json(error.message)
   }
})


module.exports = {
SendEmailCtrl
}