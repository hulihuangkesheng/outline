var http = require('http');
http.createServer(function (request, response) {
  const url = request.url;
  console.log(url);
  response.writeHead(200, {
    'Content-Type': 'text/html',
    charset: 'utf-8'
  });
  response.write('<h2>huangyangongchishi</h2>')
  response.end('Hello World');
}).listen(8081);

console.log('Server running at http://127.0.0.1:8081/');