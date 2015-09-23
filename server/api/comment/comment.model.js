'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
  content: String,
  commentedOn: { type: Schema.Types.ObjectId, ref: 'Issue'},
  postedBy: { type: Schema.Types.ObjectId, ref: 'User'},
  created: Date,
  updated: Date,
});

/**
 * Validations
 */

// Validate empty content
CommentSchema
  .path('content')
  .validate(function(content) {
    return content.length;
  }, 'content cannot be blank');

// Validate empty owner
CommentSchema
  .path('commentedOn')
  .validate(function(commentedOn) {
    return !!commentedOn;
  }, 'commentedOn must be linked to Issue');

// Validate empty owner
CommentSchema
  .path('postedBy')
  .validate(function(postedBy) {
    return !!postedBy;
  }, 'postedBy must be linked to user');

/**
 * Pre-save hook
 */
CommentSchema
  .pre('save', function(next) {
    var now = new Date();
    this.updated = now;
    if(!this.created)
      this.created = now;

    if (!this.isNew) return next();
    next();
  });

module.exports = mongoose.model('Comment', CommentSchema);