var mongoose = require('mongoose')
var userSchema = mongoose.Schema({
  client_id: String,
  fullname: String,
})
module.exports = mongoose.model('user_collections',userSchema)
