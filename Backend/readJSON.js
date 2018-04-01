const fs = require('fs');

exports.readScores = function() {
    try {
        obj = JSON.parse(fs.readFileSync('scores.json', 'utf8'));
        return obj;
    } catch(e) {
        console.log("Data Corrupted" + e);
    }
}

exports.readScoreData = function(compId) {
    try {
        obj = JSON.parse(fs.readFileSync('scores.json', 'utf8'));
        console.log(obj[0]['competitions'][compId] + ' - ' + compId);
        return obj[0]['competitions'][compId];
    } catch(e) {
        console.log("Data Corrupted" + e);
    }
}


