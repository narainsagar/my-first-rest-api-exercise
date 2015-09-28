'use strict';

var express = require('express');
var controller = require('./issue.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

//router.get('/', auth.isAuthenticated(), controller.index);
//router.post('/', auth.isAuthenticated(), controller.create);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', auth.isAuthenticated(), controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

router.get('/:id/comments', auth.isAuthenticated(), controller.getIssueComments); // get all issue comments
router.post('/:id/comments', auth.isAuthenticated(), controller.createIssueComment); // create comment under a issue


module.exports = router;