var http = require('http')
  , xmlStream = require('xml-stream')
  , chartlyricsApi = "http://api.chartlyrics.com/apiv1.asmx/SearchLyricDirect?"
  ;



// we want to send artist and song name to our function which requests
function getSongLyrics(artist, songName) {
  var reqString = chartlyricsApi + ['artist=', artist, '&song=', songName].join('');

  // request the lyrics for the song
  http.get(reqString).on('response', parseLyricsForSong);

  // if error what to do?

}
exports.getSongLyrics = getSongLyrics;

function parseLyricsForSong(res) {
  var resString = '';

  res.on('data', function(chunk) {
    resString += chunk;
  });

  res.on('end', function() {
  // send lyrics to xmlParser which returns string
  // console.log('Res String', resString);

  });
}

function extractLyricsFromXml(xmlString) {

}


  //http://api.chartlyrics.com/apiv1.asmx/SearchLyricDirect?artist=michael%20jackson&song=bad