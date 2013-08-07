var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  ;


var Tag = new Schema({
  name: { type: String }
});

var Track = new Schema({
    artist : { type: String }
  , title : { type: String }
  , tags  : [Tag]
});

