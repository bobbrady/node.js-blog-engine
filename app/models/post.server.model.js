/**
 * xiao-blog - a small footprint blog designed for personal use
 * Copyright (c) 2014-2015, Bob Brady. 
 * Usage permitted under the terms of The MIT License, (MIT) 
 * https://github.com/bobbrady/xiao-blog
 */


/* jshint node: true */
"use strict";

var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: 'Title must be provided',
    unique: true,
    validate: [
      function(title) {
      return title.length<=120;
    },
    'Title exceeds 120 character max limit'
    ]
  },
  description: {
    type: String,
    trim: true,
    required: 'Description must be provided'
  },
  created: {
    type: Date,
    default: Date.now
  },
  content: String,
  published: {
    type: Boolean,
    default: false
  },
  slug: {
    type: String
  },
  author: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  tags: [{
    type:String,
    lowercase: true,
    trim:true
  }],
  coverImage: String,
  uploads: [String]
});

/*
 * Thanks to mathewbyme for the slugify snippet
 *
 * https://gist.github.com/mathewbyrne/1280286
 *
 */
function slugify(text) {
  return text.toString().toLowerCase()
  .replace(/\s+/g, '-')         // Replace spaces with -
  .replace(/[^\w\-]+/g, '')      // Remove all non-word chars
  .replace(/\-\-+/g, '-')         // Replace multiple - with single -
  .replace(/^-+/, '')          // Trim - from start of text
  .replace(/-+$/, '');         // Trim - from end of text
}

PostSchema.pre('save', function (next) {
  this.slug = slugify(this.title);
  for(var i = 0; i < this.tags.length; i++) {
    this.tags[i] = this.tags[i].replace(/\s+/g, '-').toLowerCase();
  }
  next(); 
});

PostSchema.statics.paginate = function(options, callback) {
  // Use mongoose sort format: "-propertyName" means descending, "propertyName" means ascending
  var sortType = '-created', 
  queryCriteria = options.criteria || {};
  if (options.lessThanTime) {
    queryCriteria.created = {"$lt": new Date(parseInt(options.lessThanTime, 10))};
  } else if (options.greaterThanTime) {
    queryCriteria.created = {"$gt": new Date(parseInt(options.greaterThanTime, 10))};
    // Do sort ascending by date so we get the immediately previous records and not the latest ones 
    sortType = 'created';
  }
  var Post = this;
  Post 
  .find(queryCriteria)
  .sort(sortType)
  .populate('author', 'firstName lastName username')
  .limit(options.perPage)
  .exec(function(err, posts) {
    if (err) {
      callback(err, {});
      return;
    } else {
      // Get count in the callback so we know if more pages exist
      delete queryCriteria.created;
      Post.count(queryCriteria)
      .exec(function (err, count) {
        var pagerInput = {"count": count, "posts": posts, "options": options, "sortType": sortType};
        callback(err, pagerInput);
      });
    }
  });
};

mongoose.model('Post', PostSchema);
