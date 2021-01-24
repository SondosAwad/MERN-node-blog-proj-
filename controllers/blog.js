const Blog = require("../models/Blog.js");

const create = (blog) =>
    Blog.create(blog);

const getAll = (query) =>
    Blog.find(query).exec();

const getById = (id) =>
    Blog.findById(id).exec();

const editOne = (id, body) =>
    Blog.findByIdAndUpdate(id, body, { new: true }).exec();

const deleteOne = (id) =>
    Blog.findOneAndDelete(id).exec();



const getByTitle = (title) =>
    Blog.find({ title }).exec();

const getMyblog = (query) =>
    Blog.find(query).exec()

const getByTag = (tag) =>
    Blog.find({ tag }).exec();


module.exports = {
    create,
    getAll,
    getById,
    editOne,
    deleteOne,
    getByTitle,
    getMyblog,
    getByTag,


};