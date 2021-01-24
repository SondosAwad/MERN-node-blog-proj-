const express = require("express");
const blog = require("./blog");
const user = require("./user");
const authMiddleware = require('../middlewares/auth');


const router = express.Router();


router.use('/blogs', authMiddleware, blog);
router.use('/users', user);






module.exports = router;