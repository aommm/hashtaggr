var async = require('async')
  , requester = require('./apiRequester')
  , frequencyBuilder = require('./frequencyBuilder')
  ;

function getHashTags(track, cb) {

  // should contain connection to db, which checks if song exists
  if ( !trackExists(track) ) {
    // if the song not exists we should request it and build tree
    async.waterfall([

        function(callback) {
          requester.getTrackLyrics(track, callback);
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

function trackExists(track) {
  return false;
}