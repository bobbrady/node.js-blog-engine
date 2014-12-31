/* jshint node: true */
"use strict";

var uploads = require('../../app/controllers/uploads.server.controller');

module.exports = function(app) {
  app.route('/admin/uploads')
    .post(uploads.upload);
};
