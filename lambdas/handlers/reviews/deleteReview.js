import { handlerResponse, client } from '../../libs';

export const remove = async event => {
  try {
    const {
      pathParameters: { id, reviewId }
    } = event;

    // fetch restaurant from db then find the index of the review we need to delete
    const restaurant = await client.get({
      TableName: process.env.restaurantTable,
      Key: { id }
    });

    if (restaurant) {
      const indexToRemove = restaurant.Item.reviews.findIndex(
        review => review.id === reviewId
      );

      if (indexToRemove < 0) {
        return handlerResponse(404, 'Could not find review');
      }

      const params = {
        TableName: process.env.restaurantTable,
        Key: { id },
        UpdateExpression: `REMOVE reviews[${indexToRemove}]`,
        ConditionExpression: `reviews[${indexToRemove}].id = :valueToRemove`,
        ExpressionAttributeValues: {
          ':valueToRemove': reviewId
        }
      };

      await client.update(params);
      return handlerResponse(200, 'review deleted');
    } else {
      return handlerResponse(404, 'Could not find review');
    }
  } catch (err) {
    return handlerResponse(500, err.message ?? '');
  }
};
