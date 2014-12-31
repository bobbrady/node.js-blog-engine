/**
 * xiao-blog - a small footprint blog designed for personal use
 * Copyright (c) 2014-2015, Bob Brady. 
 * Usage permitted under the terms of The MIT License, (MIT) 
 * https://github.com/bobbrady/xiao-blog
 */


/* jshint node: true */
'use strict';
var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	User = require('mongoose').model('User');

module.exports = function() {
	passport.use(new LocalStrategy(function(username, password, done) {
		User.findOne({
			username: username
		}, function(err, user) {
			if (err) {
				return done(err);
			}
			
			if (!user) {
				return done(null, false, {
					message: 'Authentication error: User not found'
				});
			}

			if (!user.authenticate(password)) {
				return done(null, false, {
					message: 'Authentication error: Incorrect password'
				});
			}
			
			return done(null, user);
		});
	}));
};
