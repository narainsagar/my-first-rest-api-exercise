'use strict';

var should = require('should');
var app = require('../../app');
var User = require('./../user/user.model');
var Project = require('./../project/project.model');
var Issue = require('./../issue/issue.model');
var Comment = require('./comment.model');

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

testProject.save();

var testIssue = new Issue({
  title: 'test_issue1',
  description: 'this is a test issue1.',
  project: testProject._id,
  assignee: bhavesh._id,
  creator: narain._id,
  state: true
});

testIssue.save();

describe('Comment Model', function() {

  var testComment = {};

  describe('begin', function(done) {

    it('delete all', function() {
      Comment.remove().exec().then(function() {
        done();
      });
    });

    it('should begin with no comments', function(done) {
      Comment.find({}, function(err, comments) {
        comments.should.have.length(0);
        done();
      });
    });

  });

  describe('auto adding and removing', function() {

    beforeEach(function(done) {
      testComment = new Comment({
        content: 'test_comment1',
        commentedOn: testIssue._id,
        postedBy: narain._id
      });
      testComment.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    afterEach(function(done) {
      Comment.remove().exec().then(function() {
        done();
      });
    });

    it('should have required properties', function(done) {
        Comment.find(testComment, function(err, comments) {
          should.not.exist(err);
          comments.should.have.length(1);
          comments[0].should.have.property('content');
          comments[0].should.have.property('commentedOn');
          comments[0].should.have.property('postedBy');
          comments[0].should.have.property('created');
          comments[0].should.have.property('updated');
          done();
        });
    });

    it('should create and save a new comment', function(done) {
      Comment.remove().exec().then(function() {
        testComment.save(function(err) {
          should.not.exist(err);
          done();
        });
      });
    });

    it('should fail when saving a duplicate comment', function(done) {
      testComment.save(function(err) {
        should.not.exist(err);
        var commentDup = new Comment(testComment);
        commentDup.save(function(err) {
          should.exist(err);
          done();
        });
      });
    });

    it('should fail when saving without an comment content', function(done) {
      testComment.content = '';
      testComment.save(function(err) {
        should.exist(err);
        done();
      });
    });


    it('should fail when saving without an comment commentedOn/issue', function(done) {
      testComment.commentedOn = null;
      testComment.save(function(err) {
        should.exist(err);
        done();
      });
    });

    it('should fail when saving without an comment creator / postedBy', function(done) {
      testComment.postedBy = null;
      testComment.save(function(err) {
        should.exist(err);
        done();
      });
    });

    it('should update comment title to new one', function(done) {
      testComment.title = 'example_comment';
      testComment.update(testComment, function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should have 1 comment count', function(done) {
      Comment.find({}, function(err, comments) {
        comments.should.have.length(1);
        done();
      });
    });

    it('should remove a Comment', function(done) {
      Comment.find(testComment, function(err, comment) {
        comment.should.have.length(1);
        Comment.remove(testComment, function(err) {
          should.not.exist(err);
          Comment.find({}, function(err, comment) {
            comment.should.have.length(0);
            done();
          });
        });
      });
        
    });

  });
    
});