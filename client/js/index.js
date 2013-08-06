var app = app || {};

$(function() {

  new app.AppView();

  window.app = app;
  window.newTrack = function() {
    app.Tracks.add(new app.Track({artist: "artiste", title: "titell", tags: ["tag1", "tag2", "tag3"]}));
  }

});