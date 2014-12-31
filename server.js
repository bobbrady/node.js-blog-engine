/**
 * xiao-blog - a small footprint blog designed for personal use
 * Copyright (c) 2014-2015, Bob Brady. 
 * Usage permitted under the terms of The MIT License, (MIT) 
 * https://github.com/bobbrady/xiao-blog
 */


/* jshint node: true */
"use strict";

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose'),
express = require('./config/express'),
passport = require('./config/passport');

var db = mongoose();
var app = express();
var passport = passport();
app.listen(3000);
module.exports = app;

console.log('Server running at http://localhost:3000');
