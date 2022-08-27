const express = require("express");
const handleValidation = require("../../../middleware/handleValidation");
const isAuthorized = require("../../../middleware/isAuthorized");
const { ADD_COMMENT } = require("../endPoints");
const { addCommentSchema } = require("../joi/comment.validation");

const router = express.Router();

//add comments
const addCommentsFun = require("../controller/addComment");
router.post(
  "/comment/add",
  handleValidation(addCommentSchema),
  isAuthorized(ADD_COMMENT),
  addCommentsFun
);
//end
module.exports = router;
