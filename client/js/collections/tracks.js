
var app = app || {};

var TrackList = Backbone.Collection.extend({

    model: app.Track,
    url: 'http://localhost:3000/tracks'

  });

app.Tracks = new TrackList();