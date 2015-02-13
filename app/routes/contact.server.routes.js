/**
 * xiao-blog - a small footprint blog designed for personal use
 * Copyright (c) 2014-2015, Bob Brady. 
 * Usage permitted under the terms of The MIT License, (MIT) 
 * https://github.com/bobbrady/xiao-blog
 */


/* jshint node: true */
"use strict";

var contact = require(prepend_basedir('app/controllers/contact.server.controller'));

module.exports = function(app) {

  app.route('/contactForm')
    .get(contact.contactForm);
  
  app.route('/contact')
    .post(contact.contact);
};
