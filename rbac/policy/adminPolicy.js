const { ADD_COMMENT } = require("../../module/comment/endPoints");
const { ADD_POSTS } = require("../../module/post/endPoints");
const {
  GET_ALL_USERS,
  DELETE_USER,
  UPDATE_USER,
} = require("../../module/user/endPoints");

module.exports = [GET_ALL_USERS, DELETE_USER, UPDATE_USER, ADD_POSTS , ADD_COMMENT];
