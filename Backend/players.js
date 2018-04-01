const cacheProvider = require('./cacheProvider');
const CACHE_DURATION = 300;
const CACHE_KEY = 'CACHE_KEY';

var AWS = require('aws-sdk');
AWS.config.loadFromPath('./.config.json');
AWS.config.update({region: 'eu-west-2'});

var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

exports.getPlayer = function(req, res, next){
    cacheProvider.instance().get('players:'+req.params.playerId, function(err, cachedValue) {
        if (err) console.error(err);
        
        if (cachedValue == undefined) {
            console.log("Cache miss for players:"+req.params.playerId);

            var params = { 
                TableName: 'players',
                Key: {
                    'playerId': parseInt(req.params.playerId)
                }
            };
            var documentClient = new AWS.DynamoDB.DocumentClient();
            documentClient.get(params, function(err, data) {
                if (err) {
                    console.log("Error", err);
                } else {
                    var player = AWS.DynamoDB.Converter.unmarshall(data.Item); 
                    console.log("Caching players:"+req.params.playerId);
                    cacheProvider.instance().set('players:'+req.params.playerId, data.Item, CACHE_DURATION);
                    res.send(data.Item);
                    next();
                }
            });
        } else {
            console.log("Cache Hit for players:"+req.params.playerId);
            res.send(cachedValue);
            next();
        }
    });
}

exports.getPlayers = function(req, res, next){

    cacheProvider.instance().get('players', function(err, cachedValue) {
        if (err) console.error(err);
        
        if (cachedValue == undefined) {
            console.log("Cache miss for players");

            var params = {
                TableName: "players"
            };
            ddb.scan(params, function(err, data) {
                if (err) {
                    console.log("Error", err);
                } else {

                    var players = [];
                    data.Items.forEach(function(element, index, array) {
                        var player = AWS.DynamoDB.Converter.unmarshall(element); 
                        console.log(player);
                        players.push(player);
                    });

                    console.log("Caching players");
                    cacheProvider.instance().set('players', players, CACHE_DURATION);

                    res.send(players);
                    next();
                }
            });
        } else {
            console.log("Cache Hit for players");
            res.send(cachedValue);
            next();
        }
    });
}
