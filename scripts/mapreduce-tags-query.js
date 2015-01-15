/********************************************************************
 * mapreduce-tags-query.js
 *
 * Purpose: Commandline utility to query the blog post tags 
 *          mapreduce output collection.
 *
 * Input: The mongodb connection properties, tag mapreduce collection name
 *
 * Output: Console dump of the {_id : TAG_NAME, count : TOTAL_COUNTS} 
 *         collection
 *
 ********************************************************************/

/* jshint node: true */
"use strict";

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/xiao-blog');

var db = mongoose.connection;

db.on('error', function (err) {
  console.log('connection error', err);
});
db.once('open', function () {
  console.log('connected.');
});


var Schema = mongoose.Schema;
var tagSchema = new Schema({
  _id: String,
  value : {count : Number}
});

var Tag = mongoose.model('Tag', tagSchema, 'post_tags');

// Find all tags.
Tag.find(function(err, tags) {
  if (err) {
    return console.error(err);
  }
  console.dir(tags);
  for(var idx = 0; idx < tags.length; idx++) {
    console.log("tag name: " + tags[idx]._id + ", " + "tag count: " + tags[idx].value.count);
  }
  // Exit with success code
  process.exit(0);
});
