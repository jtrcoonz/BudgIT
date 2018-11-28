'use strict';
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const ExpenseSchema = mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true
  },
  value: {
    type: Number, 
    default: 0
  },
  date: {
    type: Date, 
    default: Date.now()
  }
});

ExpenseSchema.methods.serialize = function() {
  return {
    id: this._id || '',
    description: this.description || '',
    category: this.category || '',
    value: this.value || '',
    date: this.date || ''
  };
};

const Expense = mongoose.model('Expense', ExpenseSchema);

module.exports = {Expense};
