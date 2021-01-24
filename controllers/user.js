
const jwt = require("jsonwebtoken");

const { promisify } = require("util");
const asyncSign = promisify(jwt.sign);
const User = require("../models/user.js");


const create = (user) => {
    return User.create(user);
}

const login = async ({ username, password }) => {
    const user = await User.findOne({ username }).exec();
    if (!user) {
        throw Error('UN_AUTHENTICATED');
    }
    const isVaildPass = user.validatePassword(password);
    if (!isVaildPass) {
        throw Error('UN_AUTHENTICATED');
    }
    const token = await asyncSign({
        username: user.username,
        id: user.id,
    }, '**//**//2020**', { expiresIn: '10d' });
    return { ...user.toJSON(), token };

};

const getAll = (query) =>
    User.find(query).exec();


const getById = (id) =>
    User.findById(id).exec();



const editOne = (id, body) =>
    User.findByIdAndUpdate(id, body, { new: true }).exec();

const deleteOne = (id) =>
    User.findOneAndDelete(id).exec();

const pushFId = async (id, target) => {
    const currentUser = await User.findById(id).exec();
    if (target != id && !currentUser.following.find(item => item == target)) {
        User.updateOne({ _id: id }, { $push: { followers: target } }, { new: true }).exec();
        User.updateOne({ _id: target }, { $push: { following: id } }, { new: true }).exec();
        return { "status": "followed" };
    } else {
        throw Error("INVALID_ID");
    }
}
const pullFId = async (id, target) => {
    User.updateOne({ _id: id }, { $pull: { followers: target } }, { new: true }).exec();
    User.updateOne({ _id: target }, { $pull: { following: id } }, { new: true }).exec();
    return { "status": "unfollowed" };
}


module.exports = {
    create,
    login,
    getAll,
    getById,
    editOne,
    deleteOne,
    pushFId,
    pullFId,

}
