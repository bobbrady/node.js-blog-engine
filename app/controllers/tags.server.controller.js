/**
 * xiao-blog - a small footprint blog designed for personal use
 * Copyright (c) 2014-2015, Bob Brady. 
 * Usage permitted under the terms of The MIT License, (MIT) 
 * https://github.com/bobbrady/xiao-blog
 */


/* jshint node: true */
"use strict";

var mongoose = require('mongoose'),
Tag = mongoose.model('Tag');


var getErrorMessage = function(err) {
  if(err.errors) {
    for (var errName in err.errors) {
      if(err.errors[errName].message) {
        return err.errors[errName].message;
      }
    }
  } else {
    return 'An unknown error was encountered';
  }
};

exports.tagcloud = function(req, res) {
      Tag.find(function(err, tags) {
        if (err) {
          return res.status(400).send({
            message: getErrorMessage(err)
          });
        } else {
          res.json(tags);    
        }});
    };

