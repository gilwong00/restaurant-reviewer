import { handlerResponse, client } from '../../libs';
import { getAverageRating } from '../../utils/getAverageRaging';

export const get = async event => {
  try {
    const params = {
      TableName: process.env.restaurantTable,
      Key: {
        id: event.pathParameters.id
      }
    };

    // todo get image from s3
    const { Item } = await client.get(params);

    if (!Item) {
      return handlerResponse(
        404,
        `Could not find todo with id ${event.pathParameters.id}`
      );
    }

    return handlerResponse(200, {
      ...Item,
      averageRating: getAverageRating(Item)
    });
  } catch (err) {
    return handlerResponse(500, err.message ?? '');
  }
};
