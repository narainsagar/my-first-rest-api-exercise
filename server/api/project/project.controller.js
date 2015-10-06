/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /projects              ->  index
 * POST    /projects              ->  create
 * GET     /projects/:id          ->  show
 * PUT     /projects/:id          ->  update
 * DELETE  /projects/:id          ->  destroy
 */

'use strict';

var config = require('../../config/environment');
var _ = require('lodash');
var Project = require('./project.model');
//var User = require('../user/user.model');
var Issue = require('../issue/issue.model');

// Get list of projects
exports.index = function(req, res) {
  var filter = { title: req.query.title, owner: req.query.owner, 
    created: req.query.created, updated: req.query.updated }; // optional..
//  console.log('filter', filter);
  Project.find(filter, function (err, projects) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(projects);
  });
};

// Get a single project
exports.show = function(req, res) {
  Project.findById(req.params.id, function (err, project) {
    if(err) { return handleError(res, err); }
    if(!project) { return res.status(404).send('Not Found'); }
    return res.json(project);
  });
};

// Updates an existing project in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Project.findById(req.params.id, function (err, project) {
    if (err) { return handleError(res, err); }
    if(!project) { return res.status(404).send('Not Found'); }
    var updated = _.merge(project, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(project);
    });
  });
};

// Deletes a project from the DB.
exports.destroy = function(req, res) {
  Project.findByIdAndRemove(req.params.id, function (err, project) {
    if(err) { return handleError(res, err); }
    if(!project) { return res.status(404).send('Not Found'); }
    return res.status(204).send('No Content');
  });
};


// add new user to this project.
exports.addUser = function(req, res) {
  var projectId = req.params.id;
  var userId = req.body.user_id;
  Project.findById(projectId, function (err, project) {
    if (err) { return handleError(res, err); }
    if(!project) { return res.status(404).send('Not Found'); }
    project.users.push(userId);
    project.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(project);
    });
  });
};

// get all users of this project.
exports.getUsers = function(req, res) {
  var projectId = req.params.id;
  Project.findById(projectId, function (err, project) {
    if (err) { return handleError(res, err); }
    if(!project) { return res.status(404).send('Not Found'); }
    return res.status(200).json(project.users);
  });
};


// get all users of this project.
exports.removeUser = function(req, res) {
  var projectId = req.params.id;
  var userId = req.body.user_id;
  Project.findById(projectId, function (err, project) {
    if (err) { return handleError(res, err); }
    if(!project) { return res.status(404).send('Not Found'); }
    var index = -1;
    for(var i = 0; i < project.users.length && index === -1; i++) {
      if (project.users[i] === userId) {
        index = i;
      }
    }
    if(index !== -1) {
      project.users.splice(index, 1);
      project.save(function (err) {
        if (err) { return handleError(res, err); }
        return res.status(200).json(project);
      });
    }
    return res.status(404).send('Not Found');
  });
};


exports.getProjectIssues = function(req, res) {
  var projectId = req.params.id;
  var filter = { project: req.params.id, title: req.query.title, 
    description: req.query.description, assignee: req.query.assignee, 
    created: req.query.created, updated: req.query.updated, 
    creator: req.query.creator, state: req.query.state }; // optional..
//  console.log('filter', filter);
  Issue.find(filter, function (err, issues) {
      if(err) { return handleError(res, err); }
      if(!issues) { return res.status(404).send('Not Found'); }
      return res.status(200).json(issues);
  });
};

exports.createProjectIssue = function(req, res) {
  var projectId = req.params.id;
  req.body.project = req.params.id;
  Issue.create(req.body, function(err, issue) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(issue);
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}