var mongoose = require('mongoose')
var gameSchema = mongoose.Schema({
  client_id: String,
  points: Number,
  kms: Number,
  totalCost: Number,
  monthlyCost: Number, //Updates based on a cron job on 1st of every Month
})
module.exports = mongoose.model('game_collections',gameSchema)
