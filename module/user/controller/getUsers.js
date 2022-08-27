const { StatusCodes } = require("http-status-codes");
const userModel = require("../../../model/user.model");

const getAllUsersFun = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(StatusCodes.OK).json({ message: "success", users });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "error", error });
  }
};
module.exports = getAllUsersFun;
