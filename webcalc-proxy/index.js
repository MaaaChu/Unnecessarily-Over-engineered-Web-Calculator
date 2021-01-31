const routes = require('./routes');
const express = require('express');
const morgan = require("morgan");
const request = require('request');
const mysql = require('mysql');

const app = express();
const cors = require('cors')

const PORT = 8080;
const HOST = '0.0.0.0';

// I would usually add these config values to a .env file but to prevent problems when marking this assignment I've not
const con = mysql.createConnection({
	host: "webcalc.cluster-cmfwljgnd8w6.us-east-1.rds.amazonaws.com",
	user: "admin",
	password: "webcalc2020"
});

const ADD_ROUTE = routes.routes.add;
const SUBTRACT_ROUTE = routes.routes.subtract;
const MULTIPLY_ROUTE = routes.routes.multiply;
const DIVIDE_ROUTE = routes.routes.divide;
const MODULO_ROUTE = routes.routes.modulo;
const SQUARE_ROUTE = routes.routes.square;

app.use(cors());
app.use(express.json()) 

// Log incoming requests
app.use(morgan('dev'));

// Info GET endpoint
app.get('/', (req, res) => {
	res.send('This is the webcalc proxy service');
});

// Authorization
app.use('', (req, res, next) => {
	if (req.headers.authorization === "webcalc") {
			next();
	} else {
			res.sendStatus(403);
	}
});

// Proxy endpoints
app.use('/add', (req, res) => {
	const newURL = ADD_ROUTE + req.url
	const r = request(newURL);

	req.pipe(r).pipe(res);
});

app.use('/subtract', (req, res) => {
	const newURL = SUBTRACT_ROUTE + req.url
  const r = request(newURL);

  req.pipe(r).pipe(res);
});

app.use('/multiply', (req, res) => {
	const newURL = MULTIPLY_ROUTE + req.url
  const r = request(newURL);

  req.pipe(r).pipe(res);
});

app.use('/divide', (req, res) => {
	const newURL = DIVIDE_ROUTE + req.url
  const r = request(newURL);

  req.pipe(r).pipe(res);
});

app.use('/square', (req, res) => {
	// Substring to remove / from url
	const newURL = SQUARE_ROUTE + req.url.substring(1)
  const r = request(newURL);

  req.pipe(r).pipe(res);
});

app.use('/modulo', (req, res) => {
	const newURL = MODULO_ROUTE + req.url
  const r = request(newURL);

  req.pipe(r).pipe(res);
});

app.post('/saveresult', (req, res) => {
	if (req.body.answer) {
		console.log('Request received');
		con.connect(function(err) {
				con.query(`DELETE FROM main.calc`)
				con.query(`
						INSERT INTO main.calc (answer) VALUES ('${req.body.answer}')
					`, (err, result, fields) => {
						if (err) res.send(err);
						if (result) res.send({answer: req.body.answer});
						if (fields) console.log(fields);
				});
		});
	} else {
			console.log('Missing answer parameter');
	}
});

app.get('/saveresult', (req, res) => {
	con.connect(function(err) {
		con.query(`SELECT answer FROM main.calc`, function(err, result, fields) {
				if (err) res.send(err);
				if (result) res.send(result);
		});
	});
});

app.listen(PORT, HOST, () => {
	console.log(`Starting Proxy at ${HOST}:${PORT}`);
});