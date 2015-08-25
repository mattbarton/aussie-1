var port = process.env.PORT || 8080,
    http = require('http'),
    fs = require('fs');

var log = function(entry) {
    fs.appendFileSync('/tmp/sample-app.log', new Date().toISOString() + ' - ' + entry + '\n');
}


var server = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('Hello, world!\n');
  res.end();
});

server.listen(port);

console.log('Server running on port ' + port);

