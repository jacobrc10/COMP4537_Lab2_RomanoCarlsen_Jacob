const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const path = require('path');
const app = express();
const PORT = 3000;

var jsonParser = bodyParser.json();
var urlEncodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlEncodedParser);
app.use(jsonParser);
app.use(express.static(path.join(__dirname, '../frontend')));

app.get('/', (req, res) => {
	let reqPath = path.join(__dirname, '../frontend/index.html');
  res.sendFile(reqPath);
});

app.post('/chatbot', (req, res) => {
	const message = req.body.message;
	const number = message.match(/\d+/);
	if (number) {
		fetch(`http://numbersapi.com/${number}?type=trivia`).then(response => response.text()).then(data => {
			res.json({
				text: data
			});
		}).catch(error => {
			res.json({
				text: "Sorry, I couldn't find any information about that number."
			});
		});
	} else {
		res.json({
			text: "I'm sorry, I didn't understand your question. Please provide a number for me to give you information about."
		});
	}
});

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});