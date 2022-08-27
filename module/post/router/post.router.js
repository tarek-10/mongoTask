const express = require("express");
const handleValidation = require("../../../middleware/handleValidation");
const isAuthorized = require("../../../middleware/isAuthorized");
const { ADD_POSTS } = require("../endPoints");
const { addPostSchema } = require("../joi/post.validation");

const router = express.Router();

//add post
const addPostfun = require("../controller/addPosts");
router.post(
  "/post/add",
  handleValidation(addPostSchema),
  isAuthorized(ADD_POSTS),
  addPostfun
);
//end

//GET USER POSTS
const getPostsFun = require("../controller/getPosts");
router.get("/post/display/:userID", getPostsFun);
//END

module.exports = router;
