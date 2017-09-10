module.exports = function(app){
    //req = request | res = response | next = error handling
    app.get('/', function(req, res, next) {
        res.send(['waterbottle', 'phone', 'paper']);
    });
}