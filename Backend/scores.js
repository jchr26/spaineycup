const readJSON = require ('./readJSON.js');
const cacheProvider = require('./cacheProvider');
const CACHE_DURATION = 300;
const CACHE_KEY = 'CACHE_KEY';

var AWS = require('aws-sdk');
AWS.config.loadFromPath('./.config.json');
AWS.config.update({region: 'eu-west-2'});

var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

exports.getCompScores = function(req, res, next){
    var scoreData = readJSON.readScoreData(req.params.compId);
    res.send({
        score: {
            id: req.params.compId,
            status: scoreData.status,
            players: scoreData.players,
        }
    });
    
    console.log(scoreData);
    next();
}

exports.getScores = function(req, res, next){
    cacheProvider.instance().get('scores', function(err, cachedValue) {
        if (err) console.error(err);
        
        if (cachedValue == undefined) {
            console.log("Cache miss for scores");
            var scores = readJSON.readScores();
            console.log("Caching scores");
            cacheProvider.instance().set('scores', scores, CACHE_DURATION);
            res.send(scores);

            console.log(scores);
            next();
        } else {
            console.log("Cache Hit for scores");
            res.send(cachedValue);
            next();
        }
    });
}

