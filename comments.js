// Create web server
var http = require('http');
var fs = require('fs');
var path = require('path');
var comments = require('./comments');

// Create web server
var server = http.createServer(function (req, res) {
    if (req.method === 'POST') {
        var data = '';
        req.on('data', function (chunk) {
            data += chunk;
        });
        req.on('end', function () {
            var newComment = JSON.parse(data);
            comments.add(newComment, function (err) {
                if (err) {
                    res.statusCode = 500;
                    res.end('Server error');
                    return;
                }
                res.end('OK');
            });
        });
    } else if (req.method === 'GET') {
        comments.getAll(function (err, data) {
            if (err) {
                res.statusCode = 500;
                res.end('Server error');
                return;
            }
            res.setHeader('Content-Type', 'application/json');
            res.end(data);
        });
    } else {
        res.statusCode = 404;
        res.end('Not found');
    }
});
server.listen(3000);

// Create comments.js
var fs = require('fs');
var path = require('path');
var commentsPath = path.join(__dirname, 'comments.json');

exports.getAll = function (callback) {
    fs.readFile(commentsPath, function (err, data) {
        if (err) return callback(err);
        callback(null, data);
    });
};

exports.add = function (comment, callback) {
    exports.getAll(function (err, comments) {
        if (err) return callback(err);
        comments = JSON.parse(comments);
        comments.push(comment);
        fs.writeFile(commentsPath, JSON.stringify(comments), function (err) {
            if (err) return callback(err);
            callback(null);
        });
    });
};

// Create comments.json
[]

// Test
// Run the server
// Open the browser and go to http://localhost:3000
// Open the browser's console and run the following code
fetch('http://localhost:3000', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({}) })