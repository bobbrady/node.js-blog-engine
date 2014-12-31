/**
 * xiao-blog - a small footprint blog designed for personal use
 * Copyright (c) 2014-2015, Bob Brady. 
 * Usage permitted under the terms of The MIT License, (MIT) 
 * https://github.com/bobbrady/xiao-blog
 */


/* jshint node: true */
"use strict";

exports.upload = function(req, res) {
  console.log(req.body); // form fields
  console.log(req.files); // form files
  res.json(req.files);
};  


