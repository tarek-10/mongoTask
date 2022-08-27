const commentSchema = require("../schema/comment.schema");

const mongoose = require("mongoose");

const commentModel = mongoose.model("comment", commentSchema);

module.exports = commentModel;
