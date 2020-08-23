import { handlerResponse, client } from '../../libs';
import { validateSchema } from '../../models/restaurant';
import { uploadImage } from '../../utils/s3';

export const add = async event => {
  try {
    const { value, error } = validateSchema(event.body ?? {});

    if (error) {
      return handlerResponse(400, error);
    }

    const params = {
      TableName: process.env.restaurantTable,
      Item: {
        ...value
      }
    };

    // if data or value has a photo url, upload to s3 or can also store the image in postgre
    if (value.hasOwnProperty('photoUrl') && value.photoUrl.length > 0) {
      await uploadImage(value.name, value.photoUrl);
    }

    await client.put(params);
    return handlerResponse(200, params.Item);
  } catch (err) {
    return handlerResponse(500, err.message ?? '');
  }
};
