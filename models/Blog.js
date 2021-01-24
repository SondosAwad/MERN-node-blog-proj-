const mongoose = require("mongoose");
const { Schema } = mongoose;

//var imgPath = '/path/yourimage.png';
//var a = new A;
// a.img.data = fs.readFileSync(imgPath);
// a.img.contentType = 'image/png';
// a.save(function (err, a) {
//   if (err) throw err;

const blogSchema = new Schema({
    title: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 20,
    },

    body: String,
    //img: { data: Buffer, contentType: String },
    author: String,
    tag: [String],


    author: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },


    photo: String,

});
const Blog = mongoose.model('Blog', blogSchema); //creating collection //mounting model ////attach
// ready to go!

module.exports = Blog; //model