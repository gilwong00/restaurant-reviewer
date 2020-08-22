import joi from 'joi';
import { v4 } from 'uuid';
import { reviewSchema } from './review';

export const restaurantSchema = joi.object({
  id: joi.string().guid().default(v4()),
  name: joi.string().required(),
  location: joi.string().required(),
  priceRange: joi.number().valid(1, 2, 3).default(1).required(),
  dateAdded: joi.string().default(new Date().toISOString()),
  photoUrl: joi.string(),
  reviews: joi.array().items(reviewSchema).default([]),
  averageRating: joi.number().default(0)
});

export const validateSchema = (restaurant) =>
  restaurantSchema.validate(restaurant);
