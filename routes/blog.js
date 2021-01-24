const express = require("express");
const router = express.Router();
const { create, getAll, getById, editOne, deleteOne, getByTitle, getMyblog, getByTag } = require("../controllers/blog.js")
const multer = require('multer');
const path = require('path');


router.post('/', async (req, res, next) => { //create
    const { body, user: { id } } = req;
    try {
        const newBlog = await create({ ...body, author: id });
        res.json(newBlog);
    }
    catch (e) {
        next(e);
    }
});


router.get('/', async (req, res, next) => {

    try {
        const blogs = await getAll({ author: id });
        res.json(blogs);
    } catch (e) {
        next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    //function returns one user
    const id = req.params.id;
    // const { params: { id } } = req; //getting id from req param 
    try {
        const blogs = await getById(id);
        //res.send("hello user");
        res.json(blogs);
    } catch (e) {
        next(e);
    }

});



router.patch('/:id', async (req, res, next) => {

    const { params: { id }, body } = req; //getting id from req param 
    try {
        const blogs = await editOne(id, body);
        //res.send("hello edit user");
        res.json(blogs);
    } catch (e) {
        next(e);
    }

});

router.delete('/delete/:id', async (req, res, next) => {
    const id = req.params.id;
    // const { params: { id } } = req; //getting id from req param 
    try {
        const blogs = await deleteOne(id);
        res.json(blogs);
    } catch (e) {
        next(e);
    }

});

router.get('/title/:title', async (req, res, next) => {

    Title = req.params.title;
    try {
        const blogs = await getByTitle(Title);
        res.json(blogs);
    } catch (e) {
        next(e);
    }

});


//get loged in blogs
router.get('/getblog', async (req, res, next) => {

    const { user: { id } } = req;

    try {

        const blogs = await getMyblog({ author: id });

        res.json(blogs)

    } catch (e) {

        next(e); //sending error handler

    }

});


//get search by tag 
router.get('/tags/:tag', async (req, res, next) => {
    tag = req.params.tag;
    try {
        const blogs = await getByTag(tag);
        res.json(blogs);
    } catch (e) {
        next(e);
    }

});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images');
    },

    
    filename: function (req, file, cb) {
        cb(null, file.originalname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

router.post('/add', upload.single("photo"), async (req, res, next) => {
    const { body, user: { id } } = req;
    const _file = req.file.filename;
    try {
        const blog = await create({ ...body, photo: _file, auther: id });
        res.json(blog);
    } catch (e) {
        next(e);
    }
});




module.exports = router;