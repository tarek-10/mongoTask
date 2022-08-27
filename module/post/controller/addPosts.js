const { StatusCodes } = require("http-status-codes");
const postModel = require("../../../model/post.model");

const addPostfun = async (req, res) => {
  console.log(req.user);
  try {
    const { title, postContent, userID } = req.body;
    if (req.user._id == userID) {
      const post = await postModel.insertMany({ title, postContent, userID });
      res.status(StatusCodes.CREATED).json({ message: "success", post });
    } else {
        res.status(StatusCodes.BAD_REQUEST).json({message:"enter correct userID"})
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "error", error });
  }
};
module.exports = addPostfun;
