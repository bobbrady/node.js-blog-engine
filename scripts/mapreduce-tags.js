/***************************************************************
 * mapreduce-tags.js
 *
 * Purpose: performs mapreduce operation on blog post documents
 *          to group post tags by their counts
 *
 * Usage: node mapreduce-tags.js
 *        Can be run manually on commandline or as cron job
 *
 * Input: mongodb connection properties, post collection name, 
 *        mapreduce collection name
 *
 * Output: mapreduce collection populated with tag counts:
 *            {_id : TAG_NAME, count : totalCounts}
 *
 *
 ************************************************************/

/* jshint node: true */
"use strict";

var mongojs = require('mongojs');
//var db = mongojs('test', ['posts', 'post_tags']);
var db = mongojs('xiao-blog', ['posts', 'post_tags']);

var map = function () {
  this.tags.forEach(function(tag) {
    emit(tag, {count: 1});
  });
};

var reduce = function(key, values) {
  var totalCount = 0;
  values.forEach(function(value) {
    totalCount++;
  });
  return {count: totalCount};
};

db.posts.mapReduce(
  map,
  reduce,
  {
    out : "post_tags"
  }
);

db.post_tags.find(function (err, docs) {
  if(err) {
    console.log(err);
  }
  console.log(docs);
  process.exit(0);
});

