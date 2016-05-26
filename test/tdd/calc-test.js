var assert = require('chai').assert;
var calcObject = require('../../index.js');

describe('calc() function', function() {
	describe('cars', function() {
		it('Calculate tax for Toyota - camry, co2 (125), so tax should be 105', function() {
			var tax = calcObject.calc('Toyota', 'Camry', '17/02/2012');
			assert(tax == 105, 'Toyota camry must have tax 105 GBP');
		});

		it('Calculate tax for Toyota - camry, registered before 01/03/2001, 2000cc, tax should be 165', function() {
			var tax = calcObject.calc('Toyota', 'Camry', '25/02/2000');
			assert(tax == 165);
		});

		it('Calculate tax for Ford - landrover, registered before 01/03/2001, 2000cc,tax should be 165', function() {
			var tax = calcObject.calc('Ford', 'landrover', '01/03/2001');
			assert(tax == 165);
		});

		it('Calculate tax for Huyndaid - getz, registered before 01/03/2010, 1000cc, tax should be 110',function() {
			var tax = calcObject.calc('Huyndaid', 'getz', '01/03/2001');
			assert(tax == 110);
		});
	})
})