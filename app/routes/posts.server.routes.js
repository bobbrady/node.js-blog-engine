/* jshint node: true */
"use strict";

var posts = require('../../app/controllers/posts.server.controller');

module.exports = function(app) {

  app.route('/posts/:slug')
    .get(posts.read);
  
  app.param('slug', posts.postBySlug);
};
