const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require('../models/user');

const asyncVerify = promisify(jwt.verify);

const auth = async (req, res, next) => {
    //debugger;
    const { headers: { authorization } } = req;
    if (!authorization) {
        next((new Error('UN_AUTHENTICATED')));
    }
    try {
        const { id } = await asyncVerify(authorization, '**//**//2020**');
        const user = await User.findById(id).exec();
        req.user = user;
        next();
    } catch (e) {
        next((new Error('UN_AUTHENTICATED')));
    }
};

module.exports = auth;
