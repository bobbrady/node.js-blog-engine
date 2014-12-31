/* jshint node: true */
"use strict";

var User = require('mongoose').model('User'),
passport = require('passport');

var getErrorMessage = function(err) {
  var message = '';

  if (err.code) {
    switch (err.code) {
      // MongoDB codes for uniqueness violation of a field (username here)
      case 11000:
        case 11001:
        message = 'The username already exists';
      break;
      default:
        message = 'Unknown error';
    }
  } else {
    for (var errName in err.errors) {
      if (err.errors[errName].message){
        message = err.errors[errName].message;
      }
    }
  }
  return message;
};

exports.renderSignin = function(req, res) {
  if (!req.user) {
    res.render('admin/signin', {
      title: 'Admin Signin Form',
    });
  } else {
    return res.redirect('/admin');
  }
};

exports.renderSignup = function(req, res) {
  if (!req.user) {
    res.render('admin/signup', {
      title: 'Create Admin User Form',
    });
  } else {
    return res.redirect('/admin');
  }
};

exports.signup = function(req, res, next) {
  if (!req.user) {
    var user = new User(req.body);

    user.provider = 'local';
    user.save(function(err) {
      // Use flash to transport messages through redirect
      if (err) {
        var error = getErrorMessage(err);
        req.flash('error', error);
        return res.redirect('/admin/signup');
      }
      req.login(user, function(err) {
        if (err) { 
          return next(err);
        }
        return res.redirect('/admin');
      });
    });
  } else {
    return res.redirect('/admin');
  }
};

exports.signout = function(req, res) {
  // Logout is a passport-provided function
  req.logout();
  res.redirect('/admin');
};

exports.verifyAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/admin/signin');
  }
};

/* Disabled for now
   exports.create = function(req, res, next) {
   var user = new User(req.body);
   user.save(function(err) {
   if (err) {
   return next(err);
   } else {
   res.json(user);
   }
   });
   };

   exports.list = function(req, res, next) {
   User.find(function(err, users) {
   if (err) {
   return next(err);
   } else {
   res.json(users);
   }
   });
   };

   exports.read = function(req, res) {
   res.json(req.user);
   };

   exports.update = function(req, res, next) {
   User.findByIdAndUpdate(req.user.id, req.body, function(err, user) {
   if (err) {
   return next(err);
   } else {
   res.json(user);
   }
   });
   };


   exports.delete = function(req, res, next) {
   req.user.remove(function(err) {
   if (err) {
   return next(err);
   } else {
   res.json(req.user);
   }
   });
   };

   exports.userByID = function(req, res, next, id) {
   User.findOne({
_id: id
}, function(err, user) {
if(err) {
return next(err);
} else {
req.user = user;
next();
}
});
};
*/
