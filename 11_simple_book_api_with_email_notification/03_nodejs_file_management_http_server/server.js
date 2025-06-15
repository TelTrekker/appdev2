const http = require ("http");
const fs = require ("fs");
const path = require ("path");
const url = require ("url");
const EventEmitter = require("events");

//Http server
const port = 3000;
const hostname = "localhost";
const DIRECTORY = path.join(__dirname, "files");
const eventEmitter = new EventEmitter();

if (!fs.existsSync(DIRECTORY)) {
    fs.mkdirSync(DIRECTORY);
}

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const { pathname, query } = parsedUrl;
    const fileName = query.filename ? path.join(DIRECTORY, query.filename) : null;

//Creates a new file = http://localhost:3000/create?filename=test.txt
if ( pathname === "/create" && fileName) {
    fs.writeFile(fileName, 'Hello, you have a new file!', (err) => {
        if (err) {
            res.writeHead( 500, {'Content-Type': "text/plain"});
            return res.end('Error in creating file');
        }
        eventEmitter.emit('fileAction', 'file: ${query.filename}');
        res.writeHead( 200, {'Content-Type': "text/plain"});
        res.end(`File: ${query.filename} created successfully`);
        });

//read: = http://localhost:3000/read?filename=test.txt
} else if (pathname === "/read" && fileName) {
    fs.readFile(fileName, "utf8", (err, data) => {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            return res.end("File not found");
        }
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(data);
    });

//update = http://localhost:3000/update?filename=test.txt&content=More%20data
} else if (pathname === "/update" && fileName && query.content) {
    fs.appendFile(fileName, `\n${query.content}`, (err) => {
        if (err) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            return res.end("Error updating file");
        }
        eventEmitter.emit("fileAction", `File updated: ${query.filename}`);
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(`File '${query.filename}' updated successfully.`);
    });

//delete = http://localhost:3000/delete?filename=test.txt
} else if (pathname === "/delete" && fileName) {
    fs.unlink(fileName, (err) => {
        if (err) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            return res.end("File not found");
        }
        eventEmitter.emit("fileAction", `File deleted: ${query.filename}`);
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(`File '${query.filename}' deleted successfully.`);
    });

} else {
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end("Invalid request. Use /create, /read, /update, or /delete with filename.");
};
});


//EventListener
eventEmitter.on('fileAction', (message) => {
    console.log("Event:", message);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
