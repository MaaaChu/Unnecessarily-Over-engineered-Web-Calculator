const endpoints = require('./endpoints.json')
const fetch = require('node-fetch')
const mysql = require('mysql')
const { performance } = require('perf_hooks');

// I would usually add these config values to a .env file but to prevent problems when marking this assignment I've not
const con = mysql.createConnection({
	host: "webcalc.cluster-cmfwljgnd8w6.us-east-1.rds.amazonaws.com",
	user: "admin",
	password: "webcalc2020"
});

const PROXY_URLS = [
	{
		url: 'http://webcalc-proxy.40176750.qpc.hal.davecutting.uk/'
	},
	{
		url: 'http://webcalc-proxy-2.40176750.qpc.hal.davecutting.uk/'
	},
]

const options = {
	method: 'GET',
	headers: {
		'Content-Type': 'application/json',
		'Authorization': 'webcalc',
	},
	mode: 'cors',
	cache: 'default',
}

const createRandomVariables = async () => {
	x = Math.round(100 * Math.random())
	y = Math.round(100 * Math.random())
	return { x, y }
}

const getExpectedResult = async (endpoint) => {
	if(endpoint === "multiply") {
		return expectedResult = x * y
	} else if(endpoint === "divide") {
		return expectedResult = Math.floor(x / y)
	} else if(endpoint === "modulo") {
		return expectedResult = x % y
	} else if(endpoint === "square") {
		return expectedResult = x * x
	} else if(endpoint === "add") {
		return expectedResult = x + y
	} else if(endpoint === "subtract") {
		return expectedResult = x - y
	} else {
		return expectedResult = undefined
	}
}		

const monitorService = async (endpoint) => {
	const queryParams = await createRandomVariables()
	let query = endpoint+"?x="+queryParams.x+"&y="+queryParams.y
	let serviceURL = PROXY_URLS[0].url + query

	const t0 = performance.now();
	const response = await fetch(serviceURL, options)
	const t1 = performance.now();

	const result = await response.json()
	let expectedResult = await getExpectedResult(endpoint)

	let responseTime = t1 - t0
	let answer = result.answer ? result.answer : result.Answer
	console.log(resultLog(endpoint, x, y, expectedResult, answer, responseTime))

	if(isError(expectedResult, answer)) {
		console.error(errorMessage(endpoint, x, y, expectedResult, answer))
		sendErrorToDB(endpoint, x, y, expectedResult, answer)
		triggerEmailErrorNotification()
		getAllErrorsFromDB()
	}
}

const isError = (expectedResult, answer) => expectedResult !== answer

const errorMessage = (endpoint, x, y, expectedResult, answer) => {
	return (
		`
		Error with service ${ endpoint }
		x: ${ x }, y: ${ y }
		Expected answer: ${ expectedResult }
		Answer received: ${ answer }
		`
	)
}

const getAllErrorsFromDB = () => {
	con.connect((err) => {
		con.query(`SELECT * FROM main.errors`, (err, result, fields) => {
				if (err) console.log(err)
				if (result) console.log(result)
		})
	})	
}

const sendErrorToDB = (endpoint, x, y, expectedResult, answer) => {
	console.log('Sending error to db');
	con.connect((err) => {
			con.query(`
					INSERT INTO main.errors (service, x, y, expectedresult, answer) VALUES ('${endpoint}', '${x}', '${y}', '${expectedResult}', '${answer}')
				`, (err, result, fields) => {
					if (err) console.log(err);
					if (result) console.log(result);
					if (fields) console.log(fields);
			});
	});
}

const triggerEmailErrorNotification = () => {
	const gatewayURL = "https://4e6ocgow0i.execute-api.us-east-1.amazonaws.com/default/webcalc-monitor"
	fetch(gatewayURL)
}

const resultLog = (endpoint, x, y, expectedResult, answer, responseTime) => {
	return (
		`
		SERVICE: ${ endpoint }
		x: ${x}
		y: ${y}
		Real answer: ${ answer }
		Expected answer: ${ expectedResult }
		Execution time: ${ responseTime } milliseconds
		`
	)
}

const initialRun = async () => {
	await monitorService(endpoints.add)
	await monitorService(endpoints.subtract)
	await monitorService(endpoints.multiply)
	await monitorService(endpoints.divide)
	await monitorService(endpoints.modulo)
	await monitorService(endpoints.square)
}

initialRun()

// Runs every 12 hours
setInterval(async function(){
	await monitorService(endpoints.add)
	await monitorService(endpoints.subtract)
	await monitorService(endpoints.multiply)
	await monitorService(endpoints.divide)
	await monitorService(endpoints.modulo)
	await monitorService(endpoints.square)
}, 43200000) 