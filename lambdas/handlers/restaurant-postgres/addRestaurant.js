import handlerResponse from '../../libs/response';
import query from '../../postgres';
import { validateSchema } from '../../models/restaurant';
import { uploadImage } from '../../utils/s3';

export const add = async (event) => {
  try {
    const { value, error } = validateSchema(event.body ?? {});

    if (error) {
      return handlerResponse(400, error);
    }

    const insertQuery = `
		INSERT INTO restaurants (
			name,
			location,
			price_range,
			date_added
		)
		VALUES ($1, $2, $3, $4)	
		RETURNING *
	`;

    const values = [
      value.name,
      value.location,
      value.priceRange,
      value.dateAdded
    ];

    // if data or value has a photo url, upload to s3 or can also store the image in postgre
    if (value.hasOwnProperty('photoUrl') && value.photoUrl.length > 0) {
      await uploadImage(value.name, value.photoUrl);
    }

    const { rows } = await query(insertQuery, values);

    if (rows.length > 0) {
      return handlerResponse(200, rows[0]);
    } else {
      return handlerResponse(400, 'Could not add restaurant');
    }
  } catch (err) {
    return handlerResponse(500, err.message ?? '');
  }
};
