const cacheProvider = require('./cacheProvider');
const CACHE_DURATION = 300;
const CACHE_KEY = 'CACHE_KEY';

var AWS = require('aws-sdk');
AWS.config.loadFromPath('./.config.json');
AWS.config.update({region: 'eu-west-2'});

var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

exports.getComp = function(req, res, next){
    cacheProvider.instance().get('competitions:'+req.params.compId, function(err, cachedValue) {
        if (err) console.error(err);
        
        if (cachedValue == undefined) {
            console.log("Cache miss for competitions:"+req.params.compId);

            var params = { 
                TableName: 'competitions',
                Key: {
                    'competitionId': parseInt(req.params.compId)
                }
            };
            var documentClient = new AWS.DynamoDB.DocumentClient();
            documentClient.get(params, function(err, data) {
                if (err) {
                    console.log("Error", err);
                } else {
                    var competition = AWS.DynamoDB.Converter.unmarshall(data.Item); 
                    console.log("Caching competitions:"+req.params.compId);
                    cacheProvider.instance().set('competitions:'+req.params.compId, data.Item, CACHE_DURATION);
                    res.send(data.Item);
                    next();
                }
            });
        } else {
            console.log("Cache Hit for competitions:"+req.params.compId);
            res.send(cachedValue);
            next();
        }
    });
}

exports.getComps = function(req, res, next){
    cacheProvider.instance().get('competitions', function(err, cachedValue) {
        if (err) console.error(err);
        
        if (cachedValue == undefined) {
            console.log("Cache miss for competitions");

            var params = { TableName: "competitions" };
            ddb.scan(params, function(err, data) {
                if (err) {
                    console.log("Error", err);
                } else {
                    var competitions = [];
                    data.Items.forEach(function(element, index, array) {
                        var competition = AWS.DynamoDB.Converter.unmarshall(element); 
                        competitions.push(competition);
                    });
                    console.log("Caching competitions");
                    cacheProvider.instance().set('competitions', competitions, CACHE_DURATION);
                    res.send(competitions);
                    next();
                }
            });
            
        } else {
            console.log("Cache Hit for competitions");
            res.send(cachedValue);
            next();
        }
    });
}

