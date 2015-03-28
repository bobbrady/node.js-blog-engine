/*jshint expr: true*/

/*
 * Unit tests for the Post controller
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

    it('Should be able to render an entire published Post without problems', function(done) {
        request(app).get('/blog/my-title')
            .set('Accept', 'text/html')
            .expect(200)
            .end(function(err, res) {
                should.not.exist(err);
                should.exist(res);
                res.text.should.match(/href="\/blog\/tags\/tag1/);
                res.text.should.match(/Category: Tag1/);
                res.text.should.match(/My Title/);
                res.text.should.match(/My description/);
                res.text.should.match(/My content/);
                done();
            });
    });


    it('Should not list unpublished Posts', function(done) {
        post = new Post({
            title: 'My Unpublished Title',
            description: 'My unpublished description',
            content: '#My unpublished content,',
            tags: ['tag2'],
            published: false,
            author: user.id
        });
        post.save(function(err) {
            assert.isNull(err);
            assert.isNotNull(post.id);
            request(app).get('/blog')
                .set('Accept', 'text/html')
                .expect(200)
                .end(function(err, res) {
                    should.not.exist(err);
                    should.exist(res);
                    res.text.should.not.match(/href="\/blog\/my-unpublished-title/);
                    res.text.should.not.match(/href="\/blog\/tags\/tag2/);
                    res.text.should.not.match(/Category: Tag2/);
                    res.text.should.not.match(/My Unpublished Title/);
                    done();
                });
        });
    });

    it('Should not render an unpublished Post', function(done) {
        post = new Post({
            title: 'My Unpublished Title',
            description: 'My unpublished description',
            content: '#My unpublished content,',
            tags: ['tag2'],
            published: false,
            author: user.id
        });
        post.save(function(err) {
            assert.isNull(err);
            assert.isNotNull(post.id);
            request(app).get('/blog/my-unpublished-post')
                .set('Accept', 'text/html')
                .expect(200)
                .end(function(err, res) {
                    should.exist(err);
                    should.exist(res);
                    res.text.should.not.match(/href="\/blog\/my-unpublished-title/);
                    res.text.should.not.match(/href="\/blog\/tags\/tag2/);
                    res.text.should.not.match(/Category: Tag2/);
                    res.text.should.not.match(/My Unpublished Title/);
                    res.text.should.not.match(/My unpublished description/);
                    res.text.should.not.match(/My unpublished content/);
                    res.text.should.match(/500: Internal Server Error/);
                    done();
                });
        });
    });

    it('Should not render a non-existent Page', function(done) {
        request(app).get('/foo-non-existent-page')
            .set('Accept', 'text/html')
            .expect(200)
            .end(function(err, res) {
                should.exist(err);
                should.exist(res);
                res.text.should.match(/404: Page not Found/);
                done();
            });
    });

    it('Should not render a non-existent Post', function(done) {
        request(app).get('/blog/my-nonexistent-post')
            .set('Accept', 'text/html')
            .expect(200)
            .end(function(err, res) {
                should.exist(err);
                should.exist(res);
                res.text.should.match(/500: Internal Server Error/);
                done();
            });
    });

    afterEach(function(done) {
        Post.remove().exec();
        User.remove().exec();
        done();
    });

});
