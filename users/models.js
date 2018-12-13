"use strict";
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

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
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  income: {
    type: Number,
    default: 1000
  },
  foodAndToiletries: {
    type: Number,
    default: 50
  },
  housingAndUtilities: {
    type: Number,
    default: 10
  },
  transportation: {
    type: Number,
    default: 10
  },
  healthAndInsurance: {
    type: Number,
    default: 10
  },
  recreationAndLeisure: {
    type: Number,
    default: 10
  },
  miscellaneous: {
    type: Number,
    default: 10
  }
});

UserSchema.methods.serialize = function() {
  return {
    id: this._id || "",
    username: this.username || "",
    firstName: this.firstName || "",
    lastName: this.lastName || "",
    income: this.income || "",
    foodAndToiletries: this.foodAndToiletries || "",
    housingAndUtilities: this.housingAndUtilities || "",
    transportation: this.transportation || "",
    healthAndInsurance: this.healthAndInsurance || "",
    recreationAndLeisure: this.recreationAndLeisure || "",
    miscellaneous: this.miscellaneous || ""
  };
};

UserSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

UserSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

const User = mongoose.model("User", UserSchema);

module.exports = { User };
