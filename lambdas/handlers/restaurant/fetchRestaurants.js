import { handlerResponse, client } from '../../libs';
import { getAverageRating } from '../../utils/getAverageRaging';
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
      return {
        ...item,
        averageRating: getAverageRating(item)
      };
    });

    return handlerResponse(200, payload);
  } catch (err) {
    return handlerResponse(500, err.message ?? '');
  }
};
