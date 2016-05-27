var moment = require('moment');
var lodash = require('lodash');
var debug = require('debug')('roadtax:calculator');

var RoadtaxCalculator = function() {

  this.calc = function(man, model, dor) {
    var vehicles = rateMap[man.toLowerCase() + '-' + model.toLowerCase()];
    debug(' - vehicles: %s', JSON.stringify(vehicles));
    if (vehicles.type == 'cars') {
      debug(' - calc(%s, %s, %s)', man, model, dor);
      var milestone = new Date('2001-03-01');
      var dor = convertDate(dor);
      var isOnOrBefore = moment(dor).isBefore(milestone) || moment(dor).isSame(milestone, 'day');
        debug(' - milestone & dor (%s, %s) - isbefore: %s', milestone, dor, isOnOrBefore);
        if (isOnOrBefore) {
          var es = rateMap[man.toLowerCase() + '-' + model.toLowerCase()].engine_size;
          return (es <= 1550) ? 110 : 165;
        } else {
          var ce = rateMap[man.toLowerCase() + '-' + model.toLowerCase()].co2_emission;
          debug('CO2 emission: %s', ce);
          if (ce <= 100) {
            return 65;
          } else if (ce <= 120) {
            return 75;
          } else if (ce <= 150) {
            return 105;
          } else if (ce <= 165) {
            return 125;
          } else if (ce <= 185) {
            return 145;
          } else {
            return 160;
          }
        }
    } else if (vehicles.type == 'vans') {
      if (vehicles.weight < 3500) {
        return 165;
      } else {
        return 190;
      };
    };
    return 0.0;
  }
};

module.exports = RoadtaxCalculator;

var rateList = require('../data/roadtaxrates.js');

var rateList2Map = function(list) {
  var map = {};
  list = lodash.isArray(list) ? list : [];
  
  for(var i=0; i<list.length; i++) {
    var item = list[i];
    map[item.man.toLowerCase() + '-' + item.model.toLowerCase()] = lodash.omit(item, ['man', 'model']);
  }
  
  return map;
}

var rateMap = rateList2Map(rateList);

var convertDate = function(date) {
  return new Date(lodash.reverse(date.split('/')).join('-'));
}
