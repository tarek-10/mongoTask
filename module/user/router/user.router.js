const express = require("express");
const handleValidation = require("../../../middleware/handleValidation");
const upload = require("../../../middleware/multer");

const router = express.Router();
const { DELETE_USER, UPDATE_USER } = require("../endPoints");
const isAuthorized = require("../../../middleware/isAuthorized");

const {
  signUpSchema,
  siginInSchema,
  userDeleteSchema,
  userUpdateSchema,
  uverifyUserSchema,
  verifyUserSchema,
} = require("../joi/user.validation");

// sign up user
const signUpFun = require("../controller/addUser");
router.post(
  "/user/signup",
  upload.single("image"),
  handleValidation(signUpSchema),
  signUpFun
);
//end

//sign up admin
const addAdminFun = require("../controller/addAdmin");
router.post(
  "/admin/signup",
  upload.single("image"),
  handleValidation(signUpSchema),
  addAdminFun
);
//end

//sign in
const signInFun = require("../controller/siginUser");
router.post("/user/signin", handleValidation(siginInSchema), signInFun);
//end

//get all user
const getAllUsersFun = require("../controller/getUsers");
router.get("/user/display", getAllUsersFun);
//end

//delete user
const deleteUserFun = require("../controller/deleteUser");
router.delete(
  "/user/delete/:id",
  handleValidation(userDeleteSchema),
  isAuthorized(DELETE_USER),
  deleteUserFun
);
//end

//update user
const updateUsersFun = require("../controller/updateUser");
router.patch(
  "/user/update/:id",
  upload.single("image"),
  handleValidation(userUpdateSchema),
  isAuthorized(UPDATE_USER),
  updateUsersFun
  );
  //end
  
  //verify user
  const verifyUserFun = require("../controller/verifyUser");
router.get("/verify/:token",handleValidation(verifyUserSchema),verifyUserFun)
//end

module.exports = router;
