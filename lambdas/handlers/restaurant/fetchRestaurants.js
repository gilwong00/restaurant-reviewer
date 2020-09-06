import { handlerResponse, client } from '../../libs';
const LIMIT = 10;

const round = value => {
  const inv = 1.0 / 0.5;
  return Math.round(value * inv) / inv;
};

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
      const reviewTotal = item.reviews.reduce(
        (acc, value) => (acc += value.rating),
        0
      );
      item.averageRating = round(reviewTotal / item.reviews.length);
      return item;
    });

    return handlerResponse(200, payload);
  } catch (err) {
    return handlerResponse(500, err.message ?? '');
  }
};
