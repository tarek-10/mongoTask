const Joi = require("joi");

module.exports = {
  signUpSchema: {
    body: Joi.object()
      .required()
      .keys({
        userName: Joi.string().required(),
        email: Joi.string().required().email(),
        password: Joi.string().min(3).max(15).required().label("Password"),
        password_confirmation: Joi.any()
          .equal(Joi.ref("password"))
          .required()
          .label("Confirm password")
          .options({
            messages: {
              "any.only": "{{#label}} does not match",
            },
          }),
        location: Joi.string().required(),
      }),
    file: Joi.object().optional(),
  },

  siginInSchema: {
    body: Joi.object().required().keys({
      email: Joi.string().required(),
      password: Joi.string().required(),
    }),
  },
  userDeleteSchema: {
    params: Joi.object().required().keys({
      id: Joi.string().required(),
    }),
  },
  userUpdateSchema: {
    params: Joi.object().required().keys({
      id: Joi.string().required(),
    }),
    body: Joi.object()
      .required()
      .keys({
        userName: Joi.string().optional(),
        email: Joi.string().optional().email(),
        password: Joi.string().min(3).max(15).optional().label("Password"),
        password_confirmation: Joi.any()
          .equal(Joi.ref("password"))
          .optional()
          .label("Confirm password")
          .options({
            messages: {
              "any.only": "{{#label}} does not match",
            },
          }),
        location: Joi.string().optional(),
      }),
    file: Joi.object().optional(),
  },
  verifyUserSchema:{
    params:Joi.object().required().keys({
        token:Joi.string().required(),
     
    })
  }
};
