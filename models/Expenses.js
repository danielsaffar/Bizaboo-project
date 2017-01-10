var mongoose = require('mongoose');

var ExpenseSchema = new mongoose.Schema({
  category:String,
  amount:Number,
  author: String
})
  
var Expense = mongoose.model('Expense', ExpenseSchema);

module.exports = Expense