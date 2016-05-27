var moment = require('moment');
var lodash = require('lodash');
var debug = require('debug')('roadtax:index');

var RtCalc = require('./app/roadtax-calculator.js');

var rt = new RtCalc();

module.exports = rt;