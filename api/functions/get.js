exports.main = async event => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  };

  const result = {
    headers
  };

  result.statusCode = 200;
  // result.body = JSON.stringify({ event, context });
  result.body = JSON.stringify({ message: "Go Serverless v1.0! Your function executed successfully!" });

  return result;
};
