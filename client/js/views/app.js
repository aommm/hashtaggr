
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
      var view = new app.TrackView({ model: track });
      $('#track-list').append( view.render().el );
    }

  });