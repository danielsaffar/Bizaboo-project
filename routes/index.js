var express = require('express');
var router = express.Router()
var mongoose = require('mongoose');
var passport = require('passport');
var expressJWT = require('express-jwt');
var auth = expressJWT({secret: 'myLittleSecret',userProperty: 'payload'});



require('../config/passport');

var Comment = require('../models/Comments');
var User = require('../models/Users');
var Expense = require('../models/Expenses');


router.post('/register', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  var user = new User();

  user.username = req.body.username;
  user.setPassword(req.body.password);
  user.email=req.body.email;
  user.group=req.body.group


  user.save(function (err){
    if(err){ return next(err); }
    console.log(user);
    return res.json({token: user.generateJWT(),
                     user:user                     })
  });
});

router.get('/users', function(req, res, next) {
    User.find(function(err, users){
    if(err){ return next(err); }

    res.json(users);
  });
});

router.post('/login', function(req, res, next){
  if(!req.body.username || !req.body.password){
    return res.status(400).json({message: 'Please fill out all fields'});
  }

  passport.authenticate('local', function(err, user, info){
    if(err){ return next(err); }

    if(user){
      return res.json({token: user.generateJWT(),
                     user:user                     });
    } else {
      return res.status(401).json(info);
    }
  })(req, res, next);
});

router.get('/expenses',auth, function(req, res, next) {
  var author_id= req.payload._id;
    Expense.find({author_id:author_id},
    
      function(err, expenses){
    if(err){ return next(err); }

    res.json(expenses);
  });
});


router.get('/group',auth, function(req, res, next) {
  var userGroup= req.payload.group;
    Expense.find({group: userGroup},
    
      function(err, expenses){
    if(err){ return next(err); }

    res.json(expenses);
  });
});




router.post('/group', function(req, res, next) {

   var expense = new Expense(req.body);

  console.log(req.user);

  expense.save(function(err, expense){
    if(err){ return next(err); }

    res.json(expense);
  });

});

router.put('/group', function(req, res, next) {
  var category=req.body.category;
  var amount_user=req.body.amount;

Expense.find(category, {$inc: {amount:amount_user}}, function (err, data) {

res.json(data)
});

});


router.put('/expenses', function(req, res, next) {
  var id=req.body.id;
  var amount_user=req.body.amount;


Expense.findByIdAndUpdate(id, {$inc: {amount:amount_user}}, function (err, data) {

res.json(data)
});

});

router.post('/expenses', function(req, res, next) {

   var expense = new Expense(req.body);
  console.log(req.user);

  expense.save(function(err, expense){
    if(err){ return next(err); }

    res.json(expense);
  });

});


router.param('expense', function(req, res, next, id) {
  var query = Expense.findById(id);

  query.exec(function (err, expense){
    if (err) { return next(err); }
    if (!expense) { return next(new Error('can\'t find expense')); }

    req.expense = expense;
    return next();
  });
});

router.param('comment', function(req, res, next, id) {
  var query = Comment.findById(id);

  query.exec(function (err, comment){
    if (err) { return next(err); }
    if (!comment) { return next(new Error('can\'t find comment')); }

    req.comment = comment;
    return next();
  });
});

router.post('/expenses/:expense/comments', function(req, res, next) {
  var comment = new Comment(req.body);
  comment.post = req.post;

  comment.save(function(err, comment){
    if(err){ return next(err); }

    req.post.comments.push(comment);
    req.post.save(function(err, post) {
      if(err){ return next(err); }

      res.json(comment);
    });
  });
});

router.get('/expenses/:post', function(req, res, next) {
  req.post.populate('comments', function(err, post) {
    if (err) { return next(err); }

    res.json(post);
  });
});

module.exports = router;
