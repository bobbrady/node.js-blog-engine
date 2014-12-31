/* jshint node: true */
"use strict";

var mongoose = require('mongoose'),
bcrypt = require('bcrypt-nodejs'),
Schema = mongoose.Schema;

var UserSchema = new Schema({
  firstName: {type: String, trim: true},
  lastName: {type: String, trim: true},
  email: {type: String, trim: true,
    validate: [ 
      function(email) {
      var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      return re.test(email);
    },
    'Please enter a valid email address'
    ]
  }, 
  username: {type: String, required: true, unique: true, trim: true,
    validate: [
      function(username) {
      return username.length >= 2;
    },
    'Username must be >= 2 characters'
    ]
  },
  password: {type: String, 
    validate: [ 
      function(password) {
      return password.length >= 6;
    },
    'Password must be >= 6 characters'
    ]
  }, 
  provider: {type: String, required: 'Authentication Provider must be provided'},
  created: {type: Date, default: Date.now
  }
});

UserSchema.pre('save', function(next) {
  if (this.password) {
    this.password = this.hash(this.password);
  }
  next();
});


UserSchema.methods.hash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.authenticate = function(password) {
  return bcrypt.compareSync(password, this.password);
};

mongoose.model('User', UserSchema);
