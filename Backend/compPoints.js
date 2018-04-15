const courses = require('./courses.js');
const cacheProvider = require('./cacheProvider');
const CACHE_DURATION = 3600;
const CACHE_KEY = 'CACHE_KEY';

var AWS = require('aws-sdk');
AWS.config.loadFromPath('./.config.json');
AWS.config.update({region: 'eu-west-2'});

var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

function getCompetitions(req, res, next){
    cacheProvider.instance().get('competitions', function(err, cachedComps) {
        if (cachedComps == undefined) {
            console.log("Cache Miss for comps");
            // TODO: Populate cache?
            return cachedComps;
        } else {
            console.log("Cache Hit for comps: " + JSON.stringify(cachedComps));
            req.competitions = cachedComps;
            return;
        }
    });
}

function getCourses(req, res, next){
    cacheProvider.instance().get('courses', function(err, cachedCourses) {
        if (cachedCourses == undefined) {
            console.log("Cache Miss for courses");
            // TODO: Populate cache?

        } else {
            console.log("Cache Hit for courses: " + JSON.stringify(cachedCourses));
            req.courses = cachedCourses;
            return;
        }
    });
}

function getPlayers(req, res, next){
    cacheProvider.instance().get('players', function(err, cachedPlayers) {
        if (cachedPlayers == undefined) {
            console.log("Cache Miss for players");
            // TODO: Populate cache?
            return cachedPlayers;
        } else {
            console.log("Cache Hit for players: " + JSON.stringify(cachedPlayers));
            req.players = cachedPlayers;
            return;
        }
    });
}

function getScores(req, res, next){
    cacheProvider.instance().get('scores', function(err, cachedScores) {
        if (cachedScores == undefined) {
            console.log("Cache Miss for scores");
            // TODO: Populate cache?
            return cachedScores;
        } else {
            console.log("Cache Hit for scores: " + JSON.stringify(cachedScores));
            req.scores= cachedScores;
            return;
        }
    });
}

function calculateStablefordPoints(handicap, par, strokes, strokeIndex, req, res, next){
        console.log("Calculating Stableford");
        let points = 0;

        // adjust net par based on handicap and strokeIndex for hole
        let adjustedPar = par;
        if (strokeIndex <= handicap && handicap <= 18){
            adjustedPar = par + 1;
        } else if (handicap > 18 && strokeIndex <= handicap - 18) {
            adjustedPar = par + 2;
        } else if (handicap > 18 && strokeIndex > handicap - 18) {
            adjustedPar = par + 1;
        }

        //calculate points
        if (strokes == adjustedPar) {
            points = 2; // par
        } else if (strokes == adjustedPar+1){
            points = 1; // bogey
        } else if (strokes == adjustedPar-1) {
            points = 3; // birdie
        } else if (strokes == adjustedPar-2) {
            points = 4; // eagle
        } else if (strokes == adjustedPar-3) {
            points = 5; // double eagle
        }

        console.log("Handicap: " + handicap);
        console.log("Strokes: " + strokes);
        console.log("StrokeIndex: " + strokeIndex);
        console.log("Par: " + par);
        console.log("Adjusted par: " + adjustedPar);
        console.log("Stableford points: " + points);
        req.stablefordPoints = points;
    
}

function getCompCourseData(req, res, next){
    let compCourseData = [];
    for (let i=0; i < req.courses.length; i++){
        compCourseData[req.courses[i].courseId] = req.courses[i];
    }
    console.log("Courses rejigged: " + JSON.stringify(compCourseData));
    req.courses = compCourseData;
}

exports.getCompPoints = function(req, res, next){

    cacheProvider.instance().get('compPoints', function(err, cachedValue) {
        if (err) console.error(err);
        
        if (cachedValue == undefined) {
            console.log("Cache miss for compPoints");
            getCompetitions(req, res, next);
            getCourses(req, res, next);
            getCompCourseData(req, res, next);
            getPlayers(req, res, next);
            getScores(req, res, next);

            var compPoints = {};
            for (let i = 0; i<req.competitions.length; i++) {
                let compName = req.competitions[i].name;
                var compId = req.competitions[i].competitionId.toString();
                let compCourseId = req.competitions[i].courseId.toString();
                console.log("compCourseId: " + compCourseId);

                if (compCourseId == 0){
                    // SpaineyCup Comp, need to calculate this last
                    continue;
                } 

                compPoints[compId] = {};
 
                for (let j = 0; j<req.players.length; j++) {
                    let playerName = req.players[j].name.toUpperCase();
                    let playerId = req.players[j].playerId.toString();
                    let playerHandicap = req.players[j].handicap;

                    compPoints[compId][playerId] = {};
                    compPoints[compId][playerId]['playerName'] = playerName;
                    compPoints[compId][playerId]['strokes'] = 0;
                    compPoints[compId][playerId]['points'] = 0;
                    for (let k = 1; k <= 18; k++){
                        let hole = k.toString();
                        let par = req.courses[compCourseId]['holes'][hole]['Par'];
                        let strokeIndex = req.courses[compCourseId]['holes'][hole]['SI'];
                        try { 
                            let strokes = req.scores[0]['competitions'][compId]['players'][playerId]['holes'][hole]['strokes'];
                            compPoints[compId][playerId]['strokes'] += strokes; 
                            calculateStablefordPoints(playerHandicap, par , strokes, strokeIndex, req, res, next);
                            compPoints[compId][playerId]['points'] += req.stablefordPoints; 
                        } catch(e) { 
                            console.log("No scores found");
                        }
                    }
                }
            }

            // calculate aggregate for SpaineyCup
            compPoints[6] = {};
            for (let j = 0; j<req.players.length; j++) {
                let playerName = req.players[j].name.toUpperCase();
                let playerId = req.players[j].playerId.toString();
                compPoints[6][playerId] = {};
                compPoints[6][playerId]['strokes'] = 0;
                compPoints[6][playerId]['points'] = 0;
                    for (let key in compPoints){
                        if (key == 6) {
                            continue;
                        }
                        compPoints[6][playerId]['playerName'] = playerName;
                        compPoints[6][playerId]['strokes'] += compPoints[key][playerId]['strokes'];
                        compPoints[6][playerId]['points'] += compPoints[key][playerId]['points'];
                    }
            }

            console.log("Caching compPoints");
            cacheProvider.instance().set('compPoints', compPoints, CACHE_DURATION);

            console.log("returning: " + compPoints);
            res.send(compPoints);
            next();

        } else {
            console.log("Cache Hit for compPoints");
            res.send(cachedValue);
            next();
        }
    });
}
