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

		sql = "SELECT * FROM Person";

		console.log(sql);

		con.query(sql, function (err, results, fields) {
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

				sql = "select * from person left outer join person_book on person.id = person_book.person_id ";
				sql += " inner join book on book.id = person_book.book_id ";
				sql += " where person.id = " + myId.toString();

				console.log(sql);

				con.query(sql, function (err, results, fields) {
					if (err) throw err;

					res.send(results);
				});
			});
		}
	}
});