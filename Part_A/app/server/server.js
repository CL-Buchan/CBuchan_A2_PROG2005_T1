import { createServer } from 'node:http';
import { fileURLToPath, URL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const hostname = 'localhost';
const port = 8080;
const ROOT = path.join(__dirname, '..');

const server = createServer((req, res) => {
	// Gets the current path of the URL after the first '/' **Using WHATWG URL API instead**
	let pathname = new URL(
		req.url,
		`http://${hostname}:${port}`,
	).pathname;
	let filePath;

	// Gets the suffix of the path eg. '.html' or '.css' etc
	const ext = path.extname(pathname);

	// Will implement more methods as the project goes on
	if (req.method !== 'GET') {
		res.statusCode = 405;
		res.setHeader('Content-Type', 'text/plain');
		return res.end(
			'Other methods are not yet implemented.',
		);
	}

	// Checks to see if the path is pointing to the root
	if (pathname === '/') {
		filePath = path.join(ROOT, '/pages/index.html');
	} else if (path.extname(pathname) === '.js') {
		filePath = path.join(__dirname, '../..', pathname);
	} else {
		filePath = path.join(ROOT, pathname);
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
			return res.end(
				`File not found: ${error.message}`,
			);
		}

		res.statusCode = 200;
		res.setHeader('Content-Type', contentType);
		res.end(data);
	});
});

server.listen(port, hostname, () => {
	console.log(
		`Server running at http://${hostname}:${port}/`,
	);
});
