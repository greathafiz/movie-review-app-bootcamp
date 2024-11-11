import Joi, { date } from "joi";

export const review = Joi.object({
  // reviewerName: Joi.string().required(),
  comment: Joi.string().optional(),
  rating: Joi.number().min(1).max(5).required(),
  movie: Joi.Joi.object({
    id: Joi.string().hex().length(24),
  }).required(),
  date: Joi.date().default(Date.now()),
});
