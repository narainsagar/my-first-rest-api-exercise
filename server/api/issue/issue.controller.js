/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /issues              ->  index
 * POST    /issues              ->  create
 * GET     /issues/:id          ->  show
 * PUT     /issues/:id          ->  update
 * DELETE  /issues/:id          ->  destroy
 */

'use strict';

var config = require('../../config/environment');
var _ = require('lodash');
var Issue = require('./issue.model');
var Comment = require('../comment/comment.model');

// Get a single issue
exports.show = function(req, res) {
  Issue.findById(req.params.id, function (err, issue) {
    if(err) { return handleError(res, err); }
    if(!issue) { return res.status(404).send('Not Found'); }
    return res.json(issue);
  });
};

// Updates an existing issue in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Issue.findById(req.params.id, function (err, issue) {
    if (err) { return handleError(res, err); }
    if(!issue) { return res.status(404).send('Not Found'); }
    var updated = _.merge(issue, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(issue);
    });
  });
};

// Deletes a issue from the DB.
exports.destroy = function(req, res) {
  Issue.findByIdAndRemove(req.params.id, function (err, issue) {
    if(err) { return handleError(res, err); }
    if(!issue) { return res.status(404).send('Not Found'); }
    return res.status(204).send('No Content');
  });
};

exports.getIssueComments = function(req, res) {
  var issueId = req.params.id;
  var filter = { commentedOn: req.params.id, content: req.query.content, 
    postedBy: req.query.postedBy, created: req.query.created, 
    updated: req.query.updated }; // optional..
//  console.log('filter', filter);
  Comment.find(filter, function (err, comments) {
      if(err) { return handleError(res, err); }
      if(!comments) { return res.status(404).send('Not Found'); }
      return res.status(200).json(comments);
  });
};

exports.createIssueComment = function(req, res) {
  var issueId = req.params.id;
  req.body.commentedOn = req.params.id;
  
  Comment.create(req.body, function(err, comment) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(comment);
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}