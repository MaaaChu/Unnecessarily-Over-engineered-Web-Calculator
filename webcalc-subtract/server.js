'use strict';

const express = require('express');

const PORT = 80;
const HOST = '0.0.0.0';

var sub = require('./subtract');

const app = express();
app.get('/', (req,res) => {

    var output = {
        'error': false,
        'string': '',
        'answer': 0
    };

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*')
    var x = req.query.x;
    var y = req.query.y;
    var answer = sub.subtract(x,y);

    output.string = x + '-' + y + '=' + answer;
    output.answer = answer;

    res.end(JSON.stringify(output));
});

app.listen(PORT, HOST);
