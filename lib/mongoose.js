const debug = require('debug')('app:database');
const mongoose = require('mongoose');

const { config } = require('../config');

const uri = `mongodb+srv://${config.dbUser}:${config.dbPassword}@cluster0.ih2pv.mongodb.net/${config.dbName}?retryWrites=true&w=majority`;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(debug('database connected'))
  .catch((err) => debug(err));
