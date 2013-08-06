
  var app = app || {};

  app.AppView = Backbone.View.extend({

    el: '#hashtaggr-app',

    events: {
    },

    initialize: function() {

      this.listenTo(app.Tracks, 'add', this.addOne);

    },

    render: function() {
    },

    addOne: function( track ) {
      var listItemView = new app.TrackView({ model: track });
      var currentTrackView = new app.CurrentTrackView({ model: track });

      $('#track-list').append( listItemView.render().el );
      $('#current-track').html( currentTrackView.render().el );
    }

  });