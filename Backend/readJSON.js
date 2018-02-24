const fs = require('fs');

exports.readPlayerData = function(playerId) {
    try {
        obj = JSON.parse(fs.readFileSync('playerProfiles.json', 'utf8'));
        for (var i=0; i<obj.length; i++) {
            if (playerId == obj[i].id) {
                return obj[i];
            }
            else {
                console.log(obj[i].id + ' - ' + playerId);
            }
        }
        return "NoSuchPlayer";
    } catch(e) {
        console.log("Data Corrupted" + e);
    }
}

exports.readPlayers = function() {
    try {
        obj = JSON.parse(fs.readFileSync('playerProfiles.json', 'utf8'));
        return obj;
    } catch(e) {
        console.log("Data Corrupted" + e);
    }
}

exports.readNewsItem = function(newsItemId) {
    try {
        obj = JSON.parse(fs.readFileSync('newsItems.json', 'utf8'));
        for (var i=0; i<obj.length; i++) {
            if (newsItemId == obj[i].id) {
                return obj[i];
            }
            else {
                console.log(obj[i].id + ' - ' + newsItemId);
            }
        }
        return "NoSuchNews";
    } catch(e) {
        console.log("Data Corrupted" + e);
    }
}

exports.readNewsItems = function() {
    try {
        obj = JSON.parse(fs.readFileSync('newsItems.json', 'utf8'));
        return obj;
    } catch(e) {
        console.log("Data Corrupted" + e);
    }
}
