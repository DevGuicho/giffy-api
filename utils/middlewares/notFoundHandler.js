const boom = require('@hapi/boom');

// eslint-disable-next-line space-before-function-paren
function notFoundHandler(req, res) {
  const { output } = boom.notFound();
  const { statusCode, payload } = output;

  res.status(statusCode).json(payload);
}
module.exports = notFoundHandler;
