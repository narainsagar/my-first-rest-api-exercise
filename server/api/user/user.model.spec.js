'use strict';

var should = require('should');
var app = require('../../app');
var TestData = require('../../config/TestData.js').TestData;
var User = require('./user.model');

var user = {};

describe('User Model', function() {

  describe('begin', function(done) {

    it('delete all', function() {
      User.remove().exec().then(function() {
        done();
      });
    });
    
    it('should begin with no users', function(done) {
      User.find({}, function(err, users) {
        users.should.have.length(0);
        done();
      });
    });

  });

  describe('auto adding and removing', function() {

    beforeEach(function(done) {
      TestData.init(false);
      
      user = TestData.users[0];
      user.save(function(err) {
        should.not.exist(err);
        done();
      });

    });

    afterEach(function(done) {
      User.remove().exec().then(function() {
        done();
      });
    });

    it('should have required properties', function(done) {
        User.find(user, function(err, users) {
          should.not.exist(err);
          users.should.have.length(1);
          users[0].should.have.property('email');
          users[0].should.have.property('password');
          users[0].should.have.property('created');
          users[0].should.have.property('updated');
          done();

        });
    });

    it('should create and save a new user', function(done) {
      user.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should fail when saving a duplicate user', function(done) {
      user.save(function() {
        var userDup = new User(user);
        userDup.save(function(err) {
          should.exist(err);
          done();
        });
      });
    });

    it('should fail when saving without an email', function(done) {
      user.email = '';
      user.save(function(err) {
        should.exist(err);
        done();
      });
    });

    it("should authenticate user if password is valid", function() {
      return user.authenticate(user.password).should.be.true;
    });

    it("should not authenticate user if password is invalid", function() {
      return user.authenticate('blah').should.not.be.true;
    });

    it('should update password to new one', function(done) {
      user.password = "newPassword";
      User.update(user, function(err) {
        should.not.exist(err);
        done();
      });

    });

    it('should have 1 user count', function(done) {
      User.find({}, function(err, users) {
        users.should.have.length(1);
        done();
      });
    });

    it('should remove a user', function(done) {
      User.find(user, function(err, users) {
        users.should.have.length(1);
        User.remove(user, function(err) {
          should.not.exist(err);
          User.find({}, function(err, users) {
            users.should.have.length(0);
            done();
          });
        });
      });
        
    });

  });
    
});

