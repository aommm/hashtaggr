
var app = app || {};

var TrackList = Backbone.Collection.extend({

    model: app.Track,

    localStorage: new Backbone.LocalStorage('tracks-backbone'),

  });

app.Tracks = new TrackList();