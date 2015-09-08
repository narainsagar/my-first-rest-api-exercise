'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//var User = require('./user.model');

var ProjectSchema = new Schema({
  title: { type: String, trim: true  },
  owner: String,
  created: Date,
  updated: Date,
  users: Array
});


/**
 * Validations
 */

// Validate empty title
ProjectSchema
  .path('title')
  .validate(function(title) {
    return title.length;
  }, 'Title cannot be blank');

// Validate empty owner
ProjectSchema
  .path('owner')
  .validate(function(owner) {
    return owner.length;
  }, 'Owner cannot be blank');

var validatePresenceOf = function(value) {
  return value && value.length;
};
/**
 * Pre-save hook
 */
ProjectSchema
  .pre('save', function(next) {
    var now = new Date();
    this.updated = now;
    if(!this.created) 
      this.created = now;

    if (!this.isNew) return next();

    if (!validatePresenceOf(this.owner))
      next(new Error('Invalid owner'));
    else
      next();
  });

module.exports = mongoose.model('Project', ProjectSchema);