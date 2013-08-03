$(document).ready(function() {

  // Routes

  var Controller = Backbone.Router.extend({

    initialize: function() {

      this.currentTrackModel = new CurrentTrackModel;
      this.allTagsModel = new AllTagsModel;
      this.tracksForTagModel = new TracksForTagModel;

      this.mainView = new MainView;

      this.homeView = new HomeView({model: this.currentTrackModel, controller: this});
      this.allTagsView = new AllTagsView({model: this.allTagsModel, controller: this});
      this.tracksForTagView = new TracksForTagView({model: this.tracksForTagModel, controller: this});

      // var spotify = {};
      // this.listenTo(spotify, 'trackChanged', this.trackChanged);
      // this.listenTo(this.currentTrackModel, 'change', )
    },

    routes: {
      "tags": "allTags",
      "tag/:tag": "tracksForTag",
      "*path": "home"
    },

    home: function() {
      this.mainView.show(this.homeView);
    },

    allTags: function() {
      this.mainView.show(this.allTagsView);
    },

    tracksForTag: function(tag) {
      this.tracksForTagModel.update(tag);
      this.mainView.show(this.tracksForTagView);
    }

  });

  // Models
  var CurrentTrackModel = Backbone.Model.extend({

    // Has properties:
    // uri
    // artist
    // title
    // [tag_1, tag_2, tag_3]

    initialize: function() {
      ;
    },

    // Is called whenever the currently playing track changes
    trackChanged: function(uri, artist, title) {
      // Replace instance variables,
      // fetch new tags from server
    }

  });

  var AllTagsModel = Backbone.Model.extend({

    // Has properties:
    // [list of tags]
    initialize: function() {
      ;
    },

    update: function() {
      // re-fetches tags from server
    }

  });

  var TracksForTagModel = Backbone.Model.extend({

    // Has properties:
    // tag
    // [list of tracks]
    initialize: function() {
      ;
    },


    update: function(tag) {
      if (tag) {
        console.log("saving tag");
        this.set({tag: tag});
      }
      // Replace instance variable,
      // fetch new tracks from server
    }

  });



  // Views

  var MainView = Backbone.View.extend({
    el: $("#main"),

    initialize: function() {
      console.log("initializing MainView");
    },

    render: function() {
      this.$el.html(this.currentView.render().el);
    },

    show: function(view) {
      this.currentView = view;
      this.render();
    }

  });


  var HomeView = Backbone.View.extend({
    tagName: 'home',
    template: _.template($("#home-template").html()),

    initialize: function() {
      console.log("initializing HomeView.");
      this.model.on('change', this.update);
    },

    render: function() {
      var data = this.model.toJSON();
      console.log("re-rendering home view. New data:",data);
      this.$el.html(this.template(data));
      return this;
    },

    update: function() {
      this.render();

      return this;
    }

  });

  var AllTagsView = Backbone.View.extend({
    tagName: 'all-tags',
    template: _.template($("#all-tags-template").html()),

    initialize: function() {
      console.log("initializing AllTagsView.");
      this.model.on('change', this.render);
    },

    render: function() {
      var data = this.model.toJSON();
      console.log("re-rendering all tags view. New data:",data);
      this.$el.html(this.template(data));
      return this;
    }

  });

  var TracksForTagView = Backbone.View.extend({
    tagName: 'tracks-for-tag',
    template: _.template($("#tracks-for-tag-template").html()),

    initialize: function() {
      console.log("initializing TracksForTagView.");
      this.model.on('change', this.render, this);
    },

    render: function() {
      var data = this.model.toJSON();
      console.log("re-rendering tracks for tag view. New data:",data);
      this.$el.html(this.template(data));
      return this;
    }

  });


  // Spin everything up!
  var controller = new Controller;

  Backbone.history.start({pushState: false, root: "../index.html"});

});