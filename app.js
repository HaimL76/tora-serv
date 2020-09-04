var express = require('express');
var cors = require('cors')
var app = express();

app.use(cors())

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/people', (req, res) => {
	var mysql = require('mysql');

	var con = mysql.createConnection({
		 host: "localhost",
		 port: 3307,
		 user: "root",
		 password: "root",
		 database: "Person"
	});

	con.connect((err) => {
		if (err) throw err;

		sql = "SELECT * FROM Person";

		console.log(sql);

		con.query(sql, (err, results, fields) => {
			if (err) throw err;

			res.send(results);
		});
	});
});

app.get('/person/:id', (req, res) => {
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
			con.connect((err) => {
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

app.post('/person/:id', (req, res) => {
	const body = 'body';
	const id = 'id';
	const book = 'book';

	if (req && body in req && req.params && id in req.params) {
		var person_id = req.params[id];

		var req_body = req[body];
		
		if (req_body && book in req_body && person_id > 0) {
			var book_id = req_body[book];
			
			if (book_id > 0) {
				sql = "insert into person_book (person_id, book_id) ";
				sql += " values (" + person_id.toString() + ", " + book_id.toString() + ")";

				console.log(sql);
			}
		}
	}
});