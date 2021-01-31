import unittest
from multiply import multiply
from app import app
import json

class TestMultiply(unittest.TestCase):
	def test_multiply(self):
		self.assertEqual(multiply(3,4), 12)

	def test_multiply_get_correct_result(self):
		tester = app.test_client(self)
		response = tester.get('http://webcalc-multiply.40176750.qpc.hal.davecutting.uk/?x=3&y=5')
		expectedResult = {
			"x": 3,
			"y": 5,
			"answer": 15,
			"error": False
		}
		resultsJSON = json.dumps(expectedResult)
		self.assertTrue(resultsJSON in (response.data).decode('utf8'))

	def test_multiply_get_no_parameter_error_true(self):
		tester = app.test_client(self)
		response = tester.get('http://webcalc-multiply.40176750.qpc.hal.davecutting.uk/')
		expectedResult = {
			"x": 0,
			"y": 0,
			"answer": 0,
			"error": True,
			"errorMessage": "Please give both x and y values"
		}
		resultsJSON = json.dumps(expectedResult)
		self.assertTrue(resultsJSON in (response.data).decode('utf8'))

# Should return 400 as no parameters are specified
	def test_multiply_get_request_no_parameters(self):
		tester = app.test_client(self)
		response = tester.get('http://webcalc-multiply.40176750.qpc.hal.davecutting.uk/')
		statuscode = response.status_code
		self.assertEqual(statuscode, 400)

# Should return 200 as parameters are specified
	def test_multiply_get_request_with_parameters(self):
		tester = app.test_client(self)
		response = tester.get('http://webcalc-multiply.40176750.qpc.hal.davecutting.uk/?x=3&y=5')
		statuscode = response.status_code
		self.assertEqual(statuscode, 200)

	def test_multiply_get_request_content_type(self):
		tester = app.test_client(self)
		response = tester.get('http://webcalc-multiply.40176750.qpc.hal.davecutting.uk/?x=3&y=5')
		self.assertEqual(response.content_type, "application/json")

if __name__ == '__main__':
	unittest.main()