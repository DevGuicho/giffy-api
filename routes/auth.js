/* eslint-disable space-before-function-paren */
const express = require('express');
const passport = require('passport');
const boom = require('@hapi/boom');
const jwt = require('jsonwebtoken');
const { config } = require('../config');
const UsersService = require('../services/users');

/* const TWO_HOURS_IN_SEC = 7200; */
// BASIC STRATEGY
require('../utils/auth/strategies/basic');

function authApi(app) {
  const router = express.Router();
  app.use('/api/auth/', router);

  const usersService = new UsersService();

  router.post('/sign-in', async function (req, res, next) {
    const { apiKeyToken } = req.body;
    if (!apiKeyToken) {
      next(boom.unauthorized('apiKeyToken is required'));
    }
    passport.authenticate('basic', function (error, user) {
      try {
        if (error || !user) {
          next(boom.unauthorized());
        }
        req.login(user, { session: false }, async function (error) {
          if (error) {
            next(error);
          }

          const { _id: id, name, email } = user;
          const payload = {
            sub: id,
            name,
            email
          };
          const token = jwt.sign(payload, config.authJwtSecret, {
            expiresIn: '120m'
          });
          /* res.cookie('token', token, {
            httpOnly: false,
            secure: false,
            maxAge: TWO_HOURS_IN_SEC
          }); */
          return res.status(200).json({
            data: {
              user: {
                id,
                name,
                email
              },
              token
            }
          });
        });
      } catch (error) {
        next(error);
      }
    })(req, res, next);
  });
  router.post('/sign-up', async function (req, res, next) {
    const user = req.body;
    try {
      const createdUser = await usersService.createUser(user);
      res.status(201).json({
        data: createdUser._id,
        message: 'User Created'
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = authApi;
