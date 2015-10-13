'use strict';

var should = require('should');
var app = require('../../app');
var TestData = require('../../config/TestData.js').TestData;
var Issue = require('./issue.model');

var issue = {};

describe('Issue Model', function() {

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

      TestData.init(false);
      TestData.users[0].save();
      TestData.users[1].save();
      TestData.projects[0].save();
      
      issue = TestData.issues[0];
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