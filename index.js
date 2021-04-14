require('./lib/mongoose.js');
const express = require('express');
const cors = require('cors');
const debug = require('debug')('app:server');
const app = express();
const { config } = require('./config');
const authApi = require('./routes/auth.js');
const favoritesApi = require('./routes/favorites');
const {
  logErrors,
  wrapErrors,
  errorHandler
} = require('./utils/middlewares/errorHandler.js');
const notFoundHandler = require('./utils/middlewares/notFoundHandler.js');

const { port } = config;

app.use(cors());
app.use(express.json());

favoritesApi(app);
authApi(app);

app.use(notFoundHandler);

app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(port || 3001, () => debug(`Server on port ${port || 3001}`));
