'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var IssueSchema = new Schema({
  title: String,
  description: String,
  project: { type: Schema.Types.ObjectId, ref: 'Project'},
  assignee: { type: Schema.Types.ObjectId, ref: 'User'},
  created: Date,
  updated: Date,
  creator: { type: Schema.Types.ObjectId, ref: 'User'},
  state: { type: Boolean, default: false } 
});

/**
 * Validations
 */

// Validate empty title
IssueSchema
  .path('title')
  .validate(function(title) {
    return title.length;
  }, 'Title cannot be blank');

// Validate empty owner
IssueSchema
  .path('project')
  .validate(function(project) {
    return !!project;
  }, 'project must be linked to Project');

// Validate empty owner
IssueSchema
  .path('creator')
  .validate(function(creator) {
    return !!creator;
  }, 'creator must be linked to user');

/**
 * Pre-save hook
 */
IssueSchema
  .pre('save', function(next) {
    var now = new Date();
    this.updated = now;
    if(!this.created) 
      this.created = now;

    if (!this.isNew) return next();
    next();
  });

// IssueSchema.methods.getUser = function(cb){
//    User.findById(this.owner, cb);
// }
module.exports = mongoose.model('Issue', IssueSchema);