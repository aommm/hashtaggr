var app = app || {};

app.CurrentTrackView = Backbone.View.extend({

  tagName: 'div',

  template: _.template( $('#current-track-template').html() ),

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