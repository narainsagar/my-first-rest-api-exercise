'use strict';

var express = require('express');
var controller = require('./project.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index); // get all projects
router.get('/:id', auth.isAuthenticated(), controller.show); // get single project
router.post('/', auth.isAuthenticated(), controller.create); // create new project
router.put('/:id', auth.isAuthenticated(), controller.update); //update the project info
router.patch('/:id', auth.isAuthenticated(), controller.update); //update the project info
router.delete('/:id', auth.isAuthenticated(), controller.destroy); // delete a project

module.exports = router;