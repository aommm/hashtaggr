
var app = app || {};

var TrackList = Backbone.Collection.extend({

    model: app.Track,
    url: '/tracks'

  });

app.Tracks = new TrackList();