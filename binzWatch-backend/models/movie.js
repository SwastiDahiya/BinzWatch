const mongoose = require('mongoose');
const movieSchema = mongoose.Schema({
    id:Number,
    title:String,
    posterUrl:String,
    mediaUrl:String,
    type:String
});
module.exports = mongoose.model('Movie',movieSchema);
