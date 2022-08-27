const { StatusCodes } = require("http-status-codes");
const userModel = require("../../../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const signInFun = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      res.json({ message: "You Should Register Firstly ...!" });
    } else {
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        const token = jwt.sign(
          { _id: user._id, email: user.email, role: user.role },
          process.env.PRIVATE_KEY
        );
        res.status(StatusCodes.OK).json({
          message: "success",
          token,
          user: {
            _id: user._id,
            userName: user.userName,
            email: user.email,
          },
        });
      } else {
        res.json({ message: "Incorrect Password ...!" });
      }
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "error", error });
  }
};

module.exports = signInFun;
