/**
 * xiao-blog - a small footprint blog designed for personal use
 * Copyright (c) 2014-2015, Bob Brady. 
 * Usage permitted under the terms of The MIT License, (MIT) 
 * https://github.com/bobbrady/xiao-blog
 */


/* jshint node: true */
"use strict";

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var TagSchema = new Schema({
  _id: String,
  value : {count : Number}
});

mongoose.model('Tag', TagSchema, 'post_tags');
