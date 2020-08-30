var express = require('express');
var cors = require('cors')
var app = express();

app.use(cors())

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/people',function(req, res) {
	var mysql = require('mysql');

	var con = mysql.createConnection({
		 host: "localhost",
		 port: 3307,
		 user: "root",
		 password: "root",
		 database: "Person"
	});

	con.connect(function(err) {
		if (err) throw err;

		con.query("SELECT * FROM Person", function (err, results, fields) {
			if (err) throw err;

			res.send(results);
		});
	});
});

app.get('/person/:id',function(req, res) {
	const id = 'id';

	var mysql = require('mysql');

	var con = mysql.createConnection({
		 host: "localhost",
		 port: 3307,
		 user: "root",
		 password: "root",
		 database: "Person"
	});

	if (req.params && id in req.params) {
		var myId = req.params[id];

		if (myId) {
			con.connect(function(err) {
				if (err) throw err;

				con.query("SELECT * FROM Person where id = " + myId.toString(), function (err, results, fields) {
					if (err) throw err;

					res.send(results);
				});
			});
		}
	}
});