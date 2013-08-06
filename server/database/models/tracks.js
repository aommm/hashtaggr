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
      } else {
        track.tags = tags;
        cb(null, track);
      }

    });

  }

  function getExisting(track, cb) {
    connection.query('SELECT * FROM tracks WHERE artist="' + track.artist +
        '" AND title="' + track.title + '"', function(err, rows) {
      console.log('Err', err);
      if ( !rows.length ) {
        cb('No track found');
      } else {
        cb(null, rows[0].id);
      }

    });
  }

  function getTagsForTrack(id, cb) {
    var selectTagsSql = 'SELECT * FROM tags WHERE track_id=' + id;

    connection.query(selectTagsSql, function(err, rows) {
      console.log('Arguments', arguments);
      if ( !rows.length ) {
        cb(null, []);
      } else {
        cb( null, _.pluck(rows, 'name') );
      }

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
        } else {
          cb(null, track);
        }
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
      } else {
        insertId = result.insertId;
        cb(null, insertId);
      }
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
          cb('fail');
        } else {
          cb(null, track);
        }
      });
    });
  }

  function getAll() {
    // return all tracks
  }

  return {
    get: get
  };

};