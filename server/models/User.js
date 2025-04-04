const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  auth0Id: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  savedRecipes: [{
    type: Schema.Types.ObjectId,
    ref: 'Recipe'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);