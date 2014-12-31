/* jshint node: true */
"use strict";

module.exports = {
  db: 'mongodb://localhost/xiao-blog-test',
  sessionSecret: 'xiaoBlogSessionSecret',
  app: {
    blog: {
      url: 'http://localhost:3000',
      title: 'Xiao Blog',
      description: 'Xiao Blog is a small footprint blog designed for personal use',
      logo: '/img/logo.png'
    }
  }
};

