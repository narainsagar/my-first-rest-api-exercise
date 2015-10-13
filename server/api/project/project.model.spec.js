'use strict';

var should = require('should');
var app = require('../../app');
var TestData = require('../../config/TestData.js').TestData;
var Project = require('./project.model');

var project = {};

describe('Project Model', function() {

  describe('begin', function(done) {

    it('delete all', function() {
      Project.remove().exec().then(function() {
        done();
      });
    });

    it('should begin with no projects', function(done) {
      Project.find({}, function(err, projects) {
        projects.should.have.length(0);
        done();
      });
    });

  });

  describe('auto adding and removing', function() {

    beforeEach(function(done) {
      TestData.init(false);
      TestData.users[0].save();
      TestData.users[1].save();

      project = TestData.projects[0];
      project.save(function(err) {
        should.not.exist(err);
        done();
      });
    });

    afterEach(function(done) {
      Project.remove().exec().then(function() {
        done();
      });
    });

    it('should have required properties', function(done) {
        Project.find(project, function(err, projects) {
          should.not.exist(err);
          projects.should.have.length(1);
          projects[0].should.have.property('title');
          projects[0].should.have.property('owner');
          projects[0].should.have.property('created');
          projects[0].should.have.property('updated');
          projects[0].should.have.property('users');
          done();
        });
    });

    it('should create and save a new project', function(done) {
      Project.remove().exec().then(function() {
        project.save(function(err) {
          should.not.exist(err);
          done();
        });
      });
    });

    it('should fail when saving a duplicate project', function(done) {
      project.save(function(err) {
        should.not.exist(err);
        var projectDup = new Project(project);
        projectDup.save(function(err) {
          should.exist(err);
          done();
        });
      });
    });

    it('should fail when saving without an project title', function(done) {
      project.title = '';
      project.save(function(err) {
        should.exist(err);
        done();
      });
    });


    it('should fail when saving without an project owner', function(done) {
      project.owner = null;
      project.save(function(err) {
        should.exist(err);
        done();
      });
    });

    it('should update project title to new one', function(done) {
      project.title = 'example_project';
      project.update(project, function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should have 1 project count', function(done) {
      Project.find({}, function(err, projects) {
        projects.should.have.length(1);
        done();
      });
    });

    it('should have 1 project user/follower', function(done) {
      Project.find({}, function(err, projects) {
        projects[0].users.should.have.length(1);
        done();
      });
    });

    it('should be able to add project user (follower)', function(done) {
      project.users.push(TestData.users[0]._id);
      project.save(function(err) {
        Project.find({}, function(err, projects) {
          projects[0].users.should.have.length(2);
          done();
        });
      });
    });

    it('should remove a project', function(done) {
      Project.find(project, function(err, project) {
        project.should.have.length(1);
        Project.remove(project, function(err) {
          should.not.exist(err);
          Project.find({}, function(err, project) {
            project.should.have.length(0);
            done();
          });
        });
      });
        
    });

  });
    
});