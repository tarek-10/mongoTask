const Joi = require("joi");

module.exports = {
    addCommentSchema:{
        body:Joi.object().required().keys({
           content:Joi.string().required(),
            userID:Joi.string().required(),
            postID:Joi.string().required(),
           
        })
    }
}