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
          requester.getSongLyrics(artist, songname, callback);
        },
        function(lyrics, callback) {
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