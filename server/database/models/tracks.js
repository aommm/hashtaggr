var async = require('async')
  , _ = require('underscore')
  , lyricsRequester = require('../../lyrics')
  ;

module.exports = function(connection) {

  function get(track, cb) {

    async.waterfall([
      function(callback) {
        getExisting(track, callback);
      },

      function(trackId, callback) {
        track.id = trackId;

        getTagsForTrack(trackId, callback);
      }
    ], function(err, tags) {

      if (err) {
        // track doesnt exist, insert it
        insertTrack(track, cb);
        return;
      }

      track.tags = tags;
      cb(null, track);
    });

  }

  function getExisting(track, cb) {
    connection.query('SELECT * FROM tracks WHERE artist="' + track.artist +
        '" AND title="' + track.title + '"', function(err, rows) {
      console.log('Err', err);
      if ( !rows.length ) {
        cb('No track found');
        return;
      }

      cb(null, rows[0].id);

    });
  }

  function getTagsForTrack(id, cb) {
    var selectTagsSql = 'SELECT * FROM tags WHERE track_id=' + id;

    connection.query(selectTagsSql, function(err, rows) {

      if ( err || !rows.length ) {
        cb(null, []);
        return;
      }

      cb( null, _.pluck(rows, 'name') );

    });
  }

  function insertTrack(track, cb) {
    console.log('Insert track', track);

    async.waterfall([
      function(callback) {
        createTrack(track, callback);
      },

      function(trackId, callback) {
        track.id = trackId;
        insertTags(track, callback);
      }
    ], function(err, track) {
        if (err) {
          cb('Fail');
          return;
        }
        cb(null, track);
      });
  }

  function createTrack(track, cb) {
    var insertSql = 'INSERT into tracks (artist, title) VALUES("' +
          track.artist + '", "' + track.title + '")';

    connection.query(insertSql, function(err, result) {
      var insertId
        ;

      if (err) {
        cb('Failed insert');
      }

      insertId = result.insertId;
      cb(null, insertId);
    });
  }

  function insertTags(track, cb) {
    var trackId = track.id
      , hashtags
      ;

    lyricsRequester.generateHashTags(track, function(err, tags) {
      track.tags = tags;

      var insertString = '';

      tags.forEach( function(tag) {
        var insertSql = 'INSERT into tags (name, track_id) VALUES("' +
          tag + '", ' + trackId + '); ';

        insertString += insertSql;
      });

      connection.query(insertString, function(err, result) {
        if (err) {
          cb('Failed to insert tags');
          return;
        }

        cb(null, track);
      });
    });
  }

  function getRelated(trackId, cb) {
    // get the tags of the trackID (fetch from db)
    async.waterfall([
      function(callback) {
        getTagsForTrack(trackId, callback);
      },

      function(tags, callback) {
        getRelatedTrackIds(trackId, tags, callback);
      },

      function(trackIds, callback) {
        getFullData(trackIds, callback);
      }
    ], function(err, relatedTracks) {
      if (err) {
        cb(err);
        return;
      }

      cb(null, relatedTracks);
    });

  }

  function getRelatedTrackIds(removeTrackId, tags, callback) {
    var inTagsArr = []
      , inTags
    ;
    tags.forEach(function(tag) {
      inTagsArr.push('\'' + tag + '\''); 
    });
    inTags = '(' + inTagsArr.join(',') + ')';

    var selectRelatedTags = 'SELECT DISTINCT track_id FROM tags WHERE name IN ' + inTags + ' AND track_id != ' + removeTrackId + ' LIMIT 3;';
    connection.query(selectRelatedTags, function(err, trackIds) {
      // not we should track ids which has related tags (contains any of our tags, but we filter out our tags)
      if (err) {
        callback(err);
        return;
      }

      callback( null, _.pluck(trackIds, 'track_id') );
    });
  }

  function getFullData(trackIds, callback) {
    var fullTracks = []
      , selectTracks = ''
      , selectTrack = 'SELECT * FROM tracks WHERE id='
      ;

    // first build a sql string for retriving all the tracks with their data
    trackIds.forEach( function(trackId) {
      selectTracks += (selectTrack + trackId + ';');
    });

    connection.query(selectTracks, function(err, tracks) {
      if (err) {
        callback(err);
        return;
      }

      // when we've fetched that data - build a string which selects all the tags for those
      var selectTags = ''
        , selectTag = 'SELECT * FROM tags WHERE track_id='
        ;

      tracks.forEach( function(track) {
        selectTags += ( selectTag + track[0].id + ';' );
      });

      // get all the tags for all these songs, then append them to the correct one
      connection.query(selectTags, function(err, tagsForTracks) {
        if (err) {
          console.log('Err', err);
          callback(err);
          return;
        }

        tagsForTracks.forEach( function(tagsForTrack) {
          if ( !tagsForTracks.length ) return;
          // get the id, pluck the names

          var tagsForTrackArr = _.pluck(tagsForTrack, 'name')
            , tagsForTrackId = tagsForTrack[0].track_id
            ;

          tracks.forEach( function(track) {
            var track = track[0];
            if (track.id === tagsForTrackId) {
              track.tags = tagsForTrackArr;
              fullTracks.push(track);
            }
          });
        });

        callback(err, fullTracks);
      });
    });

  }

  return {
    get: get,
    getRelated: getRelated
  };

};