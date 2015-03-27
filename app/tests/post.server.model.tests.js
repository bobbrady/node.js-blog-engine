/*jshint expr: true*/

/*
 * Unit tests for the User Mongoose model
 */

var app = require('../../server.js'),
    chai = require('chai'),
    assert = chai.assert,
    should = chai.should(),
    Post = require('mongoose').model('Post');

var post;

describe('post.server.model.tests: Save Post unit tests', function() {

    it('Should be able to save without problems', function(done) {
        post = new Post({
            title: 'My Title',
            description: 'My description',
            content: '#My content,',
        });
        post.save(function(err) {
            assert.isNull(err);
            assert.isNotNull(post.id);
            done();
        });
    });

    it('Should get the title converted to an SEO-friendly  slug', function(done) {
        post = new Post({
            title: 'My Title',
            description: 'My description',
            content: '#My content,',
        });
        post.save(function(err) {
            assert.isNull(err);
            assert.isNotNull(post.id);
            assert.isNotNull(post.slug);
            assert.strictEqual(post.slug, Post.slugify(post.title));
            done();
        });
    });

    it('Should convert a CSV list of tags to a string array of tags', function(done) {
        var rawTags = ['Tag1', 'Tag2', 'Tag3'];
        var tagifiedTags = Post.tagify(rawTags);
        post = new Post({
            title: 'My Title',
            description: 'My description',
            content: '#My content,',
            tags: rawTags,
        });
        post.save(function(err) {
            assert.isNull(err);
            assert.isNotNull(post.id);
            assert.isNotNull(post.tags);
            for (var i = 0; i < post.tags.length; i++) {
                assert.strictEqual(post.tags[i], tagifiedTags[i]);
            }
            done();
        });
    });

    it('Should throw a validation error when the post title is not provided', function(done) {
        post = new Post({
            description: 'My description',
            content: '#My content,',
        });
        post.save(function(err) {
            assert.isNotNull(err);
            assert.equal(err.name, 'ValidationError');
            assert.equal(err.errors.title.path, 'title');
            done();
        });
    });

    it('Should throw a validation error when the post title is greater than 120 char', function(done) {
        var title = '';
        for (var i = 0; i < 12; i++) {
            title.concat('0123456789');
        }
		// 121 char in title
		title.concat('1');
        post = new Post({
			title: title,
            description: 'My description',
            content: '#My content,',
        });
        post.save(function(err) {
            assert.isNotNull(err);
            assert.equal(err.name, 'ValidationError');
            assert.equal(err.errors.title.path, 'title');
            done();
        });
    });

    it('Should throw a validation error when the post description is not provided', function(done) {
        post = new Post({
            title: 'My title',
            content: '#My content,',
        });
        post.save(function(err) {
            assert.isNotNull(err);
            assert.equal(err.name, 'ValidationError');
            assert.equal(err.errors.description.path, 'description');
            done();
        });
    });

    it('Should set published boolean to false by default', function(done) {
        post = new Post({
			title: 'My title',
            description: 'My description',
            content: '#My content,',
        });
        post.save(function(err) {
            assert.isNull(err);
            assert.strictEqual(post.published, false);
            done();
        });
    });


    afterEach(function(done) {
        Post.remove(function() {
            done();
        });
    });

});
