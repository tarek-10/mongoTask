const Joi = require("joi");

module.exports = {
    addPostSchema:{
        body:Joi.object().required().keys({
            title:Joi.string().required(),
            postContent:Joi.string().required(),
            userID:Joi.string().required()
        })
    }
}