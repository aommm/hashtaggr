var express = require('express')
  , http = require('http')
  , path = require('path')
  , app = express()
  , _ = require('underscore')
  , db = require('./database')
  , lyricsRequester = require('./lyrics')
  ;

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});


app.get('/tracks/:id?', function(req, res) {

});

app.post('/tracks', function(req, res) {
  var artist = req.body.artist
    , title = req.body.title
    ;

  db.tracks.get({ artist: artist, title: title }, function(err, track) {
    console.log('Track', track);
    res.json(track);
  });
});

app.put('/tracks/:id', function(req, res) {

});

app.del('/tracks/:id', function(req, res) {

});

app.get('/song/:artist/:title', function(req, res) {
  var artist = req.params.artist
    , songname = req.params.title
    , track = { artist: artist, title: songname }
    ;

  console.log('Curl!!');
  lyricsRequester.getHashTags(track, function(err, tags) {
    console.log('Tags', tags);
  });

});

app.get('/blabla', function(req, res) {
  db.tracks.get({ artist: 'jay-z', title: '99 problems' }, function(err, track) {
    console.log('The track', track);
  });
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
