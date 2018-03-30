
const readJSON = require ('./readJSON.js');

exports.getNewsItem = function(req, res, next){
    var newsItem = readJSON.readNewsItem(req.params.newsItemId);
    res.send({
        newsItem: {
            id: newsItem.id,
            title: newsItem.title,
            date: newsItem.date,
            story: newsItem.story,
            imgUrl: newsItem.imgUrl
        }
    });
    
    console.log(newsItem);
    next();
}

exports.getNewsItems = function(req, res, next){
    var AWS = require('aws-sdk');
    AWS.config.loadFromPath('./config.json');
    AWS.config.update({region: 'eu-west-2'});

    var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

    var params = {
        TableName: "newsItems"
    };
    ddb.scan(params, function(err, data) {
        if (err) {
            console.log("Error", err);
        } else {

            var newsItems = [];
            data.Items.forEach(function(element, index, array) {
                var newsItem = AWS.DynamoDB.Converter.unmarshall(element); 
                console.log(newsItem);
                newsItems.push(newsItem);
            });

            res.send(newsItems);
            next();
        }
    });
}
