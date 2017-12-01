const players = require('./players.js');
var restify = require('restify');

var server = restify.createServer();

server.get('/players/:playerId', players.getPlayer);
server.head('/players/:playerId', players.getPlayer);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
