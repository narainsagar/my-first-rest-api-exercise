'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

//var User = require('./user.model'); 

var ProjectSchema = new Schema({
  title: { type: String, trim: true  },
  owner: { type : Schema.Types.ObjectId, ref : 'User' },
  created: Date,
  updated: Date,
  users: [{ type : Schema.Types.ObjectId, ref : 'User' }]
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
    return !!owner;
  }, 'Owner must be linked to user');

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
    next();
  });

// ProjectSchema.methods.getUser = function(cb){
//    User.findById(this.owner, cb);
// }

module.exports = mongoose.model('Project', ProjectSchema);