import { handlerResponse, client } from '../../libs';
import { validateReview } from '../../models/review';

export const add = async event => {
  try {
    const { value, error } = validateReview(
      typeof event.body === 'string' ? JSON.parse(event.body) : event.body ?? {}
    );

    if (error) {
      return handlerResponse(400, error);
    }

    const params = {
      TableName: process.env.restaurantTable,
      Key: { id: event.pathParameters.id },
      ReturnValues: 'ALL_NEW',
      UpdateExpression:
        'set #reviews = list_append(if_not_exists(#reviews, :empty), :newReviews)',
      ExpressionAttributeNames: {
        '#reviews': 'reviews'
      },
      ExpressionAttributeValues: {
        ':newReviews': [value],
        ':empty': []
      }
    };

    const { Attributes } = await client.update(params);
    // update average rating for restaurant

    return handlerResponse(200, Attributes);
  } catch (err) {
    return handlerResponse(500, err.message ?? '');
  }
};
