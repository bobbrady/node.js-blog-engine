/**
 * xiao-blog - a small footprint blog designed for personal use
 * Copyright (c) 2014-2015, Bob Brady. 
 * Usage permitted under the terms of The MIT License, (MIT) 
 * https://github.com/bobbrady/xiao-blog
 */


/* jshint node: true */
"use strict";

module.exports = {
  basedir: '/home/bobby/Documents/NodeJS/XiaoBlog/node.js-blog-engine',
  db: 'mongodb://localhost/xiao-blog-test',
  sessionSecret: 'XiaoBlogSecret',
  app: {
    url: 'http://localhost:3000',
    title: 'Xiao Blog: A Node.js blog engine, simple, fast, & free',
    description: 'Xiao Blog is a Node.js blog engine using markdown stored to MongoDB. Open source modules like Mongoose and Bootstrap keep things simple and easy to use!',
    logo: '/img/xiao-blog-logo.png',
    favicon: 'public/img/xiao-blog-favicon.ico',
    postsPerPage: 10,
    logFormat: ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" :response-time ms'
  }
};

