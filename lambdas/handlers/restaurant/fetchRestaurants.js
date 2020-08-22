import handlerResponse from '../../libs/response';
import client from '../../libs/dynamoDb';
const LIMIT = 10;

export const fetch = async (event) => {
  const { offset } = event.queryStringParameters;

  try {
    const params = {
      TableName: process.env.restaurantTable,
      Select: 'ALL_ATTRIBUTES',
      Limit: LIMIT,
      // offsetting for pagination
      LastEvaluatedKey: offset ?? 10
    };

    const res = await client.scan(params);

    return handlerResponse(200, res.Items);
  } catch (err) {
    return handlerResponse(500, err.message ?? '');
  }
};
