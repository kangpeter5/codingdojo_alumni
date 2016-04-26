var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = (function() {
return {
    find: function(req, res) {
       User.findOne({name: req.body.name}, function(err, user){
        if(err){ 
            console.log(err);
        }   
        else{
      //is there a user?
            if(user){
            res.json(user);
            } 
                else{
                //otherwise make a user:
                User.create({name: req.body.name}, function(err, newUser){
                    if(err) { console.log(err); }
                    res.json(newUser);
                })
                }
         }
        })
    },
    findId: function(req, res) {
        console.log(req.body._id, "this is in the controller")
       User.findOne({_id: req.body._id}, function(err, user){
        if(err){ 
            console.log(err);
        }   
        else{
      //is there a user?
            if(user){
            res.json(user);
            } 
                else{
                //otherwise make a user:
                User.create({name: req.body.name}, function(err, newUser){
                    if(err) { console.log(err); }
                    res.json(newUser);
                })
                }
         }
        })
    },
    update: function(req, res){ // have not specified what we're going to edit for this controller yet.
        User.update({_id: req.body._id}, {$inc: {quant: - req.body.quantity}}, function(err, results){
              console.log(results, "This is after the UPDATE")
              if(err){
                console.log(err, "this is an error");

              } else{
                  console.log(results);
                  User.create(req.body, function(err, user) {
              // console.log(order, "This is coming from my database")
                  if(err) {
                  console.log(err);
                  res.json({errors: err.errors});
                  } else{
                  res.json(true);
                  }
                })
              }
              })
        }
 }
})();