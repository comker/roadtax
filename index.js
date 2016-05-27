var moment = require('moment');
var lodash = require('lodash');
var debug = require('debug')('roadtax:index');

var RtCalc = require('./app/roadtax-calculator.js');
var rt = new RtCalc();

var prompt = require('prompt');

var schema = {
  properties: {
    manufacturer: {
      pattern: /^[a-zA-Z\-]+$/,
      message: 'Manufacturer must be only letters, or dashes',
      required: true
    },
    model: {
      pattern: /^[a-zA-Z\-]+$/,
      message: 'Model name must be only letters, or dashes',
      required: true
    },
    dor: {
      message: 'Date of registration',
      required: true
    }
  }
};

//
// Start the prompt
//
prompt.start();

function ask() {
  prompt.get(schema, function (err, result) {
    var tax = rt.calc(result.manufacturer, result.model, result.dor);
    console.log('The tax should be charged: %s GBP', tax);
    
    var anymore = [
      {
        name: 'anymore',
        require: true,
        message: 'More again?',
        type: 'boolean',
        default: true
      }
    ];

    prompt.get(anymore, function(err, answer) {
      if (answer.anymore) {
        ask();
      }
    })
  });
}

ask();
