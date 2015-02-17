/**
 * xiao-blog - a small footprint blog designed for personal use
 * Copyright (c) 2014-2015, Bob Brady. 
 * Usage permitted under the terms of The MIT License, (MIT) 
 * https://github.com/bobbrady/xiao-blog
 */


/* jshint node: true */
"use strict";

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require("./config/config");

// Basic idea from https://gist.github.com/branneman/8048520, H/T: a-ignatov-parc
// Use a global function to handle local requires(...) paths
var prepend_basedir = function(name) {
  return config.basedir + '/' + name;
};

global.prepend_basedir = prepend_basedir;

var mongoose = require(prepend_basedir('config/mongoose')),
    express = require(prepend_basedir('config/express')),
    passport = require(prepend_basedir('config/passport'));

mongoose();
var app = express(),
passport = passport();

app.listen(3000);
module.exports = app;

console.log('Server running at http://localhost:3000');
