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

app.get('/dowork',function(req, res){
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

		 con.query("SELECT * FROM Person", function (err, result, fields) {

		if (err) throw err;
			console.log(result);

			Object.keys(result).forEach(function(key) {
				var row = result[key];
				console.log(row.name)
			  });
		});
	});
});