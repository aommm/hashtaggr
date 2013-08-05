var async = require('async')
  , requester = require('./requester')
  , frequencyBuilder = require('./frequencyBuilder')
  ;

function getHashTags(artist, songname, cb) {
  // should contain connection to db, which checks if song exists
  if ( !songExists(artist, songname) ) {
    // if the song not exists we should request it and build tree
    async.waterfall([
        function(callback) {
          // get the song lyrics from the requester
          requester.getSongLyrics(artist, songname, callback);
        },
        function(lyrics, callback) {
          // use the result from the requester to build a frequency tree
          var wordFrequency = frequencyBuilder.getWordFrequency(lyrics);
          callback(null, wordFrequency);
        }
      ],

      function(err, result) {
        console.log('Word freq', result);
        // then add to the database

        // and return the hashtags
      }
    );
  }

}

exports.getHashTags = getHashTags;

function songExists(artist, songname) {
  return false;
}