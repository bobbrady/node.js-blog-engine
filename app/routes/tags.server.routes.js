/* jshint node: true */
"use strict";

var posts = require('../../app/controllers/posts.server.controller');

module.exports = function(app) {
  app.route('/posts/tags/:tagName')
    .get(posts.listByTag);

  app.param('tagName', posts.postsByTag);
};
