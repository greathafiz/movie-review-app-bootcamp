import Joi from "joi";

export const movie = Joi.object({
  title: Joi.string().required(),
  director: Joi.string().required(),
  genre: Joi.string().required(),
  releaseYear: Joi.number().required(),
});
