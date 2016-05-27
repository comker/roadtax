var assert = require('chai').assert;
var Calculator = require('../../app/roadtax-calculator.js');
var calcObject = new Calculator();

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

		it('Calculate tax for Huyndai - getz, registered before 01/03/2001, 1000cc, tax should be 110',function() {
			var tax = calcObject.calc('Huyndai', 'getz', '01/03/2001');
			assert(tax == 110);
		});

		it('Calculate tax far Toyota- lexus, registered after 01/03/2001, 120g/km, tax should be 75',function(){
			var tax = calcObject.calc('Toyota','lexus','01/01/2010');
			assert(tax == 75);	
		});
	});
	describe('vans',function(){
		it('CAcultate tax for Huyndai-Linh, weight (3500), so tax should be 190',function(){
			var tax=calcObject.calc('Huyndai','Linh',3500);
			assert(tax==190,'Huyndai-Linh must have tax 190 GBP');
		});

		it ('Calculate tax for Mescedez - trong,weight(2500), so tax should be 165', function(){
			var tax=calcObject.calc('Mescedez','trong',2500);
			assert(tax==165,'Mescedez-trong must have tax 165 GBP ');
		})
		it('Calculate tax for ben-linh, weight(3600),so tax should be 190',function(){
			var tax=calcObject.calc('Ben','Linh',3600);
			assert(tax==190,'Ben-linh must have tax 190 GBP ');

		})
	})
})
