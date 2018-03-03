const readJSON = require ('./readJSON.js');

exports.getComp = function(req, res, next){
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
    var scores = readJSON.readScores();
    res.send(scores);

    console.log(scores);
    next();
}

