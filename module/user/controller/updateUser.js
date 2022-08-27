const { StatusCodes } = require("http-status-codes");
const userModel = require("../../../model/user.model");

const updateUsersFun = async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const user = await userModel.findOne({ _id: id });

    if (user) {
    
        if (body.password) {
            const salt = await bcrypt.genSalt(10);
            body.password = await bcrypt.hash(body.password, salt);
        }
        imageUrl = process.env.IMAGE_URL + req.file.filename;
        const updatedUsers = await userModel.findOneAndUpdate({
            _id: user._id
        }, {
            $set: body,
            profilePic:imageUrl
        }, {
            new: true
        });
      res.status(StatusCodes.OK).json({ message: "success", updatedUsers });
    } else {
      res.json({ message: "in-valid user" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "error", error });
  }
};
module.exports = updateUsersFun;
