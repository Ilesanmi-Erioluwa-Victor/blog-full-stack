const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../../Model/user/User");

const AuthMiddleWare = expressAsyncHandler(async (req, res, next) => {
  let token;

  try {
    if (req?.headers?.authorization.startsWith("Bearer")) {
      token = req?.headers?.authorization.split(" ")[1];

      if (token) {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        //  Find user by Id...
        const user = await User.findById(decoded?.id).select("-password");
        // Attch user to the request object.
        req.user = user;
        next();
      } else {
        throw new Error(
          res.json("There is no token attached to your header, try again.")
        );
      }
    } else {
      throw new Error(
        `Sorry, there is no token attached to your Header, try again by attaching Token..`
      );
    }
  } catch (error) {
    throw new Error("Sorry No token attached");
  }
});

module.exports = AuthMiddleWare;
