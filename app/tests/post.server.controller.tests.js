/*jshint expr: true*/

/*
 * Unit tests for the User Mongoose model
 */

var app = require('../../server.js'),
    chai = require('chai'),
    assert = chai.assert,
    should = chai.should(),
    request = require('supertest'),
    mongoose = require('mongoose'),
    Post = mongoose.model('Post'),
    User = mongoose.model('User');

var post;

describe('post.server.controller.tests: List Posts unit tests', function() {

    beforeEach(function(done) {
        user = new User({
            firstName: 'FrstName',
            lastName: 'LastName',
            username: 'username',
            email: 'username@example.com',
            password: 'password',
            provider: 'local'
        });
        user.save(function(err) {
            assert.isNull(err);
            post = new Post({
                title: 'My Title',
                description: 'My description',
                content: '#My content,',
                tags: ['tag1'],
                published: true,
                author: user.id
            });
            post.save(function(err) {
                assert.isNull(err);
                assert.isNotNull(post.id);
                done();
            });
        });
    });

    it('Should be able to list published Posts without problems', function(done) {
        request(app).get('/blog')
            .set('Accept', 'text/html')
            .expect(200)
            .end(function(err, res) {
				should.not.exist(err);	
				should.exist(res);	
                res.text.should.match(/href="\/blog\/my-title/);
                res.text.should.match(/href="\/blog\/tags\/tag1/);
                res.text.should.match(/Category: Tag1/);
                res.text.should.match(/My Title/);
                done();
            });
    });

    afterEach(function(done) {
        Post.remove().exec();
        User.remove().exec();
        done();
    });

});
