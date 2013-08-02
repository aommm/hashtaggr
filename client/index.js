$(document).ready(function() {

  // Define routes for this application
  var Router = Backbone.Router.extend({
    mainView: null,

    initialize: function() {
      this.mainView = new MainView;
    },

    routes: {
      "": "home",
      "tags": "all_tags",
      "tag/:tag": "songs_for_tag"
    },

    home: function() {
      this.mainView.showHome();
    },

    all_tags: function() {
      this.mainView.showAllTags();
    },

    songs_for_tag: function(tag) {
      this.mainView.showSongsForTag(tag);
    }
  });

  // Define models and collections
  var Track = Backbone.Model.extend({
    initialize: function(values) {
      console.log("initializing track:",values.artist,"-",values.title);
    }
  });

  var Tracks = Backbone.Collection.extend({
    model: Track
  });

  // Define UI views
  var TrackView = Backbone.View.extend({
    tagName: "li",
    template: _.template($("#track-template").html()),

    render: function() {
      var json = this.model.toJSON();
      var html = this.template(json);
      this.$el.html(html);
      return this;
    }
  })


  // Define pages
  var MainView = Backbone.View.extend({
    el: $("#spotifyapp"),
    currentView: null,

    initialize: function() {
      this.home = new HomeView;
    },

    showHome: function() {
      console.log("show home!");
      this.currentView = this.home;
      this.$el.html(this.home.render().el);
    },
    showAllTags: function() {
      console.log("show all tags!");
      // this.currentView = this.home;
      // this.$el.html(this.home.render().el);
    },
    showSongsForTag: function() {
      console.log("show songs for tag!");
      // this.currentView = this.home;
      // this.$el.html(this.home.render().el);
    },



  });


  // TODO refactor this

  var HomeView = Backbone.View.extend({
    tagName: 'home',
    template: _.template($("#home-template").html()),

    initialize: function() {
      console.log("initializing HomeView");
    },

    render: function() {
      this.$el.html(this.template()); // pass data to template later, specifying what to show?

      /*
      this.new_track_title = this.$("#new-track-title");
      this.new_track_artist = this.$("#new-track-artist");
      this.new_track_save = this.$("#new-track-save");
      this.track_list = this.$("#track-list");
      */

      this.tracks = new Tracks;

      this.listenTo(this.tracks, 'add', this.addTrack);

      return this;
    },

    // TODO refactor event handling
    events: {
      "click #new-track-save": "addTrackClick"
    },
    addTrackClick: function() {
      var title = this.new_track_title.val()
        , artist = this.new_track_artist.val();

      var track = new Track({title: title, artist: artist});
      this.tracks.add(track);
    },
    addTrack: function(track) {
      var trackView = new TrackView({model: track});
      this.track_list.append(trackView.render().el);
    },
    removeTrack: function(track) {
      // todo implement
    }
  });

  var router = new Router;

  Backbone.history.start({pushState: true});

});