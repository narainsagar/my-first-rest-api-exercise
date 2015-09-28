/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
var User = require('../api/user/user.model');
var Project = require('../api/project/project.model');
var Issue = require('../api/issue/issue.model');
var Comment = require('../api/comment/comment.model');

var Test = {
users: [],
projects: [],
issues: [],
comments: [],

printUsers: function() {
  var _this = this;
  console.log('users:', _this.users.length);
  _this.users.forEach(function(user) {
    console.log(user);
  });
},

printProjects: function() {
  var _this = this;
  console.log('projects:', _this.projects.length);
  _this.projects.forEach(function(project) {
    console.log(project);
  });
},

printIssues: function() {
  var _this = this;
  console.log('issues:', _this.issues.length);
  _this.issues.forEach(function(issue) {
    console.log(issue);
  });
},

printComments: function() {
  var _this = this;
  console.log('comments:', _this.comments.length);
  _this.comments.forEach(function(comment) {
    console.log(comment);
  });
},


newUser: function(em, pass) {
  var user = new User({email: em, password: pass});
  this.users.push(user);
  return user;
},

createUsers: function(User, callback) {
  var _this = this;
  User.remove().exec().then(function() {

  });
  
  _this.newUser('test@gmail.com', 'test');
  _this.newUser('admin@gmail.com', 'admin');
  _this.newUser('narain@gmail.com', 'narain');
  _this.users.forEach(function(user) {
    user.save();
  });
  callback();

},

newProject: function(tit, own, usrs) {
  var project = new Project({title: tit, owner: own, users: usrs});
  this.projects.push(project);
  return project;
},

createProjects: function(Project, callback) {
  var _this = this;
  Project.remove().exec().then(function() {

  });
  _this.newProject('test project1', _this.users[0]._id, _this.users[1]._id);
  _this.newProject('test project2', _this.users[1]._id, _this.users[0]._id);
  _this.newProject('test project3', _this.users[1]._id, _this.users[2]._id);

  _this.projects.forEach(function(project) {
    project.save();
  });

  callback();

},

newIssue: function(tit, proj, own, assign) {
  var issue = new Issue({title: tit, project: proj, owner: own, assignee: assign, state: true});
  this.issues.push(issue);
  return issue;
},

createIssues: function(Issue, callback) {

  var _this = this;
  Issue.remove().exec().then(function() {

  });
  _this.newIssue('test issue1', _this.projects[0]._id, _this.users[0]._id, _this.users[1]._id);
  _this.newIssue('test issue2', _this.projects[1]._id, _this.users[1]._id, _this.users[0]._id);
  _this.newIssue('test issue3', _this.projects[1]._id, _this.users[1]._id, _this.users[2]._id);

  _this.issues.forEach(function(issue) {
    issue.save();
  });
  
  callback();

},

newComment: function(cont, iss, user) {
  var comment = new Comment({content: cont, commentedOn: iss, postedBy: user});
  this.comments.push(comment);
  return comment;
},

createComments: function(Comment, callback) {

  var _this = this;
  Comment.remove().exec().then(function() {

  });
  _this.newComment('test comment1', _this.issues[0]._id, _this.users[0]._id);
  _this.newComment('test comment2', _this.issues[1]._id, _this.users[1]._id);
  _this.newComment('test comment3', _this.issues[1]._id, _this.users[2]._id);

  _this.comments.forEach(function(comment) {
    comment.save();
  });
  
  callback();

}

};

Test.createUsers(User, function() {
//  Test.printUsers();
  console.log('finished populating users');
  Test.createProjects(Project, function() {
  //  Test.printProjects();
    console.log('finished populating projects');
    Test.createIssues(Issue, function() {
    //  Test.printIssues();
      console.log('finished populating issues');
      Test.createComments(Comment, function() {
      //  Test.printComments();
        console.log('finished populating comments');
      });
    });
  });
});