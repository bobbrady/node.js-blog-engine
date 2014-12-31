/**
 * xiao-blog - a small footprint blog designed for personal use
 * Copyright (c) 2014-2015, Bob Brady. 
 * Usage permitted under the terms of The MIT License, (MIT) 
 * https://github.com/bobbrady/xiao-blog
 */


/* jshint node: true */
"use strict";

var posts = require('../../app/controllers/posts.server.controller');

module.exports = function(app) {

  app.route('/posts/:slug')
    .get(posts.read);
  
  app.param('slug', posts.postBySlug);
};
