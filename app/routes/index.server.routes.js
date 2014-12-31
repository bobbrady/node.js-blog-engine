/* jshint node: true */
"use strict";

module.exports = function(app) {
  var posts = require('../controllers/posts.server.controller');
  app.get('/', posts.list);
};
