'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.post('/', controller.create); 
router.get('/', auth.isAuthenticated(), controller.index); 
router.get('/:id', auth.isAuthenticated(), controller.show);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);
router.get('/:id/me/', controller.me);
router.put('/:id', auth.isAuthenticated(), controller.changePassword);
router.patch('/:id', auth.isAuthenticated(), controller.changePassword);

router.get('/:id/projects', auth.isAuthenticated(), controller.getUserProjects); 
router.post('/:id/projects', auth.isAuthenticated(), controller.createUserProject);

module.exports = router;