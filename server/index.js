var express = require('express')
  , http = require('http')
  , path = require('path')
  , app = express()
  , _ = require('underscore')
  , db = require('./database')
  , lyricsRequester = require('./lyricsRequester')
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

app.get('/', function() {
  console.log('Hej');
});

app.get('/song/:artist/:songname', function(req, res) {
  var artist = req.params.artist
    , songname = req.params.songname
    ;

  lyricsRequester.getSongLyrics(artist, songname);

});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
