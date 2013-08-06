require(['$api/models'], function(models) {

  $(function() {

    new app.AppView();

    // Add the currently playing track to the Tracks collection
    var newTrack = function() {
      var spotifyTrack = models.player.track;
      app.Tracks.create({artist: spotifyTrack.artists[0].name.decodeForHtml(),
                         title: spotifyTrack.name.decodeForHtml(),
                         tags: ["tag1", "tag2", "tag3"]});
    }

    // Process currently playing track on startup (if any)
    models.player.load('track').done(function(track) {
      if (track) newTrack();
    }); // Listen for future track changes
    models.player.addEventListener('change', newTrack);

  });
});