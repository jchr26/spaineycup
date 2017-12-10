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
    var newsItems = readJSON.readNewsItems();
    res.send(newsItems);

    console.log(newsItems);
    next();
}
