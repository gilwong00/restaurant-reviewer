import joi from '@hapi/joi';

export const restaurantSchema = joi.object({
  name: joi.string().required(),
  location: joi.string().required(),
  priceRange: joi.number().default(1).required(),
  dateAdded: joi.string().default(new Date().toISOString()),
  photoUrl: joi.string()
});

export const validateSchema = (restaurant) =>
  restaurantSchema.validate(restaurant);
