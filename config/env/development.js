/**
 * xiao-blog - a small footprint blog designed for personal use
 * Copyright (c) 2014-2015, Bob Brady. 
 * Usage permitted under the terms of The MIT License, (MIT) 
 * https://github.com/bobbrady/xiao-blog
 */


/* jshint node: true */
"use strict";

module.exports = {
  basedir: "/home/bobby/Documents/NodeJS/xiao-blog",
  //basedir: "/home/user/xiao-blog",
  db: 'mongodb://localhost/xiao-blog',
  sessionSecret: 'XiaoBlogSecret',
  app: {
    url: 'http://localhost:3000',
    title: 'Xiao Blog',
    description: 'Xiao Blog is a small footprint blog designed for personal use',
    logo: '/img/xiao-blog-logo.png',
    favicon: 'public/img/xiao-blog-favicon.ico',
    postsPerPage: 10,
    logFormat: ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms'
  }
};

