import joi from 'joi';
import { v4 } from 'uuid';

export const reviewSchema = joi.object({
  id: joi.string().guid().default(v4()),
  name: joi.string(),
  review: joi.string(),
  rating: joi.number().valid(1, 2, 3, 4, 5)
});

export const validateReview = (review) => reviewSchema.validate(review);
