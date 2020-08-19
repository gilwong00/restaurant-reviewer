import handlerResponse from '../../libs/response';
import query from '../../postgres';
const LIMIT = 10;

export const list = async (event) => {
  const { offset } = event.queryStringParameters;

  try {
    const sql = `
			SELECT 
				id,
				name,
				location,
				price_range,
				date_added  
				FROM restaurants
				ORDER BY date_added DESC
				OFFSET $1
				LIMIT $2
			`;
    const { rows } = await query(sql, [offset, LIMIT]);

    return handlerResponse(200, rows);
  } catch (err) {
    return handlerResponse(500, err.message ?? '');
  }
};
