// debemos traernos la estrategia que se ha creado
require('../auth/strategies/jwt');
const passport = require('passport');
const boom = require('@hapi/boom');

// Crearemos un middleware :
const authErrorHandler = (req, res, next) => {
  passport.authenticate('jwt', (error, user) => {
    // si ocurre un error o el usuario que me devuelve la strategia no existe
    // llamamos a next pasandole a boom
    if (error || !user) {
      return next(boom.unauthorized('Token invalido o ha expirado'));
    }

    // De lo contrario ejecutaremos next para llame al siguiente middlware(que en este caso seria el validation handler y el manejador de ruta)
    req.login(user, { session: false }, (err) => {
      if (err) {
        return next(err);
      }
      next();
    });
  })(req, res, next);
};

module.exports = authErrorHandler;
