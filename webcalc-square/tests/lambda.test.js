const expect  = require('chai').expect;
const request = require('request');

const GATEWAY_URL = "https://orr5mhdeb2.execute-api.us-east-1.amazonaws.com/default/webcalc-square"

describe('Status', function() {
	it('status on success', function(done){
			request(GATEWAY_URL+"?x=4", function(error, response, body) {
					expect(response.statusCode).to.equal(200);
					done();
			});
	});

	it('status on failure', function(done){
		request(GATEWAY_URL, function(error, response, body) {
				expect(response.statusCode).to.equal(400);
				done();
		});
});
});

describe('Service tests', function() {

	it('Square', function(done){
		const options = {
			url: GATEWAY_URL+"?x=4"
		};

		const expected = `{"x":4,"answer":16,"error":false}`

		request(options, function(error, response, body) {
				expect(body).to.equal(expected);
				expect(response.statusCode).to.equal(200);
				done();
		});
	});

});