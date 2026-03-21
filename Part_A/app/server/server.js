const { createServer } = require('node:http');
const { URL } = require('node:url');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 8080;

const server = createServer((req, res) => {
	// Gets the current path of the URL after the first '/' **Using WHATWG URL API instead**
	let pathname = new URL(req.url, `http://${hostname}:${port}`).pathname;
	let filePath;

	// Gets the suffix of the path eg. '.html' or '.css' etc
	const ext = path.extname(pathname);

	pathname = '.' + pathname;

	// Will implement more methods as the project goes on
	if (req.method !== 'GET') {
		res.statusCode = 405;
		res.setHeader('Content-Type', 'text/plain');
		return res.end('Other methods are not yet implemented.');
	}

	// Checks to see if the path is empty and the URL is pointing to the root
	if (pathname === './' || ext === '') {
		filePath = path.join(__dirname, '../pages', pathname, 'index.html');
	} else {
		filePath = path.join(__dirname, '..', pathname);
	}

	// Store possible MIME types (file types)
	const mimeTypes = {
		'': 'text/html',
		'.html': 'text/html',
		'.css': 'text/css',
		'.js': 'text/javascript',
		'.ts': 'text/typescript',
	};

	// mimeTypes[ext] gets the value from the key value pair
	const contentType = mimeTypes[ext] || 'text/plain';

	// Reads the file and writes/sends the data to the file (either HTML or CSS)
	fs.readFile(filePath, 'utf-8', (error, data) => {
		if (error) {
			res.statusCode = 404;
			res.setHeader('Content-Type', 'text/plain');
			return res.end(`File not found: ${error.message}`);
		}

		res.statusCode = 200;
		res.setHeader('Content-Type', contentType);
		res.end(data);
	});
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});
