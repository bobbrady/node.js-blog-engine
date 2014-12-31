/**
 * xiao-blog - a small footprint blog designed for personal use
 * Copyright (c) 2014-2015, Bob Brady. 
 * Usage permitted under the terms of The MIT License, (MIT) 
 * https://github.com/bobbrady/xiao-blog
 */


/* jshint node: true */
"use strict";

var mongoose = require('mongoose'),
marked = require('marked'),
Post = mongoose.model('Post');

var getErrorMessage = function(err) {
  if(err.errors) {
    for (var errName in err.errors) {
      if(err.errors[errName].message) {
        return err.errors[errName].message;
      }
    }
  } else {
    return 'An unknown error was encountered';
  }
};

exports.list = function(req, res) {
  var options = buildPaginationOptions(req);
  Post.paginate(options, function(err, pagerInput) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      var pager = buildPager(pagerInput);
      markupToHtml(pager);
      res.render('index', {
        posts: pager.posts,
        lessThanTime: pager.lessThanTime,
        greaterThanTime: pager.greaterThanTime,
        pages: pager.pages,
        page: pager.page,
        nextPage: pager.nextPage,
        prevPage: pager.prevPage,
        userFullName: req.user ? req.user.firstName + ' ' + req.user.lastName : '',
      });    
    }
  });
};  

exports.listByTag = function(req, res) {
  var options = buildPaginationOptions(req);
  options.criteria.tags = req.tagName;
  Post.paginate(options, function(err, pagerInput) {
    if (err) {
      return res.status(400).send({
        message: getErrorMessage(err)
      });
    } else {
      var pager = buildPager(pagerInput);
      markupToHtml(pager);
      res.render('tag', {
        posts: pager.posts,
        lessThanTime: pager.lessThanTime,
        greaterThanTime: pager.greaterThanTime,
        pages: pager.pages,
        page: pager.page,
        nextPage: pager.nextPage,
        prevPage: pager.prevPage,
        tagName: pager.tagName,
        userFullName: req.user ? req.user.firstName + ' ' + req.user.lastName : '',
      });    
    }});
};  

exports.read = function(req, res) {
  var post = req.post;
  post.content = marked(post.content);
  res.render('post', {
    post: post,
    userFullName: req.user ? req.user.firstName + ' ' + req.user.lastName : ''
  });
};

exports.postBySlug = function(req, res, next, slug) {
  Post.findOne({ slug: slug })
  .populate('author', 'firstName lastName username')
  .exec(function (err, post) {
    if (err) {
      return next(err);
    }
    if (!post) {
      return next(new Error('Failed to find post with slug ' + slug));
    }
    req.post = post;
    next();
  });
};

exports.postsByTag = function(req, res, next, tagName) {
     req.tagName = tagName;
     next();
};  


function buildPaginationOptions(req) {
  var options = {};
  options.page = req.param('page') > 1 ? parseInt(req.param('page'), 10) : 1; 
  options.lessThanTime = req.query.lessThanTime; 
  options.greaterThanTime = req.query.greaterThanTime; 

  var defaults = {
    perPage           : 4,    // Number of posts to display on each page.
    page              : 1,    // Initial page number.
    lessThanTime      : 0,    // Time in milliseconds, resulting posts created before this time
    greaterThanTime   : 0,    // Time in milliseconds, resulting posts created after this time
    criteria          : {published: true}
  };

  options = options || defaults;
  options.perPage = options.perPage || defaults.perPage;
  options.page = options.page || defaults.page;
  options.lessThanTime = options.lessThanTime || defaults.lessThanTime;
  options.greaterThanTime = options.greaterThanTime || defaults.greaterThanTime;
  options.criteria = options.criteria || defaults.criteria;
  return options;
}

function markupToHtml(pager) {
      /* jshint regexp:true */
      for (var idx = 0; idx < pager.posts.length; idx++) {
        var html = marked(pager.posts[idx].content);
        var excerpt = String(html).replace(/<\/?[^>]+>/gi, '');
        excerpt = excerpt.replace(/(\r\n|\n|\r)+/gm, ' ');
        excerpt = excerpt.split(' ').slice(0,50).join(' ');
        pager.posts[idx].excerpt = excerpt + "...";
      }
       /* jshint regexp:false */
}


function buildPager(pagerInput) {
        var pager = {};
        pager.page = pagerInput.options.page;
        pager.pages = Math.ceil(pagerInput.count /pagerInput.options.perPage);
        pager.nextPage = pager.page < pager.pages ? pager.page + 1 : 0;
        pager.prevPage = pager.page > 1 ? pager.page - 1 : 0;
        pager.tagName = pagerInput.options.criteria.tags;
        var posts = pagerInput.posts;
        if (posts && posts.length > 0) {
          // If getting previous page, reverse page list to be descending
          if (pagerInput.sortType === 'created') {
            posts.reverse();
          }
          pager.lessThanTime = posts[posts.length - 1].created.getTime();
          pager.greaterThanTime = posts[0].created.getTime();
        } else {
          pager.lessThanTime = 0;
          pager.greaterThanTime = 0;
        }
        pager.posts = posts;
        return pager;
}

