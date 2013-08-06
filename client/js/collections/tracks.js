
var app = app || {};

var TrackList = Backbone.Collection.extend({

    model: app.Track

  });

app.Tracks = new TrackList();