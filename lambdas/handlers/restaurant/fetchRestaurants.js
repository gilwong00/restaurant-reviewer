import { handlerResponse, client } from '../../libs';
const LIMIT = 10;

export const fetch = async event => {
  const { offset } = event.queryStringParameters;

  try {
    const params = {
      TableName: process.env.restaurantTable,
      Select: 'ALL_ATTRIBUTES',
      Limit: LIMIT,
      // offsetting for pagination
      LastEvaluatedKey: offset ?? 10
    };

    const { Items } = await client.scan(params);

    const payload = Items.map(item => {
      const reviewTotal = items.reviews.reduce(
        (acc, value) => (acc += value.rating),
        0
      );
      item.averageRating = reviewTotal / items.reviews.length;
      return item;
    });

    return handlerResponse(200, payload);
  } catch (err) {
    return handlerResponse(500, err.message ?? '');
  }
};
