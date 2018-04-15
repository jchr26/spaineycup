const players = require('./players.js');
const newsItems = require('./newsItems.js');
const competitions = require('./competitions.js');
const courses = require('./courses.js');
const scores = require('./scores.js');
const compPoints = require('./compPoints.js');

let cacheProvider = require('./cacheProvider.js');

cacheProvider.start(function(err) {
    if (err) console.error(err);
});

var restify = require('restify');

var server = restify.createServer();

server.get('/players/:playerId', players.getPlayer);
server.get('/players', players.getPlayers);
server.get('/newsItems/:newsItemId', newsItems.getNewsItem);
server.get('/newsItems', newsItems.getNewsItems);
server.get('/competitions/:compId', competitions.getComp);
server.get('/competitions', competitions.getComps);
server.get('/compPoints/:compId', compPoints.getCompPoints);
server.get('/compPoints', compPoints.getCompPoints);
server.get('/scores/:compId', scores.getCompScores);
server.get('/scores', scores.getScores);
server.get('/courses/:courseId', courses.getCourse);
server.get('/courses', courses.getCourses);

server.get(/\/images\/?.*/, restify.plugins.serveStatic({
  directory: './assets'
}));

server.listen(80, function() {
  console.log('%s listening at %s', server.name, server.url);
});
