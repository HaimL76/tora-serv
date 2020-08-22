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
	var json = {
		name: "sldkjclsk",
		phone: "lkpoelrgkler"
	};

	console.log('before ' + JSON.stringify(json));

	res.send(json);

	console.log('after ' + JSON.stringify(json));
});