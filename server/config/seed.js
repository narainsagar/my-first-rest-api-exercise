/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
var User = require('../api/user/user.model');
var Thing = require('../api/thing/thing.model');
var Project = require('../api/project/project.model');
var Issue = require('../api/issue/issue.model');

Thing.find({}).remove(function() {
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
});

User.find({}).remove(function() {
  User.create({
    email: 'test@gmail.com',
    password: 'test'
  }, {
    email: 'admin@gmail.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
    }
  );
});


Project.find({}).remove(function() {
  Project.create({
      title: 'test_project1',
      owner: function() { User.findOne({email: 'test@gmail.com'}, function (err, user) {
        if(err) return null;
        else return user._id;
      });},
      users: function() { User.findOne({email: 'admin@gmail.com'}, function (err, user) {
        if(err) return null;
        else return user._id;
      });}
  }, {
      title: 'test_project2',
      owner: function() { User.findOne({email: 'admin@gmail.com'}, function (err, user) {
        if(err) return null;
        else return user._id;
      });},
      users: function() { User.findOne({email: 'test@gmail.com'}, function (err, user) {
        if(err) return null;
        else return user._id;
      });}
  }, function() {
      console.log('finished populating projects');
    }
  );
});

Issue.find({}).remove(function() {
  Issue.create({
      title: 'test_issue1',
      description: 'Its just a test project',
      project: function() { Project.findOne({title: 'test_project1'}, function (err, project) {
        if(err) return null;
        else return project._id;
      });},
      creator: function() { User.findOne({email: 'test@gmail.com'}, function (err, user) {
        if(err) return null;
        else return user._id;
      });},
      assignee: function() { User.findOne({email: 'admin@gmail.com'}, function (err, user) {
        if(err) return null;
        else return user._id;
      });},
      state: true
  },{
      title: 'test_issue2',
      description: 'Its just a test project',
      project: function() { Project.findOne({title: 'test_project2'}, function (err, project) {
        if(err) return null;
        else return project._id;
      });},
      creator: function() { User.findOne({email: 'admin@gmail.com'}, function (err, user) {
        if(err) return null;
        else return user._id;
      });},
      assignee: function() { User.findOne({email: 'test@gmail.com'}, function (err, user) {
        if(err) return null;
        else return user._id;
      });},
      state: true
  }, function() {
      console.log('finished populating issues');
    }
  );
});