const mongoose = require("mongoose");

const formSchema = mongoose.Schema({
    titre: String,
    description: String,
    image: String,
    categoryId  : {
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Cat'
    },
});

const Project = mongoose.model("project", formSchema);

module.exports = Project;

