
  var app = app || {};

  app.TrackView = Backbone.View.extend({

    tagName: 'li',

    template: _.template( $('#track-template').html() ),

    events: {
    },

    initialize: function() {
      this.listenTo(this.model, 'change', this.render);
    },

    render: function() {
      this.$el.html( this.template( this.model.toJSON() ) );
      return this;
    }

  });