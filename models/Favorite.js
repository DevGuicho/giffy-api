const { Schema, model } = require('mongoose');

const favoriteSchema = new Schema({
  gifId: String,
  url: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

favoriteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

const Favorite = model('Favorite', favoriteSchema);

module.exports = Favorite;
