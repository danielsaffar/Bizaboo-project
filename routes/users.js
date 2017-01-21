var express = require('express');
var router = express.Router();
// var mongoose = require('mongoose');

// var UserModel= require('../models/Users');
var User = require('../models/Users');

var expressJWT = require('express-jwt');
var auth = expressJWT({secret: 'myLittleSecret'});


/* GET users listing. */
router.get('/friends', auth, function(req, res, next) {
    var currentUser = req.user._id;
    var allUsers=User.find({"_id": { $nin: currentUser}}, function(err, users){
    if(users){ }

    res.send(users);
  });
});

router.get('/', function(req,res,next) {
  res.send('respond with a resource');
});

module.exports = router;
