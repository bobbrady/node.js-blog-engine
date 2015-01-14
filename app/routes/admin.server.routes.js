/**
 * xiao-blog - a small footprint blog designed for personal use
 * Copyright (c) 2014-2015, Bob Brady. 
 * Usage permitted under the terms of The MIT License, (MIT) 
 * https://github.com/bobbrady/xiao-blog
 */


/* jshint node: true */
"use strict";

var admin = require(prepend_basedir('app/controllers/admin.server.controller')),
    users = require(prepend_basedir('app/controllers/users.server.controller'));

module.exports = function(app) {

  app.route('/admin')
  .get(users.verifyAuthenticated,admin.list);

  app.route('/admin/posts')
  .get(users.verifyAuthenticated, admin.createForm)
  .post(users.verifyAuthenticated, admin.create);

  app.route('/admin/posts/:slug')
  .get(users.verifyAuthenticated, admin.updateForm)
  .put(users.verifyAuthenticated, admin.update)
  .delete(users.verifyAuthenticated, admin.delete);

  app.route('/admin/posts/tags/:tagName')
  .get(users.verifyAuthenticated, admin.listByTag);
};

