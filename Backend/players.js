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
    var players = readJSON.readPlayers();
    res.send(players);

    console.log(players);
    next();
}
