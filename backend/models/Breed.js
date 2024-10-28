const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const breedSchema = new Schema({
    imgSrc: String,
    title: String,
    description: String,
    moreLink: String
});

module.exports = mongoose.model('Breed', breedSchema);