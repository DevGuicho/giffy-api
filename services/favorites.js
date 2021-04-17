/* eslint-disable space-before-function-paren */
const Favorite = require('../models/Favorite');
const UsersService = require('./users');

class FavoritesServices {
  constructor() {
    this.userService = new UsersService();
  }

  async getFavorites({ userId }) {
    const favorites = await Favorite.find({ user: userId });
    return favorites;
  }

  async getFavorite(id) {
    const favorite = await Favorite.findById(id).populate('user');
    return favorite || {};
  }

  async createFavorite(favorite) {
    const user = await this.userService.getUser(favorite.user);

    const newFavorite = new Favorite({
      ...favorite,
      user: user._id
    });

    const noteCreated = await newFavorite.save();

    user.favorites = user.favorites.concat(noteCreated._id);
    await user.save();
    return noteCreated || {};
  }

  async updateFavorite(id, favorite) {
    const noteUpdated = await Favorite.findOneAndUpdate({ _id: id }, favorite, {
      new: true
    });
    return noteUpdated;
  }

  async deleteFavorite(id) {
    const favoriteDeleted = await Favorite.findByIdAndDelete(id);
    const user = await this.userService.getUser(favoriteDeleted.user);
    user.favorites = user.favorites.filter(
      (favorite) => favorite.toString() !== id
    );
    await user.save();
    return favoriteDeleted;
  }
}

module.exports = FavoritesServices;
