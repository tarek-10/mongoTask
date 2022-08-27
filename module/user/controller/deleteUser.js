const { StatusCodes } = require("http-status-codes");
const userModel = require("../../../model/user.model");

const deleteUserFun = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userModel.findOne({ _id: id });

    if (user) {
      const deletedUser = await userModel.findOneAndDelete({ _id: id });
      res.status(StatusCodes.OK).json({ message: "success", deletedUser });
    } else {
      res.json({ message: "in-valid user ...!" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "error", error });
  }
};
module.exports = deleteUserFun;
