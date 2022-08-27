const { StatusCodes } = require("http-status-codes");
const userModel = require("../../../model/user.model");

const addAdminFun = async (req, res) => {
  try {
    const { userName, email, password, location, profilePic } = req.body;
    const admin = await userModel.findOne({ email });
    if (admin) {
      res.json({ message: "email is already exist ...!" });
    } else {
      const imageUrl = process.env.IMAGE_URL + req.file.filename;
      const insertAdmin = new userModel({
        userName,
        email,
        password,
        location,
        role:"admin",
        profilePic: imageUrl,
      });
      const newAdmin = await insertAdmin.save();

      res.status(StatusCodes.CREATED).json({ message: "success", newAdmin });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "error", error });
  }
};
module.exports = addAdminFun;
