const handlerResponse = (statusCode, payload) => {
  return {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(payload),
  };
};

export default handlerResponse;
