const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path')

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const moderationRoutes = require('./routes/moderation');


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/api/auth', userRoutes);
app.use('/api/posts', postRoutes);
app.use('./api/moderation', moderationRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;