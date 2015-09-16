'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index); // ok
router.delete('/:id', auth.isAuthenticated(), controller.destroy); // ok
router.get('/:id/me/', controller.me); //ok
router.put('/:id', auth.isAuthenticated(), controller.changePassword); // ok
router.patch('/:id', auth.isAuthenticated(), controller.changePassword); // ok
router.get('/:id', auth.isAuthenticated(), controller.show); // ok
router.post('/', controller.create); // ok

module.exports = router;
