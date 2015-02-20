Title: Xiao Blog: A Node.js blog engine that's simple and easy to use  

# Xiao Blog: A Node.js blog engine that's simple and easy to use.

![Xiao Blog Engine Architecture](https://github.com/bobbrady/xiao-blog/blob/master/public/img/xiaoblog-stack-640.jpg)

Are you looking for a simple blog platform that uses a Node.js, Express, Mongoose, and MongoDB stack?
Want an [MVP](http://en.wikipedia.org/wiki/Minimum_viable_product) [MEAN stack](http://en.wikipedia.org/wiki/MEAN) precursor app without the Hipster fluff? Well, you've come to the right place! Xiao Blog is an open source blogging platform that can be used as-is or experimented with as a gateway to learning the MEAN stack. It rests on top of the Node + Express + Mongoose/MongoDB stack with Swig template views.   

## Feature Summary

Xiao Blog has the following features:
* [Node](http://nodejs.org) + [Express](http://expressjs.com) + [Mongoose](http://mongoosejs.com)/[MongoDB](http://www.mongodb.org) + [Swig](http://paularmstrong.github.io/swig "Swig template homepage") stack
* [Bootstrap 3](http://getbootstrap.com) responsive theme 
* Modular architecture pattern (Model, View, Controller, Route) recommended by [MEAN.js](http://meanjs.org/docs.html#folder-structure")
* Markdown blog post browser editor with preview
* Featured image for posts
* Built-in comments template in every post backed by [Disqus](https://disqus.com "Disqus homepage"). 
* Built-in social sharing/following links for Twitter, Facebook and Google+  
* [Google Recaptcha](http://www.google.com/recaptcha/intro/index.html) form submittal 
* [Google API](https://code.google.com/apis/console/?pli=1) for gmail contact messages
* Tag cloud using MongoDB map/reduce for counts and font size

## How to get Started with Xiao Blog 

Installation Prerequisites:
* JavaScript: Node and npm
* MongoDB

Installation Steps

1. Make sure MongoDB is running 
      
        mongod --dbpath=/path/to/data/dir
      
2. Clone the github repo
   
        git clone https://github.com/bobbrady/xiao-blog.git
    
3. Edit the configuration file `xiao-blog/config/env/development.js` and replace `basedir: "/home/user/xiao-blog"` with  the directory where you cloned Xiao Blog.
4. Cd into the repo directory xiao-blog and run:
       
        [xiao-blog]$ npm install
        [xiao-blog]$ grunt dist-css
        [xiao-blog]$ grunt dist-js 
        [xiao-blog]$ node server.js 
      
5. Go to [http://localhost:3000/admin/signup](http://localhost:3000/admin/signup "Xiao Blog signup page"), create a local acount, and start creating posts with Xiao Blog!

Having problems? Contact me, create an issue, or submit a pull request.

## Who Did This and Why?

My name is Bob Brady (DigiBrady). I began by looking for a simple MEAN stack personal blogging platform that I could tinker with and learn by doing. Xiao Blog started simple and the features gradually expanded to what they are today.  

[Xiao (pronounced "shao")](https://translate.google.com/#zh-CN/en/%E5%B0%8F) is the pinyin for the Chinese word meaning "small".  It is used in the project name as a hat tip to all the Chinese web developers whose open source code has helped me on my MEAN stack journey.
