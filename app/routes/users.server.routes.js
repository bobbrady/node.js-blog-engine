/**
 * xiao-blog - a small footprint blog designed for personal use
 * Copyright (c) 2014-2015, Bob Brady. 
 * Usage permitted under the terms of The MIT License, (MIT) 
 * https://github.com/bobbrady/xiao-blog
 */


/* jshint node: true */
"use strict";

var users = require('../../app/controllers/users.server.controller'),
passport = require('passport');

module.exports = function(app) {

  app.route('/admin/signup')
    .get(users.renderSignup)
    .post(users.signup);

	app.route('/admin/signin')
	   .get(users.renderSignin)
	   .post(passport.authenticate('local', {
			successRedirect: '/admin',
			failureRedirect: '/admin/signin',
			failureFlash: true
	   }));

  app.get('/admin/signout', users.signout);

  /* Disabled for now
  app.route('/users')
  .post(users.create)
  .get(users.list);

  app.route('/users/:userId')
  .get(users.read)
  .put(users.update)
  .delete(users.delete);

  app.param('userId', users.userByID);
 */
};
