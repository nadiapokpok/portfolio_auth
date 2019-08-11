const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CatSchema = new Schema({
    title : String,
    image : String
});

const Cat  = mongoose.model('Cat', CatSchema);

module.exports = Cat;