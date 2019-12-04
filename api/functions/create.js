const handler = async (event, context) => {
  console.log("create");

  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  };
  const result = {
    headers
  };

  result.statusCode = 200;
  // result.body = JSON.stringify({ event, context });
  result.body = { event, context };

  return result;
};

export const main = handler;
