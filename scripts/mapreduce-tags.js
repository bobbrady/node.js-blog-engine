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
var db = mongojs('xiao-blog', ['posts', 'post_tags']);

var map = function () {
  this.tags.forEach(function(tag) {
    emit(tag, 1);
  });
};

var reduce = function(tag, count) {
  return Array.sum(count);
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
  var max = Math.max.apply(Math,docs.map(function(doc){return doc.value;}));
  var min = Math.min.apply(Math,docs.map(function(doc){return doc.value;}));
  var diff = max - min === 0 ? 1 : max - min;
  console.log("max: " + max + ", min: " + min + ", diff: " + diff);
  for(var idx = 0; idx < docs.length; idx++) {
    var normalizedCount = 1 + (docs[idx].value - min) / diff; 
    db.post_tags.update({_id: docs[idx]._id}, {$set: { normalizedCount:  normalizedCount}});
    console.log(docs[idx]);
  }
  process.exit(0);
});

