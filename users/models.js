'use strict';
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {type: String, required: true},
  lastName: {type: String, required: true}
});

const BudgetSchema = mongoose.Schema({
  income: {
    type: Number,
    required: true
  },
  foodAndToiletries: {
    type: Number,
    required: true
  },
  housingAndUtilities: {
    type: Number,
    required: true
  },
  transportation: {
    type: Number,
    required: true
  },
  healthAndInsurance: {
    type: Number,
    required: true
  },
  recreationAndLeisure: {
    type: Number,
    required: true
  },
  miscellaneous: {
    type: Number,
    required: true
  }
});

UserSchema.methods.serialize = function() {
  return {
    username: this.username || '',
    firstName: this.firstName || '',
    lastName: this.lastName || ''
  };
};

BudgetSchema.methods.serialize = function() {
  return {
    income: this.income || '',
    foodAndToiletries: this.foodAndToiletries || '',
    housingAndUtilities: this.housingAndUtilities || '',
    transportation: this.transportation || '',
    healthAndInsurance: this.healthAndInsurance || '',
    recreationAndLeisure: this.recreationAndLeisure || '',
    miscellaneous: this.miscellaneous || ''
  };
};

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

const User = mongoose.model('User', UserSchema);
const Budget = mongoose.model('Budget', BudgetSchema);

module.exports = {User};
module.exports = {Budget};
