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

describe('Post model: Testing the save method', function() {

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
		var rawTags = ['Tag1','Tag2','Tag3'];
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
			for(var i = 0; i < post.tags.length; i++) {
				assert.strictEqual(post.tags[i], tagifiedTags[i]);
			}
            done();
        });
    });

    afterEach(function(done) {
        Post.remove(function() {
            done();
        });
    });

});

