
/**
 * Sample Test Data Object to create dummy data
 	1. users
 	2. projects
 	3. issues
 	4. comments
 **/

'use strict';

var User = require('../api/user/user.model');
var Project = require('../api/project/project.model');
var Issue = require('../api/issue/issue.model');
var Comment = require('../api/comment/comment.model');

var TestData = {

	users: [],

  	projects: [],

  	issues: [],

  	comments: [],

  	clear: function() {

  		var _this = this;
  		_this.users = [];
		_this.projects = [];
		_this.issues = [];
		_this.comments = [];

  	},

	newUser: function(em, pass) {

		var user = new User({email: em, password: pass});
		this.users.push(user);
		return user;

	},

	createUsers: function(canSave) {

		var _this = this;
		User.remove().exec().then(function() {});

		_this.newUser('narain@gmail.com', 'narain');
		_this.newUser('bhavesh@gmail.com', 'bhavesh');
		_this.newUser('admin@gmail.com', 'admin');
		

		if(canSave) {
		  _this.users.forEach(function(user) {
		    user.save();
		  });
		  console.log('finished populating users');
		}
		return;

	},

	newProject: function(tit, own, usrs) {

		var project = new Project({title: tit, owner: own, users: usrs});
		this.projects.push(project);
		return project;

	},

	createProjects: function(canSave) {

		var _this = this;
		Project.remove().exec().then(function() {});
		_this.newProject('test project1', _this.users[0]._id, _this.users[1]._id);
		_this.newProject('test project2', _this.users[1]._id, _this.users[0]._id);
		_this.newProject('test project3', _this.users[1]._id, _this.users[2]._id);

		if(canSave) {
		  _this.projects.forEach(function(project) {
		    project.save();
		  });
		  console.log('finished populating projects');
		}
		return;

	},

	newIssue: function(tit, proj, own, assign) {

		var issue = new Issue({title: tit, project: proj, owner: own, assignee: assign, state: true});
		this.issues.push(issue);
		return issue;

	},

	createIssues: function(canSave) {

		var _this = this;
		Issue.remove().exec().then(function() {});
		_this.newIssue('test issue1', _this.projects[0]._id, _this.users[0]._id, _this.users[1]._id);
		_this.newIssue('test issue2', _this.projects[1]._id, _this.users[1]._id, _this.users[0]._id);
		_this.newIssue('test issue3', _this.projects[1]._id, _this.users[1]._id, _this.users[2]._id);

		if(canSave) {
		  _this.issues.forEach(function(issue) {
		    issue.save();
		  });
		  console.log('finished populating issues');
		}
		return;

	},

	newComment: function(cont, iss, user) {

		var comment = new Comment({content: cont, commentedOn: iss, postedBy: user});
		this.comments.push(comment);
		return comment;

	},

	createComments: function(canSave) {

		var _this = this;
		Comment.remove().exec().then(function() {});
		_this.newComment('test comment1', _this.issues[0]._id, _this.users[0]._id);
		_this.newComment('test comment2', _this.issues[1]._id, _this.users[1]._id);
		_this.newComment('test comment3', _this.issues[1]._id, _this.users[2]._id);

		if(canSave) {
		  _this.comments.forEach(function(comment) {
		    comment.save();
		  });
		  console.log('finished populating comments');
		}
		return;

	},

	init: function(bool) {
		
		var _this = this;
		_this.clear();
		_this.createUsers(bool);
	  	_this.createProjects(bool);
	  	_this.createIssues(bool);
	  	_this.createComments(bool);
	  	return;

	}

};

module.exports.TestData = TestData;