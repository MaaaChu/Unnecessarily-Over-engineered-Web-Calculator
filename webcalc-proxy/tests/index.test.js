const expect  = require('chai').expect;
const request = require('request');

const PROXY_URL = 'http://webcalc-proxy.40176750.qpc.hal.davecutting.uk/'
const PROXY_URL2 = 'http://webcalc-proxy-2.40176750.qpc.hal.davecutting.uk/'

describe('Status', function() {
	it('status', function(done){
			request(PROXY_URL, function(error, response, body) {
					expect(response.statusCode).to.equal(200);
					done();
			});
	});

	it('/ content', function(done) {
			request(PROXY_URL , function(error, response, body) {
					expect(body).to.equal('This is the webcalc proxy service');
					done();
			});
	});
});

describe('Check authorisation', function() {
	it('Check forbidden', function(done){
		const options = {
			url: PROXY_URL+"add",
			headers: {
				'Authorization': 'blah'
			}
		};

		request(options, function(error, response, body) {
				expect(response.statusCode).to.equal(403);
				done();
		});
	});

	it('Check forbidden with authorisation', function(done){
		const options = {
			url: PROXY_URL+"add",
			headers: {
				'Authorization': 'webcalc'
			}
		};

		request(options, function(error, response, body) {
				expect(response.statusCode).to.equal(200);
				done();
		});
	});
});

describe('Service tests', function() {

	it('Add', function(done){
		const options = {
			url: PROXY_URL+"add?x=3&y=4",
			headers: {
				'Authorization': 'webcalc'
			}
		};

		const expected = `{"error":false,"string":"3+4=7","answer":7}`

		request(options, function(error, response, body) {
				expect(body).to.equal(expected);
				expect(response.statusCode).to.equal(200);
				done();
		});
	});

	it('Subtract', function(done){
		const options = {
			url: PROXY_URL+"subtract?x=9&y=4",
			headers: {
				'Authorization': 'webcalc'
			}
		};

		const expected = `{"error":false,"string":"9-4=5","answer":5}`

		request(options, function(error, response, body) {
				expect(body).to.equal(expected);
				expect(response.statusCode).to.equal(200);
				done();
		});
	});

	it('Multiply', function(done){
		const options = {
			url: PROXY_URL+"multiply?x=9&y=4",
			headers: {
				'Authorization': 'webcalc'
			}
		};

		const expected = `{"x": 9, "y": 4, "answer": 36, "error": false}`

		request(options, function(error, response, body) {
				expect(body).to.equal(expected);
				expect(response.statusCode).to.equal(200);
				done();
		});
	});

	it('Divide', function(done){
		const options = {
			url: PROXY_URL+"divide?x=10&y=5",
			headers: {
				'Authorization': 'webcalc'
			}
		};

		const expected = `{"answer":2,"x":10,"y":5,"error":false}`

		request(options, function(error, response, body) {
				expect(body).to.equal(expected);
				expect(response.statusCode).to.equal(200);
				done();
		});
	});

	it('Modulo', function(done){
		const options = {
			url: PROXY_URL+"modulo?x=10&y=7",
			headers: {
				'Authorization': 'webcalc'
			}
		};

		const expected = `{"X":10,"Y":7,"Answer":3,"Error":false}`

		request(options, function(error, response, body) {
				expect(body).to.equal(expected);
				expect(response.statusCode).to.equal(200);
				done();
		});
	});

	it('Square', function(done){
		const options = {
			url: PROXY_URL+"square?x=10",
			headers: {
				'Authorization': 'webcalc'
			}
		};

		const expected = `{"x":10,"answer":100,"error":false}`

		request(options, function(error, response, body) {
				expect(body).to.equal(expected);
				expect(response.statusCode).to.equal(200);
				done();
		});
	});

});

describe('Status', function() {
	it('status', function(done){
			request(PROXY_URL2, function(error, response, body) {
					expect(response.statusCode).to.equal(200);
					done();
			});
	});

	it('/ content', function(done) {
			request(PROXY_URL2 , function(error, response, body) {
					expect(body).to.equal('This is the webcalc proxy service');
					done();
			});
	});
});

describe('Check authorisation', function() {
	it('Check forbidden', function(done){
		const options = {
			url: PROXY_URL2+"add",
			headers: {
				'Authorization': 'blah'
			}
		};

		request(options, function(error, response, body) {
				expect(response.statusCode).to.equal(403);
				done();
		});
	});

	it('Check forbidden with authorisation', function(done){
		const options = {
			url: PROXY_URL2+"add",
			headers: {
				'Authorization': 'webcalc'
			}
		};

		request(options, function(error, response, body) {
				expect(response.statusCode).to.equal(200);
				done();
		});
	});
});

describe('Service tests', function() {

	it('Add', function(done){
		const options = {
			url: PROXY_URL2+"add?x=3&y=4",
			headers: {
				'Authorization': 'webcalc'
			}
		};

		const expected = `{"error":false,"string":"3+4=7","answer":7}`

		request(options, function(error, response, body) {
				expect(body).to.equal(expected);
				expect(response.statusCode).to.equal(200);
				done();
		});
	});

	it('Subtract', function(done){
		const options = {
			url: PROXY_URL2+"subtract?x=9&y=4",
			headers: {
				'Authorization': 'webcalc'
			}
		};

		const expected = `{"error":false,"string":"9-4=5","answer":5}`

		request(options, function(error, response, body) {
				expect(body).to.equal(expected);
				expect(response.statusCode).to.equal(200);
				done();
		});
	});

	it('Multiply', function(done){
		const options = {
			url: PROXY_URL2+"multiply?x=9&y=4",
			headers: {
				'Authorization': 'webcalc'
			}
		};

		const expected = `{"x": 9, "y": 4, "answer": 36, "error": false}`

		request(options, function(error, response, body) {
				expect(body).to.equal(expected);
				expect(response.statusCode).to.equal(200);
				done();
		});
	});

	it('Divide', function(done){
		const options = {
			url: PROXY_URL2+"divide?x=10&y=5",
			headers: {
				'Authorization': 'webcalc'
			}
		};

		const expected = `{"answer":2,"x":10,"y":5,"error":false}`

		request(options, function(error, response, body) {
				expect(body).to.equal(expected);
				expect(response.statusCode).to.equal(200);
				done();
		});
	});

	it('Modulo', function(done){
		const options = {
			url: PROXY_URL2+"modulo?x=10&y=7",
			headers: {
				'Authorization': 'webcalc'
			}
		};

		const expected = `{"X":10,"Y":7,"Answer":3,"Error":false}`

		request(options, function(error, response, body) {
				expect(body).to.equal(expected);
				expect(response.statusCode).to.equal(200);
				done();
		});
	});

});