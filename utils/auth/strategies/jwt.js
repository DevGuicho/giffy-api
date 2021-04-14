const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');
const boom = require('@hapi/boom');

const UsersService = require('../../../services/users');
const { config } = require('../../../config');

passport.use(
  new Strategy(
    {
      secretOrKey: config.authJwtSecret,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async function (tokenPayload, cb) {
      const userService = new UsersService();
      try {
        const user = await userService.getUserByEmail(tokenPayload.email);
        if (!user) {
          return cb(boom.unauthorized(), false);
        }
        const newUser = user.toJSON();

        delete newUser.password;

        cb(null, { ...newUser });
      } catch (error) {
        cb(error);
      }
    }
  )
);
