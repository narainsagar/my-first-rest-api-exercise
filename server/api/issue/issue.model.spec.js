'use strict';

var should = require('should');
var app = require('../../app');
var User = require('./../user/user.model');
var Project = require('./../project/project.model');
var Issue = require('./issue.model');

var narain = new User({
  email: 'narain@gmail.com',
  password: 'password',
  created: '07-09-2015',
  updated: '07-09-2015'
});

var bhavesh = new User({
  email: 'bhavesh@gmail.com',
  password: 'password',
  created: '07-09-2015',
  updated: '07-09-2015'
});

narain.save();
bhavesh.save();

var testProject = new Project({
  title: 'test_project',
  owner: narain._id,
  created: '08-09-2015',
  updated: '08-09-2015',
  users: [bhavesh._id]
});

describe('Issue Model', function() {

  var issue = {};

  describe('begin', function(done) {

    it('delete all', function() {
      Issue.remove().exec().then(function() {
        done();
      });
    });

    it('should begin with no issues', function(done) {
      Issue.find({}, function(err, issues) {
        issues.should.have.length(0);
        done();
      });
    });

  });

  describe('auto adding and removing', function() {

    beforeEach(function(done) {
      issue = new Issue({
        title: 'test_issue',
        description: 'this is a test issue.',
        project: testProject._id,
        assignee: bhavesh._id,
        creator: narain._id,
        state: true
      });
      issue.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    afterEach(function(done) {
      Issue.remove().exec().then(function() {
        done();
      });
    });

    it('should have required properties', function(done) {
        Issue.find(issue, function(err, issues) {
          should.not.exist(err);
          issues.should.have.length(1);
          issues[0].should.have.property('title');
          issues[0].should.have.property('description');
          issues[0].should.have.property('project');
          issues[0].should.have.property('assignee');
          issues[0].should.have.property('created');
          issues[0].should.have.property('updated');
          issues[0].should.have.property('creator');
          issues[0].should.have.property('state');
          done();
        });
    });

    it('should create and save a new issue', function(done) {
      Issue.remove().exec().then(function() {
        issue.save(function(err) {
          should.not.exist(err);
          done();
        });
      });
    });

    it('should fail when saving a duplicate issue', function(done) {
      issue.save(function(err) {
        should.not.exist(err);
        var issueDup = new Issue(issue);
        issueDup.save(function(err) {
          should.exist(err);
          done();
        });
      });
    });

    it('should fail when saving without an issue title', function(done) {
      issue.title = '';
      issue.save(function(err) {
      //  console.log('ERROR:', err.errors.title.message);
        should.exist(err);
        done();
      });
    });


    it('should fail when saving without an issue creator', function(done) {
      issue.creator = null;
      issue.save(function(err) {
        should.exist(err);
        done();
      });
    });

    it('should update issue title to new one', function(done) {
      issue.title = 'example_issue';
      issue.update(issue, function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should have 1 issue count', function(done) {
      Issue.find({}, function(err, issues) {
        issues.should.have.length(1);
        done();
      });
    });

    it('should remove a issue', function(done) {
      Issue.find(issue, function(err, issue) {
        issue.should.have.length(1);
        Issue.remove(issue, function(err) {
          should.not.exist(err);
          Issue.find({}, function(err, issue) {
            issue.should.have.length(0);
            done();
          });
        });
      });
        
    });

  });
    
});