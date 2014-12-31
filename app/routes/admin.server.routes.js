/* jshint node: true */
"use strict";

var admin = require('../../app/controllers/admin.server.controller'),
    users = require('../../app/controllers/users.server.controller');

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

