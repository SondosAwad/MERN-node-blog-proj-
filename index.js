const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const { getAll } = require("./controllers/blog.js");



const app = express();
mongoose.connect('mongodb://localhost:27017/merndb', { useUnifiedTopology: true });
app.use(express.json());



app.use('/', routes);

app.get('/', async (req, res, next) => {
    try {
        const blogs = await getAll();
        res.json(blogs);
    } catch (e) {
        next(e);
    }
});



app.use('*', (req, res, next) => {
    res.status(404).json({ err: 'NOT_FOUND' });
});

app.use((err, req, res, next) => {
    console.error(err);
    if (err instanceof mongoose.Error.ValidationError) {
        return res.status(422).json(err.errors);
    }
    if (err.code === 11000) {
        res.status(422).json({ statusCode: 'ValidationError', property: err.keyValue });
    }
    if (err.message === 'UN_AUTHENTICATED') {
        res.status(401).json({ statusCode: 'UN_AUTHENTICATED' });
    }
    res.status(503).end();
});//end of error handler 
const { PORT = 3000 } = process.env;
app.listen(PORT, () => {
    console.info("app is ready on :", PORT)
})