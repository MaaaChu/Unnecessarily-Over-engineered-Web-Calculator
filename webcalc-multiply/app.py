from flask import Flask
from flask import request
from flask import Response
import json

import multiply

app = Flask(__name__)

@app.route('/')
def runMultiply():

	result = 0
	results = {}

	try:
		x = int(request.args.get('x'))
		y = int(request.args.get('y'))
	except:
		results = {
			"x": 0,
			"y": 0,
			"answer": 0,
			"error": True,
			"errorMessage": "Please give both x and y values"
		}
		resultsJSON = json.dumps(results)
		res = Response(response=resultsJSON, status=400, mimetype="application/json")
	else:
		result = multiply.multiply(x, y)
		results = {
			"x": x,
			"y": y,
			"answer": result,
			"error": False
		}
		resultsJSON = json.dumps(results)
		res = Response(response=resultsJSON, status=200, mimetype="application/json")

	res.headers["Content-Type"]="application/json"
	res.headers["Access-Control-Allow-Origin"]="*"

	return res

if __name__ == '__main__':
	app.run(host="0.0.0.0", port=5000)
