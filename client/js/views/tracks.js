
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
      var modelJson = this.model.toJSON();
      console.log('Model json', modelJson);
      var temp = this.template( modelJson );
      console.log('Temp', temp);
      this.$el.html( temp  );
      return this;
    }

  });