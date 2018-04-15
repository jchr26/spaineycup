const cacheProvider = require('./cacheProvider');
const CACHE_DURATION = 300;
const CACHE_KEY = 'CACHE_KEY';

var AWS = require('aws-sdk');
AWS.config.loadFromPath('./.config.json');
AWS.config.update({region: 'eu-west-2'});

var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

exports.getCourse = function(req, res, next){
    cacheProvider.instance().get('courses:'+req.params.courseId, function(err, cachedValue) {
        if (err) console.error(err);
        
        if (cachedValue == undefined) {
            console.log("Cache miss for courses:"+req.params.courseId);

            var params = { 
                TableName: 'courses',
                Key: {
                    'courseId': parseInt(req.params.courseId)
                }
            };
            var documentClient = new AWS.DynamoDB.DocumentClient();
            documentClient.get(params, function(err, data) {
                if (err) {
                    console.log("Error", err);
                } else {
                    var player = AWS.DynamoDB.Converter.unmarshall(data.Item); 
                    console.log("Caching courses:"+req.params.courseId);
                    cacheProvider.instance().set('courses:'+req.params.courseId, data.Item, CACHE_DURATION);
                    res.send(data.Item);
                    next();
                }
            });
        } else {
            console.log("Cache Hit for course:"+req.params.courseId);
            res.send(cachedValue);
            next();
        }
    });
}

exports.getCourses = function(req, res, next){

    cacheProvider.instance().get('courses', function(err, cachedValue) {
        if (err) console.error(err);
        
        if (cachedValue == undefined) {
            console.log("Cache miss for courses");
            
            var params = {
                TableName: "courses"
            };
            ddb.scan(params, function(err, data) {
                if (err) {
                    console.log("Error", err);
                    return;
                } else {

                    var courses = [];
                    data.Items.forEach(function(element, index, array) {
                        var course = AWS.DynamoDB.Converter.unmarshall(element); 
                        console.log(course);
                        courses.push(course);
                    });

                    console.log("Caching courses");
                    cacheProvider.instance().set('courses', courses, CACHE_DURATION);
                    res.send(courses);
                    next();
                }
            });

        } else {
            console.log("Cache Hit for courses");
            res.send(cachedValue);
            next();
        }
    });
}
