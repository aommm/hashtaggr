
  var app = app || {};

  app.AppView = Backbone.View.extend({

    el: '#hashtaggr-app',

    // New
    // Delegated events for creating new items, and clearing completed ones.
    events: {
    },

    initialize: function() {

      this.listenTo(app.Tracks, 'add', this.addOne);

    },

    render: function() {
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function( track ) {
      var view = new app.TrackView({ model: track });
      $('#track-list').append( view.render().el );
    }

  });