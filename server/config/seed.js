/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var TestData = require('./TestData.js').TestData;

TestData.init(true);