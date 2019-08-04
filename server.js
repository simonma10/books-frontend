
require('dotenv').config({ debug: process.env.DEBUG })
const express = require('express');
const favicon = require('express-favicon');
const path = require('path');


const init = (async () => 

	{
		//await require('dotenv').config({ debug: process.env.DEBUG })
		const port = process.env.PORT || 8080;
		const app = express();
	
		app.use(favicon(__dirname + '/build/favicon.ico'));
		// the __dirname is the current directory from where the script is running
		app.use(express.static(__dirname));
		app.use(express.static(path.join(__dirname, 'build')));
	
		app.get('/*', function (req, res) {
		res.sendFile(path.join(__dirname, 'build', 'index.html'));
		});
		app.listen(port);
		console.log(`Server running on port ${port}`)
		console.log(`API Host is ${process.env.API_PATH}`)
	}

) 
init()
