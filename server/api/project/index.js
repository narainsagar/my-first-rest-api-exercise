'use strict';

var express = require('express');
var controller = require('./project.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index); // get all projects
router.get('/:id', auth.isAuthenticated(), controller.show); // get single project
router.put('/:id', auth.isAuthenticated(), controller.update); //update the project info
router.patch('/:id', auth.isAuthenticated(), controller.update); //update the project info
router.delete('/:id', auth.isAuthenticated(), controller.destroy); // delete a project

/* for post and delete make sure 'user_id' passed in body.*/
router.get('/:id/users', auth.isAuthenticated(), controller.getUsers); // get all users of this project
router.post('/:id/users', auth.isAuthenticated(), controller.addUser); // add new user to this project
router.delete('/:id/users', auth.isAuthenticated(), controller.removeUser); // get all users of this project

router.get('/:id/issues', auth.isAuthenticated(), controller.getProjectIssues); // get all issues project
router.post('/:id/issues', auth.isAuthenticated(), controller.createProjectIssue); // create issue under a project

module.exports = router;