const { createServer } = require('node:http');
const fs = require('fs');
const url = require('url');
const path = require('path');

const hostname = 'localhost';
const port = 8080;

const server = createServer((req, res) => {
	// Gets the current path of the URL after the first '/'
	let pathname = url.parse(req.url).pathname;
	pathname = '.' + pathname;

	if (pathname === './') {
		pathname = path.join(__dirname, '../pages/index.html');
	} else {
		pathname = path.join(pathname, '/pages/index.html');
	}

	// Will implement more methods as the project goes on
	if (req.method !== 'GET') {
		res.statusCode = 405;
		res.setHeader('Content-Type', 'text/plain');
		return res.end('Other methods are not yet implemented.');
	}

	// Reads the file and writes/sends the data to the file (either HTML or CSS)
	fs.readFile(pathname, (error, data) => {
		if (error) {
			res.statusCode = 404;
			res.setHeader('Content-Type', 'text/plain');
			return res.end(`An error has occurred: ${error}`);
		}

		if (pathname.endsWith('.css')) {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'text/css');
		} else {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'text/html');
		}

		res.write(data);
		res.end();
	});
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
