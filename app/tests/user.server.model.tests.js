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

describe('Testing the save method', function() {

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

    afterEach(function(done) {
        User.remove(function() {
            done();
        });
    });
});


/*
describe('User model Unit Tests:', function() {
    beforeEach(function(done) {
        user = new User({
            firstName: 'FrstName',
            lastName: 'LastName',
            username: 'username',
            email: 'username@example.com',
            password: 'password'
        });
        user.save(function() {
            done();
        });
    });
});
*/
