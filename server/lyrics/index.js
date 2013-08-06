var async = require('async')
  , _ = require('underscore')
  , requester = require('./apiRequester')
  , frequencyBuilder = require('./frequencyBuilder')
  ;

function getHashTags(track, cb) {

  async.waterfall([

      function(callback) {
        requester.getTrackLyrics(track, callback);
      },

      function(lyrics, callback) {
        var wordFrequency = frequencyBuilder.getWordFrequency(lyrics);
        callback(null, wordFrequency);
      }
    ],

    function(err, frequentWords) {
      var firstTags
      ;
      if (err) {
        cb(null, []);
      } else {
        firstTags = frequentWords.slice(0, 3);
        console.log('First tags', firstTags);

        // get the three first tags and return them
        cb(null, _.pluck(firstTags, 'word'));
      }
    }
  );

}
exports.getHashTags = getHashTags;
