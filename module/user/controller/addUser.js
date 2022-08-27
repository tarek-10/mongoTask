const { StatusCodes } = require("http-status-codes");
const senEmail = require("../../../middleware/sendEmail");
const userModel = require("../../../model/user.model");
let jwt = require("jsonwebtoken");

const signUpFun = async (req, res) => {
  try {
    const { userName, email, password, location, profilePic } = req.body;
    const user = await userModel.findOne({ email });
    if (user) {
      res.json({ message: "email already exist ...!" });
    } else {
      const imgUrl = process.env.IMAGE_URL + req.file.filename;
      let token = jwt.sign({ email }, process.env.PRIVATE_KEY);
      const message = `<a href = 'http://localhost:3000/verify/${token}'>Verify Your Acoount</a>`;
      const inserUser = new userModel({
        userName,
        email,
        password,
        location,
        profilePic: imgUrl,
      });
      const newUser = await inserUser.save();
      await senEmail(email, message);
    
      res.status(StatusCodes.CREATED).json({ message: "success", newUser });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "error", error });
  }
};

module.exports = signUpFun;
