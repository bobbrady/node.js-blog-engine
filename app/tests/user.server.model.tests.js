/*jshint expr: true*/

/*
 * Unit tests for the User Mongoose model
 */

var app = require('../../server.js'),
    chai = require('chai'),
    assert = chai.assert,
    should = chai.should(),
    User = require('mongoose').model('User');

var user;

describe('user.server.model.tests: Save User unit tests', function() {

    it('Should be able to save without problems', function(done) {
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
            done();
        });
    });

    it('Should throw a validation error when email is not in valid format', function(done) {
        user = new User({
            firstName: 'FrstName',
            lastName: 'LastName',
            username: 'username',
            email: 'username@',
            password: 'password',
            provider: 'local'
        });
        user.save(function(err) {
            assert.isNotNull(err);
            assert.equal(err.name, 'ValidationError');
            assert.equal(err.errors.email.path, 'email');
            done();
        });
    });

    it('Should throw a validation error when username is < 2 char', function(done) {
        user = new User({
            firstName: 'FrstName',
            lastName: 'LastName',
            username: 'u',
            email: 'username@example.com',
            password: 'password',
            provider: 'local'
        });
        user.save(function(err) {
            assert.isNotNull(err);
            assert.equal(err.name, 'ValidationError');
            assert.equal(err.errors.username.path, 'username');
            done();
        });
    });

    it('Should throw a validation error when username is blank char', function(done) {
        user = new User({
            firstName: 'FrstName',
            lastName: 'LastName',
            username: ' ',
            email: 'username@example.com',
            password: 'password',
            provider: 'local'
        });
        user.save(function(err) {
            assert.isNotNull(err);
            assert.equal(err.name, 'ValidationError');
            assert.equal(err.errors.username.path, 'username');
            done();
        });
    });

    it('Should throw a validation error when username is no char', function(done) {
        user = new User({
            firstName: 'FrstName',
            lastName: 'LastName',
            username: '',
            email: 'username@example.com',
            password: 'password',
            provider: 'local'
        });
        user.save(function(err) {
            assert.isNotNull(err);
            assert.equal(err.name, 'ValidationError');
            assert.equal(err.errors.username.path, 'username');
            done();
        });
    });

    it('Should throw a validation error when password is < 6 char', function(done) {
        user = new User({
            firstName: 'FrstName',
            lastName: 'LastName',
            username: 'username',
            email: 'username@example.com',
            password: 'pass',
            provider: 'local'
        });
        user.save(function(err) {
            assert.isNotNull(err);
            assert.equal(err.name, 'ValidationError');
            assert.equal(err.errors.password.path, 'password');
            done();
        });
    });

    it('Should throw a validation error when authentication provider is not set', function(done) {
        user = new User({
            firstName: 'FrstName',
            lastName: 'LastName',
            username: 'username',
            email: 'username@example.com',
            password: 'password',
        });
        user.save(function(err) {
            assert.isNotNull(err);
            assert.equal(err.name, 'ValidationError');
            assert.equal(err.errors.provider.path, 'provider');
            done();
        });
    });

    afterEach(function(done) {
        User.remove(function() {
            done();
        });
    });
});


describe('user.server.model.tests: Find User Unit Tests', function() {
    beforeEach(function(done) {
        user = new User({
            firstName: 'FrstName',
            lastName: 'LastName',
            username: 'username',
            email: 'username@example.com',
            password: 'password',
            provider: 'local'
        });
        user.save(function() {
            done();
        });
    });

    it('Should find a saved user', function(done) {
        User.findOne({
            _id: user.id
        }, function(err, callbackUser) {
            assert.isNull(err);
        	assert.strictEqual(callbackUser.id, user.id);
        	assert.strictEqual(callbackUser.username, user.username);
        	assert.strictEqual(callbackUser.password, user.password);
        	assert.strictEqual(callbackUser.email, user.email);
        	assert.strictEqual(callbackUser.firstName, user.firstName);
        	assert.strictEqual(callbackUser.lastName, user.lastName);
            done();
        });
    });

    afterEach(function(done) {
        User.remove(function() {
            done();
        });
    });
});
