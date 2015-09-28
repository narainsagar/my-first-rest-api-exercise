/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /comments              ->  index
 * POST    /comments              ->  create
 * GET     /comments/:id          ->  show
 * PUT     /comments/:id          ->  update
 * DELETE  /comments/:id          ->  destroy
 */

'use strict';

var config = require('../../config/environment');
var _ = require('lodash');
var Comment = require('./comment.model');

// Get list of comments
exports.index = function(req, res) {
  var filter = { commentedOn: req.params.id, content: req.query.content, 
    postedBy: req.query.postedBy, created: req.query.created, 
    updated: req.query.updated }; // optional..
//  console.log('filter', filter);
  Comment.find(filter, function (err, comments) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(comments);
  });
};

// Get a single comment
exports.show = function(req, res) {
  Comment.findById(req.params.id, function (err, comment) {
    if(err) { return handleError(res, err); }
    if(!comment) { return res.status(404).send('Not Found'); }
    return res.json(comment);
  });
};

// Creates a new comment in the DB.
exports.create = function(req, res) {
  Comment.create(req.body, function(err, comment) {
    if(err) { return handleError(res, err); }
    return res.status(201).json(comment);
  });
};

// Updates an existing comment in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Comment.findById(req.params.id, function (err, comment) {
    if (err) { return handleError(res, err); }
    if(!comment) { return res.status(404).send('Not Found'); }
    var updated = _.merge(comment, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(comment);
    });
  });
};

// Deletes a comment from the DB.
exports.destroy = function(req, res) {
  Comment.findByIdAndRemove(req.params.id, function (err, comment) {
    if(err) { return handleError(res, err); }
    if(!comment) { return res.status(404).send('Not Found'); }
    return res.status(204).send('No Content');
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}