const readJSON = require ('./readJSON.js');

exports.getPlayer = function(req, res, next){
    var playerData = readJSON.readPlayerData(req.params.playerId);
    res.send({
        player: {
            id: playerData.id,
            name: playerData.name,
            handicap: playerData.handicap,
            bio: playerData.bio,
            imgUrl: playerData.imgUrl,
            dob: playerData.dob
        }
    });
    
    console.log(playerData);
    next();
}

exports.getPlayers = function(req, res, next){
    //var players = readJSON.readPlayers();
    //res.send(players);

    //console.log(players);
    //next();
    var AWS = require('aws-sdk');
    AWS.config.loadFromPath('./.config.json');
    AWS.config.update({region: 'eu-west-2'});

    var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

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

            res.send(players);
            next();
        }
    });
}
