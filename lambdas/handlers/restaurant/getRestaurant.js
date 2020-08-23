import { handlerResponse, client } from '../../libs';

export const get = async event => {
  try {
    const params = {
      TableName: process.env.restaurantTable,
      Key: {
        id: event.pathParameters.id
      }
    };

    // todo get image from s3
    const res = await client.get(params);

    if (!res || !res.Item) {
      return handlerResponse(
        404,
        `Could not find todo with id ${event.pathParameters.id}`
      );
    }

    return handlerResponse(200, res.Item);
  } catch (err) {
    return handlerResponse(500, err.message ?? '');
  }
};
