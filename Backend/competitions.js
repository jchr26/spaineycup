const readJSON = require ('./readJSON.js');

exports.getComp = function(req, res, next){
    var compData = readJSON.readCompData(req.params.compId);
    res.send({
        comp: {
            id: compData.id,
            name: compData.name,
            course: compData.course,
            imgUrl: compData.imgUrl,
        }
    });
    
    console.log(compData);
    next();
}

exports.getComps = function(req, res, next){
    var comps = readJSON.readComps();
    res.send(comps);

    console.log(comps);
    next();
}

