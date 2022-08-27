const { StatusCodes } = require("http-status-codes");
const commentModel = require("../../../model/comment.model");
const postModel = require("../../../model/post.model");

const addCommentsFun = async (req, res) => {
  try {
    const { content, userID, postID } = req.body;
    const post = await postModel.findById({ _id: postID });
    console.log(post, "---------------------------");
    if (req.user._id == userID) {
      const comment = new commentModel({
        content,
        userID,
      });

      const newComment = await comment.save();
      if (post) {
        let postComments = [...post.comments, newComment._id];
        console.log(postComments);
        const updatedPOstsComments = await postModel.findByIdAndUpdate(
          { _id: post._id },
          {
            comments: postComments,
          },
          { new: true }
        );
        res
          .status(StatusCodes.CREATED)
          .json({ message: "success", updatedPOstsComments });
      } else {
        res.status(StatusCodes.NOT_FOUND).json({ message: "post not found" });
      }
    } else {
      res.json({ message: "you should enter CORRECT userID" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "error", error });
  }
};
module.exports = addCommentsFun;
