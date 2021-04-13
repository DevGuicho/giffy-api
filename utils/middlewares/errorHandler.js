/* eslint-disable space-before-function-paren */
const boom = require('@hapi/boom');
const debug = require('debug')('app:server');
const { config } = require('../../config');

function withErrorStack(error, stack) {
  if (config.env === 'development') {
    return { ...error, stack };
  }
  return error;
}

function logErrors(err, req, res, next) {
  debug(err);
  next(err);
}

function wrapErrors(err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }
  next(err);
}

function errorHandler(err, req, res, next) {
  const { output } = err;
  const { statusCode, payload } = output;

  res.status(statusCode).json(withErrorStack(payload, err.stack));
}

module.exports = {
  logErrors,
  wrapErrors,
  errorHandler
};
