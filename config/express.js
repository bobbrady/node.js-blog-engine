/**
 * xiao-blog - a small footprint blog designed for personal use
 * Copyright (c) 2014-2015, Bob Brady. 
 * Usage permitted under the terms of The MIT License, (MIT) 
 * https://github.com/bobbrady/xiao-blog
 */


/* jshint node: true */
"use strict";

var config = require('./config'),
express = require('express'),
fs = require('fs'),
morgan = require('morgan'),
compress = require('compression'),
bodyParser = require('body-parser'),
connect = require('connect'),
methodOverride = require('method-override'),
swig = require('swig'),
session = require('express-session'),
flash = require('connect-flash'),
passport = require('passport'),
favicon = require('serve-favicon'),
multer = require('multer');

module.exports = function() {
  var app = express();

  app.locals.blog = config.app;


  // Enable Swig templating
  app.engine('html', swig.renderFile);
  app.set('view engine', 'html');
  app.set('views', prepend_basedir('app/views'));

  app.use(favicon(prepend_basedir(config.app.favicon)));

  // log apache format to file
  var accessLogStream = fs.createWriteStream(prepend_basedir('logs/access.log', {flags: 'a'}));
  app.use(morgan(config.app.logFormat, {stream: accessLogStream}));

  if (process.env.NODE_ENV === 'development') {
    app.set('view cache', false);
  } else if (process.env.NODE_ENV === 'production') {
    app.use(compress());
    app.set('view cache', true);
  }

  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(bodyParser.json());

  // Multer handles file uploads  
  app.use(multer({ 
    dest: 'public/uploads/',
    rename: function (fieldname, filename) {
      return filename.replace(/\W+/g, '-').toLowerCase() + Date.now();
    },
    limits: {
      fieldNameSize: 100,
      files: 10,
      fileSize: 4194304 // 4 MB
    }
  }));

  // Allow HTTP PUT and DELETE form actions
  app.use(methodOverride('_method')); 

  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret
  }));


  // Configure the flash messages middleware
  app.use(flash());
  // Make flash available on all responses
  app.use(function(req, res, next) {
    res.locals.success = req.flash('success');
    res.locals.info = req.flash('info');
    res.locals.warning = req.flash('warning');
    res.locals.error = req.flash('error');
    res.locals.userFullName = req.user ? req.user.firstName + ' ' + req.user.lastName : '';
    next();
  });

  // Configure the Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());


  require(prepend_basedir('app/routes/static-pages.server.routes.js'))(app);
  require(prepend_basedir('app/routes/users.server.routes.js'))(app);
  require(prepend_basedir('app/routes/posts.server.routes.js'))(app);
  require(prepend_basedir('app/routes/tags.server.routes.js'))(app);
  require(prepend_basedir('app/routes/uploads.server.routes.js'))(app);
  require(prepend_basedir('app/routes/admin.server.routes.js'))(app);

  app.use(express.static(prepend_basedir('public')));

  return app;
};

