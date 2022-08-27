const { StatusCodes } = require("http-status-codes");
const userModel = require("../../../model/user.model");
const jwt = require("jsonwebtoken");
const verifyUserFun = async (req, res) => {
  try {
    const { token } = req.params;
    if (token) {
      const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
      const user = await userModel.findOne({ email: decoded.email });

      if (!user) {
        res
          .status(StatusCodes.NOT_FOUND)
          .json({ message: "register firstly...!" });
      } else {
        if (user.confirmed == true) {
          res.json({ message: "user is already confirmed before...!" });
        } else {
          const confirmUser = await userModel.findOneAndUpdate(
            { email: user.email },
            { confirmed: true },
            { new: true }
          );
          res
            .status(StatusCodes.OK)
            .json({ message: "user confirmed successfully ...!", confirmUser });
        }
      }
    } else {
      res.json({ message: "user not found you must register firstly...!" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "error", error });
  }
};
module.exports = verifyUserFun;
