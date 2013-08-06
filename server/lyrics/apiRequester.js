var http = require('http')
  , querystring = require('querystring')
  , api = "http://api.musixmatch.com/ws/1.1/"
  , apiKey = "b7ea5bcdda7ff8b2dc27a21b8bc3551b"
  ;

// we want to send artist and song name to our function which requests
function getTrackLyrics(track, cb) {
  var reqString = api + 'matcher.lyrics.get?' +
          querystring.stringify({ q_artist: track.artist, q_track: track.title, apikey: apiKey });
    ;

  http.get(reqString, function(res) {
    var data = '';

    res.on('data', function(chunk) {
      data += chunk;
    });

    res.on('end', function() {
      var resJSON = JSON.parse(data)
        , body = resJSON.message.body
        , lyrics = ''
        ;

      if ( !Array.isArray(body) ) {
        lyrics = body.lyrics.lyrics_body;
      }

      cb(null, lyrics);
    });

  });
}

exports.getTrackLyrics = getTrackLyrics;

