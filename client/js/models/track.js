
var app = app || {};

app.Track = Backbone.Model.extend({

  defaults: {
    artist: '',
    title: '',
    tags: [],
    related: []
  }

});