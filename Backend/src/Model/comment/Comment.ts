const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Post",
        required : [true, "Post is requird"],
    },

       user : {
        type : Object,
        required : [true, "User is requird"],
    },
    description : {
        type : String,
        required : [true, "Description is requird"],
    }
},{timestamps : true});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;