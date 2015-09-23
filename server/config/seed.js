/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
var User = require('../api/user/user.model');
var Thing = require('../api/thing/thing.model');
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

  _this.comments.forEach(function(comment) {
    comment.save();
  });
  
  callback();

}

};

Test.createUsers(User, function() {
  Test.printUsers();
  Test.createProjects(Project, function() {
    Test.printProjects();
    Test.createIssues(Issue, function() {
      Test.printIssues();
      Test.createComments(Comment, function() {
        Test.printComments();
      });
    });
  });
});
  
  

    // User.find({}).remove(function() {
  //   User.create({
  //     email: 'test@gmail.com',
  //     password: 'test'
  //   }, {
  //     email: 'admin@gmail.com',
  //     password: 'admin'
  //   }, function() {
  //       console.log('finished populating users');
  //       callback();
  //     }
  //   );
  // });


    // Project.find({}).remove(function() {
  //   Project.create({
  //       title: 'test_project1',
  //       owner: function() { User.findOne({email: 'test@gmail.com'}, function (err, user) {
  //         if(err) return null;
  //         else return user._id;
  //       });},
  //       users: function() { User.findOne({email: 'admin@gmail.com'}, function (err, user) {
  //         if(err) return null;
  //         else return user._id;
  //       });}
  //   }, {
  //       title: 'test_project2',
  //       owner: function() { User.findOne({email: 'admin@gmail.com'}, function (err, user) {
  //         if(err) return null;
  //         else return user._id;
  //       });},
  //       users: function() { User.findOne({email: 'test@gmail.com'}, function (err, user) {
  //         if(err) return null;
  //         else return user._id;
  //       });}
  //   }, function() {
  //       console.log('finished populating projects');
  //       callback();
  //     }
  //   );
  // });

// Issue.find({}).remove(function() {
  //   Issue.create({
  //       title: 'test_issue1',
  //       description: 'Its just a test project',
  //       project: function() { Project.findOne({title: 'test_project1'}, function (err, project) {
  //         if(err) return null;
  //         else return project._id;
  //       });},
  //       creator: function() { User.findOne({email: 'test@gmail.com'}, function (err, user) {
  //         if(err) return null;
  //         else return user._id;
  //       });},
  //       assignee: function() { User.findOne({email: 'admin@gmail.com'}, function (err, user) {
  //         if(err) return null;
  //         else return user._id;
  //       });},
  //       state: true
  //   },{
  //       title: 'test_issue2',
  //       description: 'Its just a test project',
  //       project: function() { Project.findOne({title: 'test_project2'}, function (err, project) {
  //         if(err) return null;
  //         else return project._id;
  //       });},
  //       creator: function() { User.findOne({email: 'admin@gmail.com'}, function (err, user) {
  //         if(err) return null;
  //         else return user._id;
  //       });},
  //       assignee: function() { User.findOne({email: 'test@gmail.com'}, function (err, user) {
  //         if(err) return null;
  //         else return user._id;
  //       });},
  //       state: true
  //   }, function() {
  //       console.log('finished populating issues');
  //       callback();
  //     }
  //   );
  // });

/* Thing.find({}).remove(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  });
}); */

