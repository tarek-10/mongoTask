const { StatusCodes } = require("http-status-codes");
const postModel = require("../../../model/post.model");

const getPostsFun = async (req, res) => {
  try {
    const { userID } = req.params;

    const post = await postModel
      .find({ userID })
      .populate("userID",["-password " , "-role"] )
    res.status(StatusCodes.OK).json({ message: "success", post });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "error", error });
  }
};
module.exports = getPostsFun;
