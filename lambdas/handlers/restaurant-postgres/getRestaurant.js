import handlerResponse from '../../libs/response';
import query from '../../postgres';

export const get = async (event) => {
  try {
  } catch (err) {
    return handlerResponse(500, err.message ?? '');
  }
};
