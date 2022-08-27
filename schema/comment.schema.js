const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content:{
    type:String,
    required:true
  },
  userID:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  }
},{
    timestamps:true
})

module.exports = commentSchema;