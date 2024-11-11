import Joi from "joi";

export const register = Joi.object({
  username: Joi.string().max(30).required(),
  role: Joi.string().valid("admin", "user").default("user"),
  password: Joi.string().min(8).required(),
});

export const login = Joi.object({
  username: Joi.string().max(30).required(),
  password: Joi.string().min(8).required(),
});

/* export const validateLogin = (user) => {
  const Schema = Joi.object().keys({
    email: Joi.string().string().max(30).required(),
    password: Joi.string().min(8).required(),
  });

  return Schema.validate(user);
}; */
