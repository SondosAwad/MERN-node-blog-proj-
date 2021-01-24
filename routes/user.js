const express = require("express");
const { create, login, getAll, getById, editOne, deleteOne, pushFId, pullFId } = require("../controllers/user.js");
const router = express.Router();
const authMiddleware = require('../middlewares/auth');


router.post('/', async (req, res, next) => {
    const { body } = req;
    try {
        const user = await create(body);
        res.json(user);
    } catch (e) {
        next(e);
    }
});


router.post('/login', async (req, res, next) => {
    const { body } = req;
    try {
        const user = await login(body);
        // .then((user) =>
        res.json(user);
    } catch (e) {
        next(e);
    }
});


router.get('/', async (req, res, next) => {
    try {
        const users = await getAll();
        res.json(users);
    } catch (e) {
        next(e);
    }
});


router.get('/:id', async (req, res, next) => {
    const { params: { id } } = req;
    try {
        const users = await getById(id);
        res.json(users);
    } catch (e) {
        next(e);
    }
});

router.patch('/:id', async (req, res, next) => {
    const { params: { id }, body } = req;

    try {
        const users = await editOne(id, body);
        res.json(users);
    } catch (e) {
        next(e);
    }
});


router.delete('/delete/:id', async (req, res, next) => {
    const { params: { id } } = req;

    try {
        const users = await deleteOne(id);
        res.json(users);
    } catch (e) {
        next(e);
    }
});


router.post('/follow/:fid', authMiddleware, async (req, res, next) => {
    const { user: { id }, params: { fid } } = req;
    try {
        const userFollowedId = await pushFId(id, fid);
        res.json(userFollowedId);
    } catch (e) {
        next(e);
    }
});

router.post('/unfollow/:fid', authMiddleware, async (req, res, next) => {
    const { user: { id }, params: { fid } } = req;
    try {
        const userunFollowedId = await pullFId(id, fid);
        res.json(userunFollowedId);
    } catch (e) {
        next(e);
    }
});




module.exports = router;