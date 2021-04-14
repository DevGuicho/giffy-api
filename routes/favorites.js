/* eslint-disable space-before-function-paren */
const express = require('express');
const boom = require('@hapi/boom');
const authErrorHandler = require('../utils/middlewares/authErrorHandler');
const FavoritesServices = require('../services/favorites');

function favoritesApi(app) {
  const router = express.Router();
  const favoriteService = new FavoritesServices();

  app.use('/api/favorites/', router);

  router.get('/', authErrorHandler, async (req, res, next) => {
    try {
      const favorites = await favoriteService.getFavorites();
      res.json({
        message: 'Favorites listed',
        data: favorites
      });
    } catch (error) {
      next(boom.badRequest());
    }
  });
  router.get('/:id', authErrorHandler, async (req, res, next) => {
    const { id } = req.params;
    try {
      const favorite = await favoriteService.getNote(id);
      res.json({
        message: 'Note retrieved',
        data: favorite
      });
    } catch (error) {
      next(boom.badRequest(error));
    }
  });
  router.post('/', authErrorHandler, async (req, res, next) => {
    const favorite = req.body;

    try {
      const favoriteCreated = await favoriteService.createFavorite(favorite);
      res.status(201).json({
        message: 'favorite created',
        data: favoriteCreated
      });
    } catch (error) {
      next(boom.badRequest(error));
    }
  });
  router.put('/:id', authErrorHandler, async (req, res, next) => {
    const { id } = req.params;
    const favorite = req.body;
    try {
      const favoriteUpdated = await favoriteService.updateFavorite(
        id,
        favorite
      );
      res.json({
        message: 'Nonte updated',
        data: favoriteUpdated
      });
    } catch (error) {
      next(boom.badRequest(error));
    }
  });
  router.delete('/:id', authErrorHandler, async (req, res, next) => {
    const { id } = req.params;
    try {
      const favoriteDeleted = await favoriteService.deleteFavorite(id);
      res.json({
        message: 'Note deleted',
        data: favoriteDeleted
      });
    } catch (error) {
      next(boom.badRequest(error));
    }
  });
}

module.exports = favoritesApi;
