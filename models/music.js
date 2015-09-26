var mongoose = require('mongoose')
var musicSchema = mongoose.Schema({
  musicId: Number,
  songName: String,
  albumName: String,
  link: String
})
module.exports = mongoose.model('music_collections',musicSchema)
