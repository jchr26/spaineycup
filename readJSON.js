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
        throw new Error("Data Corrupted" + e);
    }
}
