var expect  = require('chai').expect;
var sub = require('../subtract');

it('Subtraction Test', function(done) {
        var x = 10;
        var y = 5;
        var a = x-y;
        expect(sub.subtract(x,y)).to.equal(a);
        done();
});
