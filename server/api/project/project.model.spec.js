'use strict';

var should = require('should');
var app = require('../../app');
var Project = require('./project.model');

describe('Project Model', function() {

  var project = {};

  describe('begin', function(done) {

    it('should begin with no projects', function(done) {
      Project.find({}, function(err, projects) {
        projects.should.have.length(0);
        done();
      });
    });

  });

  describe('auto adding and removing', function() {

    beforeEach(function(done) {
      // Clear users before testing
      project = new Project({
        title: 'example_project',
        owner: '1',
        created: '08-09-2015',
        updated: '08-09-2015',
        users: ['1']
      });

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
      project.save(function(err) {
        should.not.exist(err);
        done();
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
      //  console.log('ERROR:', err.errors.title.message);
        should.exist(err);
        done();
      });
    });


    it('should fail when saving without an project owner', function(done) {
      project.owner = '';
      project.save(function(err) {
      //  console.log('ERROR:', err.errors.owner.message);
        should.exist(err);
        done();
      });
    });

    it('should update project title to new one', function(done) {
      project.title = 'test_project';
      project.update(project, function(err) {
      //  console.log('ERROR:', err.errors.title.message);
        should.not.exist(err);
        done();
      });
    });

    it('should have 1 project count', function(done) {
      Project.find({}, function(err, users) {
        users.should.have.length(1);
        done();
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