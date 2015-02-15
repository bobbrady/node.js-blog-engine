/**
 * xiao-blog - a small footprint blog designed for personal use
 * Copyright (c) 2014-2015, Bob Brady. 
 * Usage permitted under the terms of The MIT License, (MIT) 
 * https://github.com/bobbrady/xiao-blog
 */


/* jshint node: true */
"use strict";

var staticPages = require(prepend_basedir('app/controllers/static-pages.server.controller'));

module.exports = function(app) {

  app.get('/', staticPages.home);

  app.get('/features', staticPages.features);
  
  app.get('/about', staticPages.about);

  app.route('/contactForm')
    .get(staticPages.contactForm);
  
  app.route('/contact')
    .post(staticPages.contact);
};
