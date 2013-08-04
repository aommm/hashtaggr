var http = require('http')
  , XmlStream = require('xml-stream')
  , chartlyricsApi = "http://api.chartlyrics.com/apiv1.asmx/SearchLyricDirect?"
  ;

// we want to send artist and song name to our function which requests
function getSongLyrics(artist, songName, cb) {
  var reqString = chartlyricsApi + ['artist=', artist, '&song=', songName].join('');

  // request the lyrics for the song
  http.get(reqString).on('response', function(res) {
    // parse the lyrics from the response
    parseLyricsForSong(res, function(lyrics) {
      cb(null, lyrics);
    });
  });

  // if error what to do?

}
exports.getSongLyrics = getSongLyrics;

function parseLyricsForSong(res, cb) {
  console.log('Parsing lyrics');

  res.setEncoding('utf8');
  var xml = new XmlStream(res);

  xml.on('endElement: Lyric', function(lyrics) {
    cb( lyrics.$text );
  });
}


  //http://api.chartlyrics.com/apiv1.asmx/SearchLyricDirect?artist=michael%20jackson&song=bad