const express = require('express');

// eslint-disable-next-line space-before-function-paren
function usersApi(app) {
  const router = express.Router();
  app.use('/api/users/', router);

  router.get('/', (req, res) => {});
  router.get(':id', (req, res) => {});
  router.post('/', (req, res) => {});
  router.put('/:id', (req, res) => {});
  router.delete('/:id', (req, res) => {});
}

module.exports = usersApi;
