const players = require('./players.js');
const newsItems = require('./newsItems.js');
var restify = require('restify');

var server = restify.createServer();

server.get('/players/:playerId', players.getPlayer);
server.head('/players/:playerId', players.getPlayer);
server.get('/newsItems/:newsItemId', newsItems.getNewsItem);
server.get('/newsItems', newsItems.getNewsItems);

server.get(/\/images\/?.*/, restify.plugins.serveStatic({
  directory: './assets'
}));

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
});
