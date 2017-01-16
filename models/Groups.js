var mongoose = require('mongoose');

var GroupSchema = new mongoose.Schema({
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});


var Group = mongoose.model('Group', GroupSchema);

module.exports = Group;