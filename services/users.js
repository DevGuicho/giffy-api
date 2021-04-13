/* eslint-disable space-before-function-paren */
const User = require('../models/User');
const bcrypt = require('bcryptjs');

class UsersService {
  async getUsers() {
    const users = await User.find({}).populate('notes', {
      content: 1,
      important: 1,
      date: 1
    });
    return users;
  }

  async getUser(id) {
    const user = await User.findById(id);
    return user;
  }

  async getUserByEmail(email) {
    const user = await User.findOne({ email });
    return user;
  }

  async createUser(user) {
    const hashPassword = await bcrypt.hash(user.password, 10);

    const newUser = new User({ ...user, password: hashPassword });
    const userCreated = await newUser.save();
    return userCreated;
  }

  async updateUser(id, user) {
    const userUpdated = await User.findOneAndUpdate({ _id: id }, user, {
      new: true
    });
    return userUpdated;
  }

  async deleteUser(id) {
    const userDeleted = await User.findByIdAndDelete(id);
    return userDeleted;
  }
}

module.exports = UsersService;
