/**
 * xiao-blog - a small footprint blog designed for personal use
 * Copyright (c) 2014-2015, Bob Brady. 
 * Usage permitted under the terms of The MIT License, (MIT) 
 * https://github.com/bobbrady/xiao-blog
 */


/* jshint node: true */
"use strict";

var https = require('https'),
xoauth2 = require('xoauth2'),
nodemailer = require("nodemailer");

var generator = xoauth2.createXOAuth2Generator({
  user: 'user@gmail.com', // gmail email address for sender account
  clientId: 'YOUR_GOOGLE_APPS_CLIENT_ID', 
  clientSecret: 'YOUR_GOOGLE_APPS_CLIENT_SECRET',
  refreshToken: 'YOUR_GOOGLE_APPS_REFRESH_TOKEN'
});

// listen for token updates
generator.on('token', function(token){
  // TODO: replace with logger.info from log4js
  //console.log('New token for %s: %s', token.user, token.accessToken);
});

// login
var transporter = nodemailer.createTransport(({
  service: 'gmail',
  auth: {
    xoauth2: generator
  }
}));


exports.contact = function(req, res) {
  verifyRecaptcha(req.body.recaptcha, function(jsonData) {
    if (jsonData && jsonData.success) {
      res.json(jsonData);
      sendMail(req.body.contactName, req.body.contactMessage, req.body.contactEmail);
    } else {
      res.json(JSON.stringify({ success: false, error: "Incorrect Captcha response, please try again." }));
    }
  });
};

exports.contactForm = function(req, res) {
  res.render('contact.html');
};

function sendMail(contactName, contactMessage, contactEmail) {
  // send mail
  transporter.sendMail({
    from: 'user@gmail.com', // Any from email address
    to: 'user@gmail.com', // Any to email address
    subject: 'hello world! from ' + contactName,
    text: 'Authenticated with OAuth2 name: ' + contactName + ", contactMessage: "  + 
      contactMessage + ', contactEmail: ' + contactEmail
  });
}

var SECRET = "Google recaptcha secret here";
// Helper function to make API call to recatpcha and check response
function verifyRecaptcha(key, callback) {
  https.get("https://www.google.com/recaptcha/api/siteverify?secret=" + SECRET + "&response=" + key, function(res) {
    var data = "";
    res.on('data', function (chunk) {
      data += chunk.toString();
    });
    res.on('end', function() {
      try {
        var jsonData = JSON.parse(data);
        callback(jsonData);
      } catch (e) {
        callback(false);
      }
    });
  });
}

