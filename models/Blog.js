const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogSchema = new Schema({
    title: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 20,
    },

    body: String,
    author: String,
    tag: [String],


    author: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },


    photo: String,

});
const Blog = mongoose.model('Blog', blogSchema);


module.exports = Blog; 