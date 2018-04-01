const cacheProvider = require('./cacheProvider');
const CACHE_DURATION = 300;
const CACHE_KEY = 'CACHE_KEY';

var AWS = require('aws-sdk');
AWS.config.loadFromPath('./.config.json');
AWS.config.update({region: 'eu-west-2'});

var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

exports.getNewsItem = function(req, res, next){
    cacheProvider.instance().get('newsItems:'+req.params.newsItemId, function(err, cachedValue) {
        if (err) console.error(err);
        
        if (cachedValue == undefined) {
            console.log("Cache miss for newsItems:"+req.params.newsItemId);

            var params = { 
                TableName: 'newsItems',
                Key: {
                    'newsItemId': parseInt(req.params.newsItemId)
                }
            };
            var documentClient = new AWS.DynamoDB.DocumentClient();
            documentClient.get(params, function(err, data) {
                if (err) {
                    console.log("Error", err);
                } else {
                    var newsItem = AWS.DynamoDB.Converter.unmarshall(data.Item); 
                    console.log("Caching newsItems:"+req.params.newsItemId);
                    cacheProvider.instance().set('newsItems:'+req.params.newsItemId, data.Item, CACHE_DURATION);
                    res.send(data.Item);
                    next();
                }
            });
        } else {
            console.log("Cache Hit for newsItems");
            res.send(cachedValue);
            next();
        }
    });
}

exports.getNewsItems = function(req, res, next){
    cacheProvider.instance().get('newsItems', function(err, cachedValue) {
        if (err) console.error(err);
        
        if (cachedValue == undefined) {
            console.log("Cache miss for newsItems");

            var params = { TableName: "newsItems" };
            ddb.scan(params, function(err, data) {
                if (err) {
                    console.log("Error", err);
                } else {
                    var newsItems = [];
                    data.Items.forEach(function(element, index, array) {
                        var newsItem = AWS.DynamoDB.Converter.unmarshall(element); 
                        newsItems.push(newsItem);
                    });
                    console.log("Caching newsItems");
                    cacheProvider.instance().set('newsItems', newsItems, CACHE_DURATION);
                    res.send(newsItems);
                    next();
                }
            });
            
        } else {
            console.log("Cache Hit for newsItems");
            res.send(cachedValue);
            next();
        }
    });
}
