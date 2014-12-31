/* jshint node: true */
"use strict";

exports.upload = function(req, res) {
  console.log(req.body); // form fields
  console.log(req.files); // form files
  res.json(req.files);
};  


