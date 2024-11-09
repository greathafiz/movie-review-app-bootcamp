import Joi, { date } from "joi";

export const review = Joi.object({
  reviewerName: Joi.string().required(),
  comment: Joi.string().optional(),
  rating: Joi.number().required(),
  date: Joi.date().default(Date.now()),
});
